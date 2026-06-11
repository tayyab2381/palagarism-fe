import { MatchCard } from "@/components/dashboard/MatchCard";
import { ScoreCircle } from "@/components/dashboard/ScoreCircle";
import { SecondaryCard } from "@/components/ui/SecondaryCard";
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
              <p className="text-2xl font-bold text-obsidian">{stat.value}</p>
              <p className="mt-1 text-xs font-normal text-steel">{stat.label}</p>
            </SecondaryCard>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-ink">Matches</h2>
        {result.matches.length === 0 ? (
          <p className="mt-3 text-sm font-normal text-steel">
            No significant matches found in this check.
          </p>
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
