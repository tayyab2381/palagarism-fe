import { EyeOff, Lock, Trash2 } from "lucide-react";

const items = [
  { icon: Lock, label: "Private checks" },
  { icon: EyeOff, label: "No analytics on your text" },
  { icon: Trash2, label: "Clears when you leave" },
] as const;

export function PrivacySection() {
  return (
    <section className="pb-section" id="privacy">
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-xl border border-line bg-surface px-6 py-6">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-sm text-ink-muted">
            <item.icon className="h-4 w-4 text-ink-subtle" strokeWidth={1.5} />
            {item.label}
          </div>
        ))}
      </div>
    </section>
  );
}
