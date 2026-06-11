import { EyeOff, Lock, Shield, Zap } from "lucide-react";
import { FeaturePanel } from "@/components/ui/FeaturePanel";
import { SectionHeading } from "@/components/ui/StatBlock";

const features = [
  {
    icon: Shield,
    title: "Always free",
    description: "No subscriptions, trials, or hidden fees. Check as often as you need.",
  },
  {
    icon: Lock,
    title: "Zero storage",
    description: "Documents never touch our database. Results exist only in your browser session.",
  },
  {
    icon: Zap,
    title: "Instant results",
    description: "Paste, scan, and review in seconds — built for deadline pressure.",
  },
  {
    icon: EyeOff,
    title: "Private by design",
    description: "Close the tab and your data is gone. No logs, no retention.",
  },
] as const;

/** 2x2 feature grid on dark gradient panel. */
export function FeaturesPanel() {
  return (
    <section className="pb-section" id="features">
      <SectionHeading
        title="Built for trust and speed"
        subtitle="Everything you need for honest plagiarism detection — without compromising your privacy."
        className="mb-10"
      />

      <FeaturePanel>
        <div className="grid gap-8 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                <feature.icon className="h-6 w-6 text-brand-200" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </FeaturePanel>
    </section>
  );
}
