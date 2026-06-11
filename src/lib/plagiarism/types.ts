export interface PlagiarismRequest {
  text: string;
  title?: string;
}

export interface MatchResult {
  url: string;
  similarity: number;
  matchedText: string;
}

export interface PlagiarismResult {
  overallScore: number;
  matches: MatchResult[];
  wordCount: number;
  uniqueScore: number;
  processedAt: string;
}

export interface PlagiarismProvider {
  check(request: PlagiarismRequest): Promise<PlagiarismResult>;
}

export class PlagiarismProviderError extends Error {
  readonly code: string;

  constructor(message: string, code = "PROVIDER_ERROR") {
    super(message);
    this.name = "PlagiarismProviderError";
    this.code = code;
  }
}
