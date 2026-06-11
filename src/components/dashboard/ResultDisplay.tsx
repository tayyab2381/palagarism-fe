import { MatchCard } from "@/components/dashboard/MatchCard";
import { ScoreCircle } from "@/components/dashboard/ScoreCircle";
import { DarkFilledBadge } from "@/components/ui/DarkFilledBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { SecondaryCard } from "@/components/ui/SecondaryCard";
import { StatBlock } from "@/components/ui/StatBlock";
import type { PlagiarismResult } from "@/lib/plagiarism/types";

interface ResultDisplayProps {
  result: PlagiarismResult;
}

/** Full plagiarism result with score, stats, and match list. */
export function ResultDisplay({ result }: ResultDisplayProps) {
  const stats = [
    { label: "Total Words", value: result.wordCount.toLocaleString() },
    { label: "Unique Content", value: `${result.uniqueScore}%` },
    { label: "Matches Found", value: result.matches.length.toLocaleString() },
  ] as const;

  return (
    <SecondaryCard className="mt-6">
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
        <ScoreCircle score={result.overallScore} />

        <div className="grid w-full flex-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <SecondaryCard key={stat.label} className="bg-snow p-4">
              <StatBlock value={stat.value} label={stat.label} />
            </SecondaryCard>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-heading-sm font-semibold text-ink">Matches</h2>
          <DarkFilledBadge>{result.matches.length} found</DarkFilledBadge>
        </div>

        {result.matches.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              title="No matches found"
              description="No significant matches were detected in this check. Your content appears largely unique."
              className="p-6"
            />
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {result.matches.map((match) => (
              <MatchCard
                key={`${match.url}-${match.similarity}-${match.matchedText.slice(0, 32)}`}
                match={match}
              />
            ))}
          </div>
        )}
      </div>
    </SecondaryCard>
  );
}
