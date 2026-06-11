import { EyeOff, Lock, Shield, Zap } from "lucide-react";
import { FeaturePanel } from "@/components/ui/FeaturePanel";
import { SectionHeading } from "@/components/ui/StatBlock";

const features = [
  {
    icon: Shield,
    title: "Free to use",
    description: "No trial that expires. No card on file.",
  },
  {
    icon: Lock,
    title: "Nothing stored",
    description: "Text is processed for the check, then discarded from our side.",
  },
  {
    icon: Zap,
    title: "Fast turnaround",
    description: "Most checks finish in under half a minute.",
  },
  {
    icon: EyeOff,
    title: "Session-only history",
    description: "Refresh the page and your session list clears.",
  },
] as const;

export function FeaturesPanel() {
  return (
    <section className="pb-section" id="features">
      <SectionHeading
        title="Straightforward by design"
        subtitle="We skipped the feature bloat. You get checks, reports, and privacy."
        className="mb-8"
      />

      <FeaturePanel>
        <div className="grid gap-8 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="flex gap-3">
              <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-stone-400" strokeWidth={1.5} />
              <div>
                <h3 className="font-medium text-white">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-400">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </FeaturePanel>
    </section>
  );
}
