export interface ScoreTone {
  label: string;
  strokeColor: string;
  textColor: string;
}

/** Maps a similarity percentage to display label and chromatic tones. */
export function getScoreTone(score: number): ScoreTone {
  const boundedScore = Math.min(100, Math.max(0, Math.round(score)));

  if (boundedScore <= 20) {
    return {
      label: "Low Similarity",
      strokeColor: "#16a34a",
      textColor: "text-green-700",
    };
  }

  if (boundedScore <= 50) {
    return {
      label: "Moderate Similarity",
      strokeColor: "#ca8a04",
      textColor: "text-yellow-700",
    };
  }

  return {
    label: "High Similarity",
    strokeColor: "#dc2626",
    textColor: "text-red-700",
  };
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
