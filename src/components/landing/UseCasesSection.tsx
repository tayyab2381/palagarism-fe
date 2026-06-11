import { BookOpen, GraduationCap, Microscope } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/StatBlock";

const useCases = [
  {
    title: "Students",
    icon: GraduationCap,
    initials: "ST",
    gradient: "from-brand-500 to-violet-500",
    scenario:
      "Submit essays and assignments with confidence. Catch accidental overlap before your professor does.",
  },
  {
    title: "Researchers",
    icon: Microscope,
    initials: "RS",
    gradient: "from-teal-500 to-brand-500",
    scenario:
      "Verify originality in papers and literature reviews. See matched sources with direct links.",
  },
  {
    title: "Educators",
    icon: BookOpen,
    initials: "ED",
    gradient: "from-amber-500 to-rose-500",
    scenario:
      "Recommend a free tool students can use proactively — no institutional license required.",
  },
] as const;

/** Persona-based use cases replacing fake testimonials. */
export function UseCasesSection() {
  return (
    <section className="pb-section" id="use-cases">
      <SectionHeading
        title="Made for every writer"
        subtitle="Whether you're submitting a thesis or grading a class, PlagiarCheck fits your workflow."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {useCases.map((item) => (
          <Card key={item.title} hover variant="elevated">
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-sm font-bold text-white shadow-glow-sm`}
            >
              {item.initials}
            </div>
            <div className="mb-2 flex items-center gap-2">
              <item.icon className="h-4 w-4 text-brand-600" />
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              {item.scenario}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
