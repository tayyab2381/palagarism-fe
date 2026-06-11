import { Sparkles } from "lucide-react";
import Link from "next/link";

/** Glass announcement pill with brand tint. */
export function AnnouncementBanner() {
  return (
    <div className="border-b border-brand-100/60 bg-brand-50/80 px-6 py-2.5 backdrop-blur-sm">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-center gap-2 text-center">
        <Sparkles className="h-4 w-4 text-brand-600" />
        <p className="text-sm text-slate-700">
          100% free plagiarism checks — no credit card required
        </p>
        <Link
          href="/signup"
          className="text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          Get started →
        </Link>
      </div>
    </div>
  );
}
