import { ClipboardPaste, FileSearch, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/StatBlock";

const steps = [
  {
    number: "1",
    title: "Paste your text",
    description: "Drop your essay or paper into the checker — up to 5,000 words.",
    icon: ClipboardPaste,
  },
  {
    number: "2",
    title: "We scan the web",
    description: "Our engine compares your writing against public sources instantly.",
    icon: FileSearch,
  },
  {
    number: "3",
    title: "Review your report",
    description: "Get a similarity score with matched URLs and highlighted passages.",
    icon: Sparkles,
  },
] as const;

/** Connected timeline steps with gradient nodes. */
export function HowItWorksSection() {
  return (
    <section className="pb-section" id="how-it-works">
      <SectionHeading
        title="How it works"
        subtitle="Three simple steps from paste to a detailed similarity report."
      />

      <div className="relative mt-14 grid gap-8 md:grid-cols-3">
        <div
          className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200 md:block"
          aria-hidden
        />

        {steps.map((step) => (
          <div key={step.number} className="relative text-center md:text-left">
            <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand shadow-glow-sm md:mx-0">
              <step.icon className="h-7 w-7 text-white" />
            </div>
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-brand-600">
              Step {step.number}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
