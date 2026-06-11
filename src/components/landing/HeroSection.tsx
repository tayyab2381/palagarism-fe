import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SimilarityScoreBadge } from "@/components/ui/SimilarityScoreBadge";

/** CSS product mockup for hero — checker UI preview. */
function ProductMockup() {
  return (
    <Card
      variant="elevated"
      className="rotate-1 shadow-glow animate-fade-in-up p-5 md:p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Live preview
        </p>
        <Badge variant="teal">12% match</Badge>
      </div>

      <div className="flex gap-4">
        <div className="flex shrink-0 flex-col items-center">
          <div className="relative h-20 w-20">
            <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="6"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="201"
                strokeDashoffset="177"
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#14B8A6" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-slate-900">12%</span>
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="rounded-lg bg-slate-50 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-xs font-medium text-slate-700">
                wikipedia.org
              </p>
              <SimilarityScoreBadge score={8} />
            </div>
            <p className="mt-1 line-clamp-2 text-xs text-slate-500">
              Matched passage from source document...
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-xs font-medium text-slate-700">
                scholar.google.com
              </p>
              <SimilarityScoreBadge score={4} />
            </div>
            <p className="mt-1 line-clamp-2 text-xs text-slate-500">
              Partial overlap detected...
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-3/4 rounded-full bg-gradient-brand" />
      </div>
    </Card>
  );
}

/** Hero with gradient mesh and product mockup. */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-section pt-16 md:pt-24">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl animate-float"
        aria-hidden
      />

      <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="animate-fade-in-up">
          <Badge variant="brand" className="mb-6">
            Free for students & researchers
          </Badge>

          <h1 className="text-display-sm font-extrabold tracking-tight text-slate-900 md:text-display">
            Check your work for plagiarism —{" "}
            <span className="text-gradient">completely free</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
            Instant similarity reports with matched sources. Your documents
            never leave your session. Create a free account in 30 seconds.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/signup">Start checking free</Button>
            <Button href="/#how-it-works" variant="secondary">
              See how it works
            </Button>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            No credit card · No document storage · Up to 5,000 words per check
          </p>
        </div>

        <div className="relative lg:pl-4">
          <ProductMockup />
        </div>
      </div>
    </section>
  );
}
