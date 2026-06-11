import { CopyleaksFreeProvider } from "@/lib/plagiarism/providers/copyleaks-free";
import type { PlagiarismRequest, PlagiarismResult } from "@/lib/plagiarism/types";
import { PlagiarismProviderError } from "@/lib/plagiarism/types";
import { validatePlagiarismText } from "@/lib/plagiarism/utils";

const copyleaksProvider = new CopyleaksFreeProvider();

export class PlagiarismDetectionError extends Error {
  readonly code: string;

  constructor(message: string, code = "DETECTION_ERROR") {
    super(message);
    this.name = "PlagiarismDetectionError";
    this.code = code;
  }
}

/** Validates input and runs plagiarism detection via Copyleaks. */
export async function detectPlagiarism(
  request: PlagiarismRequest,
): Promise<PlagiarismResult> {
  try {
    validatePlagiarismText(request.text);
    return await copyleaksProvider.check(request);
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
