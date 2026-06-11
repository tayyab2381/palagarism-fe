import { PrimaryCard } from "@/components/ui/PrimaryCard";
import { PrimaryCtaButton } from "@/components/ui/PrimaryCtaButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

/** Final conversion CTA band. */
export function CtaBandSection() {
  return (
    <section className="pb-section">
      <PrimaryCard className="text-center">
        <h2 className="text-heading font-bold text-obsidian">
          Ready to check your work?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-body-lg font-normal text-steel">
          Join thousands of students and researchers who trust PlagiarCheck for
          free, private plagiarism detection.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <PrimaryCtaButton href="/signup">Get Started Free</PrimaryCtaButton>
          <SecondaryButton href="/#how-it-works">Learn more</SecondaryButton>
        </div>
      </PrimaryCard>
    </section>
  );
}
