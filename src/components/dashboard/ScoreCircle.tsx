import { SimilarityScoreBadge } from "@/components/ui/SimilarityScoreBadge";
import { getScoreTone } from "@/lib/score-utils";

interface ScoreCircleProps {
  score: number;
}

/** Large circular similarity score with neutral obsidian ring. */
export function ScoreCircle({ score }: ScoreCircleProps) {
  const boundedScore = Math.min(100, Math.max(0, Math.round(score)));
  const tone = getScoreTone(boundedScore);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (boundedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-24 w-24">
        <svg className="h-24 w-24 -rotate-90" viewBox="0 0 96 96">
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="#ececee"
            strokeWidth="8"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="#09090b"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-heading font-bold text-obsidian">
            {boundedScore}%
          </span>
        </div>
      </div>
      <SimilarityScoreBadge score={boundedScore} className="mt-3" />
      <p className="mt-2 text-body font-semibold text-ink">{tone.label}</p>
    </div>
  );
}
