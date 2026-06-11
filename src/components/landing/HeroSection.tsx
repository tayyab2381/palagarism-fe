import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SimilarityScoreBadge } from "@/components/ui/SimilarityScoreBadge";

function ReportPreview() {
  return (
    <Card variant="outline" className="p-5">
      <div className="mb-4 flex items-baseline justify-between border-b border-line pb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-ink-subtle">
          Sample report
        </span>
        <SimilarityScoreBadge score={12} />
      </div>

      <div className="space-y-3">
        {[
          { source: "wikipedia.org", score: 8 },
          { source: "scholar.example.edu", score: 4 },
        ].map((row) => (
          <div
            key={row.source}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-ink-muted">{row.source}</span>
            <span className="tabular-nums text-ink-subtle">{row.score}%</span>
          </div>
        ))}
      </div>

      <div className="mt-4 h-px bg-line" />
      <p className="mt-3 text-xs leading-relaxed text-ink-subtle">
        Matched passages listed with source links. Nothing stored on our
        servers.
      </p>
    </Card>
  );
}

export function HeroSection() {
  return (
    <section className="grid items-start gap-12 pb-section pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pt-16">
      <div>
        <p className="text-sm font-medium text-accent-dark">Free · Private · Instant</p>

        <h1 className="mt-4 text-display-sm font-semibold tracking-tight text-ink lg:text-display">
          Plagiarism checks without the enterprise price tag
        </h1>

        <p className="mt-5 max-w-md text-body-lg text-ink-subtle">
          Paste your text, get a clear similarity report with matched sources.
          Your work never leaves your browser session.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/signup">Start checking</Button>
          <Button href="/#how-it-works" variant="secondary">
            How it works
          </Button>
        </div>
      </div>

      <ReportPreview />
    </section>
  );
}
