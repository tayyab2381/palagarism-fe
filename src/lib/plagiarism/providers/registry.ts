import { env } from "@/config/env";
import { CopyleaksFreeProvider } from "@/lib/plagiarism/providers/copyleaks-free";
import {
  isCopyleaksConfigured,
  isGoogleConfigured,
} from "@/lib/plagiarism/providers/config";
import { GoogleSearchProvider } from "@/lib/plagiarism/providers/google-search";
import type {
  PlagiarismProvider,
  PlagiarismRequest,
  PlagiarismResult,
} from "@/lib/plagiarism/types";
import { PlagiarismProviderError } from "@/lib/plagiarism/types";

function getCredentials() {
  return {
    googleApiKey: env.GOOGLE_CUSTOM_SEARCH_API_KEY,
    googleEngineId: env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID,
    copyleaksApiKey: env.PLAGIARISM_API_KEY,
    copyleaksEmail: env.PLAGIARISM_API_EMAIL,
  };
}

/** Resolves a single provider for forced google or copyleaks modes. */
export function getSingleProvider(
  mode: "google" | "copyleaks",
): PlagiarismProvider {
  const credentials = getCredentials();

  if (mode === "google") {
    if (!isGoogleConfigured(credentials)) {
      throw new PlagiarismProviderError(
        "Google Custom Search is not configured",
        "GOOGLE_NOT_CONFIGURED",
      );
    }

    return new GoogleSearchProvider();
  }

  if (!isCopyleaksConfigured(credentials)) {
    throw new PlagiarismProviderError(
      "Copyleaks is not configured",
      "COPYLEAKS_NOT_CONFIGURED",
    );
  }

  return new CopyleaksFreeProvider();
}

/**
 * Tries Google first (priority 1), then Copyleaks (priority 2).
 * Used for MVP and default auto mode — switch to copyleaks-only at launch if needed.
 */
export async function detectWithProviderFallback(
  request: PlagiarismRequest,
): Promise<PlagiarismResult> {
  const credentials = getCredentials();
  const failures: string[] = [];

  if (isGoogleConfigured(credentials)) {
    try {
      return await new GoogleSearchProvider().check(request);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Google provider failed";
      failures.push(`Google: ${message}`);
      console.warn("[plagiarism] Google provider failed, trying Copyleaks:", message);
    }
  }

  if (isCopyleaksConfigured(credentials)) {
    try {
      return await new CopyleaksFreeProvider().check(request);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Copyleaks provider failed";
      failures.push(`Copyleaks: ${message}`);
    }
  }

  if (failures.length === 0) {
    throw new PlagiarismProviderError(
      "No plagiarism providers are configured. Set Google Custom Search or Copyleaks credentials.",
      "NO_PROVIDERS_CONFIGURED",
    );
  }

  throw new PlagiarismProviderError(
    failures.join(" | "),
    "ALL_PROVIDERS_FAILED",
  );
}
