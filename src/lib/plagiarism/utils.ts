import type { MatchResult, PlagiarismResult } from "@/lib/plagiarism/types";

const MAX_WORDS = 5_000;

/** Counts words by splitting on whitespace. */
export function countWords(text: string): number {
  const trimmed = text.trim();
  if (trimmed === "") {
    return 0;
  }

  return trimmed.split(/\s+/).length;
}

/** Ensures submitted text is non-empty and within the word limit. */
export function validatePlagiarismText(text: string): void {
  const wordCount = countWords(text);

  if (wordCount === 0) {
    throw new Error("Text cannot be empty");
  }

  if (wordCount > MAX_WORDS) {
    throw new Error(`Text exceeds the ${MAX_WORDS.toLocaleString()} word limit`);
  }
}

/** Builds a normalized PlagiarismResult from raw match data. */
export function buildPlagiarismResult(
  matches: MatchResult[],
  wordCount: number,
  overallScore: number,
): PlagiarismResult {
  const boundedScore = Math.min(100, Math.max(0, Math.round(overallScore)));

  return {
    overallScore: boundedScore,
    matches,
    wordCount,
    uniqueScore: 100 - boundedScore,
    processedAt: new Date().toISOString(),
  };
}
