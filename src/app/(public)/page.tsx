import Link from "next/link";
import { DarkPanel } from "@/components/ui/DarkPanel";
import { PrimaryCard } from "@/components/ui/PrimaryCard";
import { PrimaryCtaButton } from "@/components/ui/PrimaryCtaButton";
import { TextArea } from "@/components/ui/TextArea";

const howItWorksSteps = [
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

const features = [
  {
    leadIn: "100%",
    keyPhrase: "Free Forever",
    description:
      "No subscriptions, no hidden fees, no credit card. Plagiarism checking should be accessible to everyone.",
  },
  {
    leadIn: "Zero",
    keyPhrase: "Data Storage",
    description:
      "Your documents never touch our database. Results live in memory only and vanish when you close the tab.",
  },
  {
    leadIn: "Instant",
    keyPhrase: "Results",
    description:
      "Paste, check, and review in seconds. Built for students rushing deadlines and researchers under pressure.",
  },
] as const;

export default function LandingPage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-pebble bg-mist">
        <div className="mx-auto flex h-14 max-w-page items-center justify-between px-6">
          <Link
            href="/"
            className="text-lg font-semibold text-obsidian"
          >
            PlagiarCheck
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm text-steel transition-colors hover:text-ink"
            >
              Login
            </Link>
            <PrimaryCtaButton href="/signup">Get Started Free</PrimaryCtaButton>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-page px-6">
        <section className="grid gap-12 py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h1 className="text-[56px] font-bold leading-[1.12] text-obsidian md:text-[64px]">
              <span className="block">
                Check Your Work{" "}
                <span className="font-light text-ash">Free</span>
              </span>
              <span className="block">Before It Checks You</span>
            </h1>

            <p className="mt-6 max-w-sm text-base font-normal leading-relaxed text-steel">
              Free plagiarism detection for students, researchers, and writers.
              No limits. No storage. No cost — ever.
            </p>
          </div>

          <PrimaryCard>
            <p className="text-xs font-medium uppercase text-steel">
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

            <p className="mt-3 text-center text-xs text-ash">
              No account needed to try · No document stored
            </p>
          </PrimaryCard>
        </section>

        <section className="pb-20">
          <h2 className="text-[32px] font-bold text-obsidian">How It Works</h2>
          <p className="mt-2 max-w-lg text-sm font-normal text-steel">
            Three steps from paste to peace of mind. No complexity, no clutter.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {howItWorksSteps.map((step) => (
              <PrimaryCard key={step.number}>
                <p className="text-[40px] font-bold text-obsidian">
                  {step.number}
                </p>
                <h3 className="mt-4 text-lg font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm font-normal text-steel">
                  {step.description}
                </p>
              </PrimaryCard>
            ))}
          </div>
        </section>

        <section className="pb-20">
          <DarkPanel className="p-10">
            <div className="grid gap-10 md:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.keyPhrase}>
                  <p className="text-lg leading-snug">
                    <span className="font-light text-ash">{feature.leadIn}</span>{" "}
                    <span className="font-semibold text-snow">
                      {feature.keyPhrase}
                    </span>
                  </p>
                  <p className="mt-3 text-sm font-normal text-steel/70">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </DarkPanel>
        </section>
      </main>

      <footer className="border-t border-pebble bg-mist py-8">
        <div className="mx-auto max-w-page px-6">
          <p className="text-sm text-steel">
            PlagiarCheck © 2024 · Built for students in Pakistan and beyond
          </p>
        </div>
      </footer>
    </>
  );
}
