import { StatBlock } from "@/components/ui/StatBlock";

const stats = [
  { value: "100%", label: "Free forever" },
  { value: "0", label: "Documents stored" },
  { value: "< 30s", label: "Average check time" },
  { value: "5,000", label: "Words per check" },
] as const;

/** Trust metrics row on mist canvas. */
export function StatsSection() {
  return (
    <section className="pb-section">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatBlock key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </section>
  );
}
