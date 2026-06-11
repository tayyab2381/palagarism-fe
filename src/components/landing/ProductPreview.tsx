import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SimilarityScoreBadge } from "@/components/ui/SimilarityScoreBadge";
import { SectionHeading } from "@/components/ui/StatBlock";
import { BarChart3, Globe, Target } from "lucide-react";

/** Full-width product preview mockup with callouts. */
export function ProductPreview() {
  return (
    <section className="pb-section">
      <SectionHeading
        eyebrow={<Badge variant="brand">Product preview</Badge>}
        title="See exactly what you get"
        subtitle="A clear similarity score, source matches, and word-level insights — all in one view."
      />

      <Card variant="elevated" className="relative mt-10 overflow-hidden p-0">
        <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-rose-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-teal-400" />
            <span className="ml-4 text-sm font-medium text-slate-500">
              PlagiarCheck — Results
            </span>
          </div>
        </div>

        <div className="grid gap-8 p-6 md:grid-cols-3 md:p-8">
          <div className="flex flex-col items-center justify-center rounded-xl bg-brand-50/50 p-6">
            <div className="relative h-28 w-28">
              <svg className="h-28 w-28 -rotate-90" viewBox="0 0 112 112">
                <circle
                  cx="56"
                  cy="56"
                  r="44"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="8"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="44"
                  fill="none"
                  stroke="url(#previewGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="276"
                  strokeDashoffset="69"
                />
                <defs>
                  <linearGradient
                    id="previewGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-900">75%</span>
                <span className="text-xs text-slate-500">unique</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
              <Target className="h-4 w-4 text-brand-600" />
              Overall similarity score
            </div>
          </div>

          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Globe className="h-4 w-4 text-brand-600" />
              Matched sources
            </div>
            {[
              { domain: "researchgate.net", score: 18 },
              { domain: "jstor.org", score: 12 },
              { domain: "medium.com", score: 8 },
            ].map((match) => (
              <div
                key={match.domain}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
              >
                <span className="text-sm font-medium text-slate-700">
                  {match.domain}
                </span>
                <SimilarityScoreBadge score={match.score} />
              </div>
            ))}
            <div className="flex items-center gap-2 pt-2 text-sm text-slate-500">
              <BarChart3 className="h-4 w-4" />
              3 matches found · 1,240 words scanned
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
