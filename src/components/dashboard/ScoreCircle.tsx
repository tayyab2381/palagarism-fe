import { getScoreGradient, getScoreTone } from "@/lib/score-utils";
import { SimilarityScoreBadge } from "@/components/ui/SimilarityScoreBadge";

interface ScoreCircleProps {
  score: number;
}

/** Gradient SVG score ring with glow. */
export function ScoreCircle({ score }: ScoreCircleProps) {
  const boundedScore = Math.min(100, Math.max(0, Math.round(score)));
  const tone = getScoreTone(boundedScore);
  const strokeColor = getScoreGradient(boundedScore);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (boundedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-brand-500/10 blur-xl" />
        <div className="relative h-32 w-32">
          <svg className="h-32 w-32 -rotate-90" viewBox="0 0 128 128">
            <circle
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="10"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              stroke={strokeColor}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-slate-900">
              {boundedScore}%
            </span>
            <span className="text-xs text-slate-500">similarity</span>
          </div>
        </div>
      </div>
      <SimilarityScoreBadge score={boundedScore} className="mt-4" />
      <p className="mt-2 text-sm font-semibold text-slate-700">{tone.label}</p>
    </div>
  );
}
