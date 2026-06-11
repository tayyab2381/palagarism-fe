import { PrimaryCard } from "@/components/ui/PrimaryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Paste Your Text",
    description:
      "Drop your essay, paper, or article into the checker. No file uploads required.",
  },
  {
    number: "02",
    title: "We Scan the Web",
    description:
      "Our engine compares your writing against publicly available sources across the internet.",
  },
  {
    number: "03",
    title: "See Your Report",
    description:
      "Get an instant similarity score with matched sources — clear, honest, and actionable.",
  },
] as const;

/** How-it-works step cards. */
export function HowItWorksSection() {
  return (
    <section className="pb-section" id="how-it-works">
      <SectionHeading
        title="How It Works"
        subtitle="Three steps from paste to peace of mind. No complexity, no clutter."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <PrimaryCard key={step.number}>
            <p className="text-heading-lg font-bold text-obsidian">
              {step.number}
            </p>
            <h3 className="mt-4 text-subheading font-semibold text-ink">
              {step.title}
            </h3>
            <p className="mt-2 text-body font-normal text-steel">
              {step.description}
            </p>
          </PrimaryCard>
        ))}
      </div>
    </section>
  );
}
