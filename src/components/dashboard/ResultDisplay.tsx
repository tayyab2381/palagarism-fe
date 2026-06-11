import { AlignLeft, BarChart3, FileText } from "lucide-react";
import { MatchCard } from "@/components/dashboard/MatchCard";
import { ScoreCircle } from "@/components/dashboard/ScoreCircle";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import type { PlagiarismResult } from "@/lib/plagiarism/types";

interface ResultDisplayProps {
  result: PlagiarismResult;
}

const statIcons = {
  words: FileText,
  unique: BarChart3,
  matches: AlignLeft,
} as const;

/** Full plagiarism result with gradient score and match list. */
export function ResultDisplay({ result }: ResultDisplayProps) {
  const stats = [
    {
      key: "words" as const,
      label: "Total words",
      value: result.wordCount.toLocaleString(),
    },
    {
      key: "unique" as const,
      label: "Unique content",
      value: `${result.uniqueScore}%`,
    },
    {
      key: "matches" as const,
      label: "Matches found",
      value: result.matches.length.toLocaleString(),
    },
  ];

  return (
    <Card variant="elevated" className="mt-6">
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
        <ScoreCircle score={result.overallScore} />

        <div className="grid w-full flex-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => {
            const Icon = statIcons[stat.key];
            return (
              <Card key={stat.label} variant="muted" className="p-4">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50">
                  <Icon className="h-4 w-4 text-brand-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Matched sources</h2>
          <Badge variant="brand">{result.matches.length} found</Badge>
        </div>

        {result.matches.length === 0 ? (
          <EmptyState
            title="No matches found"
            description="No significant matches were detected. Your content appears largely unique."
            className="border-0 bg-transparent p-0 shadow-none"
          />
        ) : (
          <div className="space-y-3">
            {result.matches.map((match) => (
              <MatchCard
                key={`${match.url}-${match.similarity}-${match.matchedText.slice(0, 32)}`}
                match={match}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
