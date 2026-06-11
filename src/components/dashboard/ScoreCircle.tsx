"use client";

import { getScoreGradient, getScoreTone } from "@/lib/score-utils";
import { SimilarityScoreBadge } from "@/components/ui/SimilarityScoreBadge";

interface ScoreCircleProps {
  score: number;
}

export function ScoreCircle({ score }: ScoreCircleProps) {
  const bounded = Math.min(100, Math.max(0, Math.round(score)));
  const tone = getScoreTone(bounded);
  const stroke = getScoreGradient(bounded);
  const r = 48;
  const c = 2 * Math.PI * r;
  const offset = c - (bounded / 100) * c;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-28 w-28">
        <svg className="h-28 w-28 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={r} fill="none" stroke="#E7E5E4" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke={stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold tabular-nums text-ink">
            {bounded}%
          </span>
        </div>
      </div>
      <SimilarityScoreBadge score={bounded} className="mt-3" />
      <p className="mt-1.5 text-sm text-ink-subtle">{tone.label}</p>
    </div>
  );
}
