export interface ScoreTone {
  label: string;
}

/** Maps a similarity percentage to a display label. */
export function getScoreTone(score: number): ScoreTone {
  const boundedScore = Math.min(100, Math.max(0, Math.round(score)));

  if (boundedScore <= 20) {
    return { label: "Low similarity" };
  }

  if (boundedScore <= 50) {
    return { label: "Moderate similarity" };
  }

  return { label: "High similarity" };
}

/** Returns gradient stroke color based on similarity score. */
export function getScoreGradient(score: number): string {
  if (score <= 20) return "#14B8A6";
  if (score <= 50) return "#F59E0B";
  return "#F43F5E";
}

/** Extracts hostname from a URL for display. */
export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
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
