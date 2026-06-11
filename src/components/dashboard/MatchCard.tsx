import { Globe } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SimilarityScoreBadge } from "@/components/ui/SimilarityScoreBadge";
import { extractDomain } from "@/lib/score-utils";
import type { MatchResult } from "@/lib/plagiarism/types";

interface MatchCardProps {
  match: MatchResult;
}

/** Match card with domain title and similarity bar. */
export function MatchCard({ match }: MatchCardProps) {
  const domain = extractDomain(match.url);

  return (
    <Card variant="muted" className="p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50">
            <Globe className="h-4 w-4 text-brand-600" />
          </div>
          <div className="min-w-0">
            <a
              href={match.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-900 hover:text-brand-600"
            >
              {domain}
            </a>
            <p className="mt-0.5 truncate text-xs text-slate-400">{match.url}</p>
          </div>
        </div>
        <SimilarityScoreBadge score={match.similarity} />
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-brand transition-all"
          style={{ width: `${Math.min(100, match.similarity)}%` }}
        />
      </div>

      <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm leading-relaxed text-slate-600">
        {match.matchedText || "No preview available for this match."}
      </p>
    </Card>
  );
}
