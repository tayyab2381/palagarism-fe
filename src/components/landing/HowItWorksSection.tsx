import { ClipboardPaste, FileSearch, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/StatBlock";

const steps = [
  {
    title: "Paste your text",
    description: "Essays, papers, articles — up to 5,000 words per check.",
    icon: ClipboardPaste,
  },
  {
    title: "Scan against the web",
    description: "We compare your writing to publicly indexed sources.",
    icon: FileSearch,
  },
  {
    title: "Read the report",
    description: "Similarity score, matched URLs, and quoted passages.",
    icon: Sparkles,
  },
] as const;

export function HowItWorksSection() {
  return (
    <section className="pb-section" id="how-it-works">
      <SectionHeading
        title="How it works"
        subtitle="Three steps. No uploads, no integrations, no learning curve."
      />

      <ol className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="relative rounded-xl border border-line bg-surface p-6"
          >
            <span className="text-xs font-medium tabular-nums text-ink-subtle">
              {String(index + 1).padStart(2, "0")}
            </span>
            <step.icon
              className="mt-4 h-5 w-5 text-ink-subtle"
              strokeWidth={1.5}
            />
            <h3 className="mt-3 font-semibold text-ink">{step.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-subtle">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
