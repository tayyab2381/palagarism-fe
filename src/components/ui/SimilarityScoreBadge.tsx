import { Badge } from "@/components/ui/Badge";

interface SimilarityScoreBadgeProps {
  score: number;
  className?: string;
}

function getVariant(score: number): "teal" | "amber" | "rose" {
  if (score <= 20) return "teal";
  if (score <= 50) return "amber";
  return "rose";
}

/** Semantic similarity score badge. */
export function SimilarityScoreBadge({
  score,
  className = "",
}: SimilarityScoreBadgeProps) {
  const boundedScore = Math.min(100, Math.max(0, Math.round(score)));

  return (
    <Badge variant={getVariant(boundedScore)} className={className}>
      {boundedScore}%
    </Badge>
  );
}
