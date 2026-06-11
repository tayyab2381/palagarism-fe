import { Globe } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SimilarityScoreBadge } from "@/components/ui/SimilarityScoreBadge";
import { extractDomain } from "@/lib/score-utils";
import type { MatchResult } from "@/lib/plagiarism/types";

interface MatchCardProps {
  match: MatchResult;
}

export function MatchCard({ match }: MatchCardProps) {
  const domain = extractDomain(match.url);

  return (
    <Card variant="outline" className="p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 gap-2">
          <Globe className="mt-0.5 h-4 w-4 shrink-0 text-ink-subtle" strokeWidth={1.5} />
          <div className="min-w-0">
            <a
              href={match.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink hover:underline"
            >
              {domain}
            </a>
            <p className="mt-2 rounded-md bg-stone-50 px-3 py-2 text-sm leading-relaxed text-ink-muted">
              {match.matchedText || "No preview for this source."}
            </p>
          </div>
        </div>
        <SimilarityScoreBadge score={match.similarity} />
      </div>
    </Card>
  );
}
