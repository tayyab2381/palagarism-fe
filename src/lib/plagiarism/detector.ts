import { env } from "@/config/env";
import { CopyleaksFreeProvider } from "@/lib/plagiarism/providers/copyleaks-free";
import { GoogleSearchProvider } from "@/lib/plagiarism/providers/google-search";
import type {
  PlagiarismProvider,
  PlagiarismRequest,
  PlagiarismResult,
} from "@/lib/plagiarism/types";
import {
  PlagiarismProviderError,
} from "@/lib/plagiarism/types";
import { validatePlagiarismText } from "@/lib/plagiarism/utils";

export class PlagiarismDetectionError extends Error {
  readonly code: string;

  constructor(message: string, code = "DETECTION_ERROR") {
    super(message);
    this.name = "PlagiarismDetectionError";
    this.code = code;
  }
}

/** Resolves the active plagiarism provider from environment configuration. */
function getProvider(): PlagiarismProvider {
  if (env.PLAGIARISM_PROVIDER === "google") {
    return new GoogleSearchProvider();
  }

  return new CopyleaksFreeProvider();
}

/** Validates input and delegates plagiarism detection to the configured provider. */
export async function detectPlagiarism(
  request: PlagiarismRequest,
): Promise<PlagiarismResult> {
  try {
    validatePlagiarismText(request.text);

    const provider = getProvider();
    return await provider.check(request);
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
