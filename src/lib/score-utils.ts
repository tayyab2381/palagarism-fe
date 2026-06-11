export interface ScoreTone {
  label: string;
}

/** Maps a similarity percentage to a display label. */
export function getScoreTone(score: number): ScoreTone {
  const boundedScore = Math.min(100, Math.max(0, Math.round(score)));

  if (boundedScore <= 20) {
    return { label: "Low Similarity" };
  }

  if (boundedScore <= 50) {
    return { label: "Moderate Similarity" };
  }

  return { label: "High Similarity" };
}

/** Formats an ISO timestamp for sidebar display. */
export function formatCheckedAt(iso: string): string {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}
