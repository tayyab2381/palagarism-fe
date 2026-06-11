import { BookOpen, GraduationCap, Microscope } from "lucide-react";
import { SectionHeading } from "@/components/ui/StatBlock";

const useCases = [
  {
    title: "Students",
    icon: GraduationCap,
    text: "Run a check before you submit. See which sentences overlap with online sources.",
  },
  {
    title: "Researchers",
    icon: Microscope,
    text: "Sanity-check drafts and literature reviews without sending files to a third party.",
  },
  {
    title: "Educators",
    icon: BookOpen,
    text: "Point students to a free tool they can use on their own, before the deadline.",
  },
] as const;

export function UseCasesSection() {
  return (
    <section className="pb-section" id="use-cases">
      <SectionHeading
        title="Who it's for"
        subtitle="Same tool, different reasons to open it."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {useCases.map((item) => (
          <article
            key={item.title}
            className="rounded-xl border border-line bg-surface p-5"
          >
            <item.icon className="h-5 w-5 text-ink-subtle" strokeWidth={1.5} />
            <h3 className="mt-3 font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-subtle">
              {item.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
