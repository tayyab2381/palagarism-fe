import { SimilarityScoreBadge } from "@/components/ui/SimilarityScoreBadge";
import { SecondaryCard } from "@/components/ui/SecondaryCard";
import type { MatchResult } from "@/lib/plagiarism/types";

interface MatchCardProps {
  match: MatchResult;
}

/** Single plagiarism match with source link and text preview. */
export function MatchCard({ match }: MatchCardProps) {
  return (
    <SecondaryCard className="bg-snow p-4">
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={match.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-ink underline"
        >
          {match.url}
        </a>
        <SimilarityScoreBadge score={match.similarity} />
      </div>
      <p className="mt-3 text-sm font-normal text-steel">
        {match.matchedText || "No preview available for this match."}
      </p>
    </SecondaryCard>
  );
}
