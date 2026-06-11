import { EyeOff, Lock, Trash2 } from "lucide-react";

const trustItems = [
  { icon: Lock, label: "End-to-end privacy" },
  { icon: EyeOff, label: "No tracking" },
  { icon: Trash2, label: "Auto-deleted on close" },
] as const;

/** Compact icon-led trust row. */
export function PrivacySection() {
  return (
    <section className="pb-section" id="privacy">
      <div className="flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-slate-200/80 bg-white/60 px-6 py-8 backdrop-blur-sm md:gap-16">
        {trustItems.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
              <item.icon className="h-5 w-5 text-brand-600" />
            </div>
            <span className="text-sm font-semibold text-slate-700">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
