interface SimilarityScoreBadgeProps {
  score: number;
  className?: string;
}

/** Chromatic similarity badge — the only permitted chromatic UI element. */
export function SimilarityScoreBadge({
  score,
  className = "",
}: SimilarityScoreBadgeProps) {
  const boundedScore = Math.min(100, Math.max(0, Math.round(score)));

  let toneClassName = "bg-green-100 text-green-800";

  if (boundedScore > 50) {
    toneClassName = "bg-red-100 text-red-800";
  } else if (boundedScore > 20) {
    toneClassName = "bg-yellow-100 text-yellow-800";
  }

  return (
    <span
      className={`inline-flex items-center rounded-badge text-xs font-semibold px-2 py-1 ${toneClassName} ${className}`.trim()}
    >
      {boundedScore}%
    </span>
  );
}
