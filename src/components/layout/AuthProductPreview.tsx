import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SimilarityScoreBadge } from "@/components/ui/SimilarityScoreBadge";
import { CheckCircle2, Shield } from "lucide-react";

const trustPoints = [
  "Instant similarity reports",
  "No document storage",
  "Free forever",
] as const;

/** Product preview panel for auth pages. */
export function AuthProductPreview() {
  return (
    <div className="hidden lg:block">
      <Card variant="glass" className="shadow-glow">
        <div className="mb-6 flex items-center gap-2">
          <Shield className="h-5 w-5 text-brand-600" />
          <span className="font-semibold text-slate-900">Why PlagiarCheck?</span>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">Sample report</p>
            <Badge variant="teal">Low match</Badge>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0">
              <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="5"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke="#14B8A6"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="163"
                  strokeDashoffset="130"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-slate-900">8%</span>
              </div>
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-xs text-slate-600">
                  example.edu
                </span>
                <SimilarityScoreBadge score={8} />
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div className="h-full w-1/4 rounded-full bg-gradient-brand" />
              </div>
            </div>
          </div>
        </div>

        <ul className="mt-6 space-y-3">
          {trustPoints.map((point) => (
            <li key={point} className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-teal" />
              {point}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
