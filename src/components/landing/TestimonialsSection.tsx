import { DarkFilledBadge } from "@/components/ui/DarkFilledBadge";
import { SecondaryCard } from "@/components/ui/SecondaryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const testimonials = [
  {
    quote:
      "I use PlagiarCheck before every submission. It's fast, honest, and I love that nothing gets stored.",
    name: "Ayesha K.",
    role: "Graduate Student",
  },
  {
    quote:
      "Finally a plagiarism tool that doesn't ask for my credit card. The similarity report is clear and actionable.",
    name: "Dr. Hassan R.",
    role: "Researcher",
  },
  {
    quote:
      "Our writing center recommends PlagiarCheck to every student. Zero storage means real privacy.",
    name: "Maria L.",
    role: "Writing Tutor",
  },
] as const;

/** Social proof testimonial cards. */
export function TestimonialsSection() {
  return (
    <section className="pb-section">
      <SectionHeading
        title="Trusted by Writers Everywhere"
        subtitle="Students, researchers, and educators rely on PlagiarCheck for honest, private plagiarism detection."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <SecondaryCard key={item.name}>
            <p className="text-body-lg font-normal leading-relaxed text-ink">
              &ldquo;{item.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div>
                <p className="text-body font-semibold text-obsidian">
                  {item.name}
                </p>
                <DarkFilledBadge className="mt-1">{item.role}</DarkFilledBadge>
              </div>
            </div>
          </SecondaryCard>
        ))}
      </div>
    </section>
  );
}
