import { Card } from "@/components/ui/Card";
import { SimilarityScoreBadge } from "@/components/ui/SimilarityScoreBadge";

const points = [
  "Similarity score and matched URLs",
  "Nothing saved after you close the tab",
  "Free — no card required",
] as const;

export function AuthProductPreview() {
  return (
    <div className="hidden lg:block">
      <Card variant="outline" className="sticky top-24 p-6">
        <p className="text-sm font-medium text-ink">While you sign in</p>
        <p className="mt-1 text-sm text-ink-subtle">
          Here is what a finished check looks like.
        </p>

        <div className="mt-6 rounded-lg border border-line bg-stone-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-ink-subtle">Overall</span>
            <SimilarityScoreBadge score={9} />
          </div>
          <div className="mt-3 space-y-2 border-t border-line pt-3">
            <div className="flex justify-between text-sm">
              <span className="text-ink-muted">example.edu</span>
              <span className="text-ink-subtle">6%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ink-muted">blog.example.com</span>
              <span className="text-ink-subtle">3%</span>
            </div>
          </div>
        </div>

        <ul className="mt-6 space-y-2">
          {points.map((point) => (
            <li key={point} className="flex gap-2 text-sm text-ink-subtle">
              <span className="text-ink-subtle">—</span>
              {point}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
