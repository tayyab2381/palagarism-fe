import { env } from "@/config/env";
import {
  registerPendingScan,
  waitForScanCompletion,
  type CopyleaksCompletedPayload,
} from "@/lib/plagiarism/copyleaks-webhook-store";
import type {
  MatchResult,
  PlagiarismProvider,
  PlagiarismRequest,
  PlagiarismResult,
} from "@/lib/plagiarism/types";
import { PlagiarismProviderError } from "@/lib/plagiarism/types";
import { buildPlagiarismResult, countWords } from "@/lib/plagiarism/utils";

const COPYLEAKS_LOGIN_URL = "https://id.copyleaks.com/v3/account/login/api";
const COPYLEAKS_SUBMIT_URL = "https://api.copyleaks.com/v3/scans/submit/file";
const POLL_TIMEOUT_MS = 90_000;

interface CopyleaksLoginResponse {
  access_token: string;
}

interface CopyleaksInternetResult {
  url?: string;
  introduction?: string;
  matchedWords?: number;
  title?: string;
}

/** Authenticates with Copyleaks and returns a short-lived bearer token. */
async function loginToCopyleaks(): Promise<string> {
  const response = await fetch(COPYLEAKS_LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: env.PLAGIARISM_API_EMAIL,
      key: env.PLAGIARISM_API_KEY,
    }),
  });

  if (!response.ok) {
    throw new PlagiarismProviderError(
      `Copyleaks login failed with status ${response.status}`,
      "COPYLEAKS_AUTH_FAILED",
    );
  }

  const data = (await response.json()) as CopyleaksLoginResponse;

  if (!data.access_token) {
    throw new PlagiarismProviderError(
      "Copyleaks login response did not include an access token",
      "COPYLEAKS_AUTH_FAILED",
    );
  }

  return data.access_token;
}

/** Submits text to Copyleaks sandbox mode and registers it for webhook completion. */
async function submitCopyleaksScan(
  accessToken: string,
  scanId: string,
  request: PlagiarismRequest,
): Promise<void> {
  const filename = request.title
    ? `${request.title.replace(/\s+/g, "-").toLowerCase()}.txt`
    : "document.txt";

  const base64Content = Buffer.from(request.text, "utf-8").toString("base64");
  const webhookBase = `${env.NEXT_PUBLIC_APP_URL}/api/plagiarism/webhooks/copyleaks`;

  registerPendingScan(scanId);

  const response = await fetch(`${COPYLEAKS_SUBMIT_URL}/${scanId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      base64: base64Content,
      filename,
      properties: {
        sandbox: env.COPYLEAKS_SANDBOX,
        webhooks: {
          status: `${webhookBase}/{STATUS}?scanId=${scanId}`,
        },
        scanning: {
          internet: true,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new PlagiarismProviderError(
      `Copyleaks scan submission failed with status ${response.status}`,
      "COPYLEAKS_SUBMIT_FAILED",
    );
  }
}

/** Maps Copyleaks webhook payload into the shared PlagiarismResult shape. */
function mapCopyleaksPayload(
  request: PlagiarismRequest,
  payload: CopyleaksCompletedPayload,
): PlagiarismResult {
  const wordCount =
    payload.scannedDocument?.totalWords ?? countWords(request.text);
  const internetResults = payload.results?.internet ?? [];

  const matches: MatchResult[] = internetResults
    .filter((result): result is CopyleaksInternetResult & { url: string } =>
      Boolean(result.url),
    )
    .map((result) => {
      const matchedWords = result.matchedWords ?? 0;
      const similarity =
        wordCount > 0
          ? Math.min(100, Math.round((matchedWords / wordCount) * 100))
          : 0;

      return {
        url: result.url,
        similarity,
        matchedText: result.introduction ?? result.title ?? "",
      };
    })
    .filter((match) => match.similarity > 0)
    .sort((left, right) => right.similarity - left.similarity);

  const overallScore =
    payload.score?.aggregatedScore ??
    (matches.length > 0 ? matches[0].similarity : 0);

  return buildPlagiarismResult(matches, wordCount, overallScore);
}

/** Secondary provider — Copyleaks API with async webhook polling (fallback / production). */
export class CopyleaksFreeProvider implements PlagiarismProvider {
  /** Runs a Copyleaks plagiarism scan and waits for webhook completion. */
  async check(request: PlagiarismRequest): Promise<PlagiarismResult> {
    const scanId = `plagiarcheck-${Date.now()}`;
    const accessToken = await loginToCopyleaks();

    await submitCopyleaksScan(accessToken, scanId, request);

    try {
      const payload = await waitForScanCompletion(scanId, POLL_TIMEOUT_MS);
      return mapCopyleaksPayload(request, payload);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Copyleaks scan did not complete in time";

      throw new PlagiarismProviderError(message, "COPYLEAKS_TIMEOUT");
    }
  }
}
