import { Card } from "@/components/ui/Card";
import { SimilarityScoreBadge } from "@/components/ui/SimilarityScoreBadge";
import { SectionHeading } from "@/components/ui/StatBlock";

export function ProductPreview() {
  return (
    <section className="pb-section">
      <SectionHeading
        title="What the report looks like"
        subtitle="A single view: overall score, word stats, and each matched source with a link."
      />

      <Card variant="outline" className="mt-8 overflow-hidden p-0">
        <div className="border-b border-line bg-stone-50 px-5 py-3">
          <span className="text-sm text-ink-subtle">Results · Research draft</span>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[140px_1fr]">
          <div className="flex flex-col items-center justify-center rounded-lg border border-line bg-stone-50 py-6">
            <span className="text-3xl font-semibold tabular-nums text-ink">24%</span>
            <span className="mt-1 text-xs text-ink-subtle">similarity</span>
          </div>

          <div className="space-y-2">
            {[
              { domain: "researchgate.net", score: 14 },
              { domain: "jstor.org", score: 10 },
            ].map((m) => (
              <div
                key={m.domain}
                className="flex items-center justify-between rounded-lg border border-line px-4 py-2.5"
              >
                <span className="text-sm text-ink">{m.domain}</span>
                <SimilarityScoreBadge score={m.score} />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
