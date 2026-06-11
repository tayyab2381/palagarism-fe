import { env } from "@/config/env";
import {
  detectWithProviderFallback,
  getSingleProvider,
} from "@/lib/plagiarism/providers/registry";
import type { PlagiarismRequest, PlagiarismResult } from "@/lib/plagiarism/types";
import { PlagiarismProviderError } from "@/lib/plagiarism/types";
import { validatePlagiarismText } from "@/lib/plagiarism/utils";

export class PlagiarismDetectionError extends Error {
  readonly code: string;

  constructor(message: string, code = "DETECTION_ERROR") {
    super(message);
    this.name = "PlagiarismDetectionError";
    this.code = code;
  }
}

/**
 * Runs plagiarism detection using the configured strategy:
 * - auto (default): Google first, Copyleaks fallback
 * - google: Google only
 * - copyleaks: Copyleaks only (for production launch)
 */
async function runDetection(
  request: PlagiarismRequest,
): Promise<PlagiarismResult> {
  if (env.PLAGIARISM_PROVIDER === "google") {
    return getSingleProvider("google").check(request);
  }

  if (env.PLAGIARISM_PROVIDER === "copyleaks") {
    return getSingleProvider("copyleaks").check(request);
  }

  return detectWithProviderFallback(request);
}

/** Validates input and delegates plagiarism detection to the active provider chain. */
export async function detectPlagiarism(
  request: PlagiarismRequest,
): Promise<PlagiarismResult> {
  try {
    validatePlagiarismText(request.text);
    return await runDetection(request);
  } catch (error) {
    if (error instanceof PlagiarismDetectionError) {
      throw error;
    }

    if (error instanceof PlagiarismProviderError) {
      throw new PlagiarismDetectionError(error.message, error.code);
    }

    if (error instanceof Error) {
      throw new PlagiarismDetectionError(error.message, "VALIDATION_ERROR");
    }

    throw new PlagiarismDetectionError(
      "Plagiarism detection failed",
      "UNKNOWN_ERROR",
    );
  }
}
