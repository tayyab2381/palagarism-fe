export interface ScoreTone {
  label: string;
}

export function getScoreTone(score: number): ScoreTone {
  const s = Math.min(100, Math.max(0, Math.round(score)));
  if (s <= 20) return { label: "Low similarity" };
  if (s <= 50) return { label: "Moderate similarity" };
  return { label: "High similarity" };
}

export function getScoreGradient(score: number): string {
  if (score <= 20) return "#0D9488";
  if (score <= 50) return "#D97706";
  return "#E11D48";
}

export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function formatCheckedAt(iso: string): string {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}
