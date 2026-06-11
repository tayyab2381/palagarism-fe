import { Database, FileText, Shield, Zap } from "lucide-react";
import { StatBlock } from "@/components/ui/StatBlock";

const stats = [
  { value: "Free", label: "No paid tier", icon: Shield },
  { value: "0", label: "Files stored", icon: Database },
  { value: "< 30s", label: "Typical scan", icon: Zap },
  { value: "5,000", label: "Words per check", icon: FileText },
] as const;

export function StatsSection() {
  return (
    <section className="pb-section">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatBlock
            key={stat.label}
            value={stat.value}
            label={stat.label}
            icon={stat.icon}
          />
        ))}
      </div>
    </section>
  );
}
