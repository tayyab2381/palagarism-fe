import { PrimaryCard } from "@/components/ui/PrimaryCard";
import { PrimaryCtaButton } from "@/components/ui/PrimaryCtaButton";
import { TextArea } from "@/components/ui/TextArea";

/** Hero section with display headline and demo paste card. */
export function HeroSection() {
  return (
    <section className="grid gap-12 py-section lg:grid-cols-2 lg:items-center lg:gap-16">
      <div>
        <h1 className="text-display-sm font-bold text-obsidian md:text-display">
          <span className="block">
            Check Your Work{" "}
            <span className="font-light text-ash">Free</span>
          </span>
          <span className="block">Before It Checks You</span>
        </h1>

        <p className="mt-6 max-w-sm text-body-lg font-normal text-steel">
          Free plagiarism detection for students, researchers, and writers. No
          limits. No storage. No cost — ever.
        </p>
      </div>

      <PrimaryCard>
        <p className="text-caption font-medium uppercase text-steel">
          Paste text to check
        </p>

        <TextArea
          rows={8}
          placeholder="Paste your essay, paper, or article here…"
          className="mt-4"
          readOnly
          aria-label="Paste text to check"
        />

        <PrimaryCtaButton href="/signup" className="mt-4 w-full">
          Check for Plagiarism — It&apos;s Free
        </PrimaryCtaButton>

        <p className="mt-3 text-center text-caption text-ash">
          No account needed to try · No document stored
        </p>
      </PrimaryCard>
    </section>
  );
}
