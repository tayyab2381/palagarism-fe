import { Database, FileText, Shield, Zap } from "lucide-react";
import { StatBlock } from "@/components/ui/StatBlock";

const stats = [
  {
    value: "100%",
    label: "Free forever",
    icon: Shield,
    iconClassName: "bg-brand-50 text-brand-600",
  },
  {
    value: "0",
    label: "Documents stored",
    icon: Database,
    iconClassName: "bg-teal-50 text-accent-teal",
  },
  {
    value: "< 30s",
    label: "Average check time",
    icon: Zap,
    iconClassName: "bg-amber-50 text-accent-amber",
  },
  {
    value: "5,000",
    label: "Words per check",
    icon: FileText,
    iconClassName: "bg-violet-50 text-violet-600",
  },
] as const;

/** Stats with colored icon circles. */
export function StatsSection() {
  return (
    <section className="pb-section">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatBlock
            key={stat.label}
            value={stat.value}
            label={stat.label}
            icon={stat.icon}
            iconClassName={stat.iconClassName}
          />
        ))}
      </div>
    </section>
  );
}
