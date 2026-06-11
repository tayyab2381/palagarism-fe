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

const statMeta = [
  { key: "words" as const, label: "Words", icon: FileText },
  { key: "unique" as const, label: "Unique", icon: BarChart3 },
  { key: "matches" as const, label: "Matches", icon: AlignLeft },
];

export function ResultDisplay({ result }: ResultDisplayProps) {
  const stats = [
    { key: "words" as const, value: result.wordCount.toLocaleString() },
    { key: "unique" as const, value: `${result.uniqueScore}%` },
    { key: "matches" as const, value: String(result.matches.length) },
  ];

  return (
    <Card variant="elevated" className="mt-6">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <ScoreCircle score={result.overallScore} />

        <div className="grid flex-1 gap-3 sm:grid-cols-3">
          {stats.map((stat) => {
            const meta = statMeta.find((m) => m.key === stat.key)!;
            return (
              <div
                key={stat.key}
                className="rounded-lg border border-line px-4 py-3"
              >
                <meta.icon className="mb-2 h-4 w-4 text-ink-subtle" strokeWidth={1.5} />
                <p className="text-xl font-semibold tabular-nums text-ink">
                  {stat.value}
                </p>
                <p className="text-xs text-ink-subtle">{meta.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 border-t border-line pt-6">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="font-semibold text-ink">Sources</h2>
          <Badge variant="muted">{result.matches.length}</Badge>
        </div>

        {result.matches.length === 0 ? (
          <EmptyState
            title="No matches"
            description="Nothing significant turned up in this scan."
            className="border-0 bg-transparent p-0 shadow-none"
          />
        ) : (
          <div className="space-y-3">
            {result.matches.map((match) => (
              <MatchCard
                key={`${match.url}-${match.similarity}`}
                match={match}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
