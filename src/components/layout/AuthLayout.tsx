import type { ReactNode } from "react";
import { DarkFilledBadge } from "@/components/ui/DarkFilledBadge";
import { DarkPanel } from "@/components/ui/DarkPanel";
import { StatBlock } from "@/components/ui/StatBlock";

interface AuthLayoutProps {
  children: ReactNode;
}

const trustFeatures = [
  {
    leadIn: "100%",
    keyPhrase: "Free Forever",
    description: "No subscriptions, no hidden fees, no credit card required.",
  },
  {
    leadIn: "Zero",
    keyPhrase: "Data Storage",
    description: "Your documents never touch our database. Results vanish on refresh.",
  },
  {
    leadIn: "Instant",
    keyPhrase: "Results",
    description: "Paste, check, and review in seconds — built for tight deadlines.",
  },
] as const;

/** Split-screen auth shell — form left, trust panel right on desktop. */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-mist">
      <div className="mx-auto grid max-w-page items-center gap-12 px-6 py-section lg:grid-cols-2">
        <div>{children}</div>

        <DarkPanel className="hidden p-10 lg:block">
          <p className="text-subheading font-semibold text-snow">
            Why PlagiarCheck?
          </p>
          <p className="mt-2 text-body font-normal text-steel">
            Trusted by students and researchers who need honest, fast plagiarism
            detection without compromising privacy.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-8">
            <StatBlock value="Free" label="Forever, no card" />
            <StatBlock
              value="0"
              label="Documents stored"
              className="[&_p:first-child]:text-snow [&_p:last-child]:text-ash"
            />
          </div>

          <div className="mt-10 space-y-6">
            {trustFeatures.map((feature) => (
              <div key={feature.keyPhrase}>
                <p className="text-subheading leading-snug">
                  <span className="font-light text-ash">{feature.leadIn}</span>{" "}
                  <span className="font-semibold text-snow">
                    {feature.keyPhrase}
                  </span>
                </p>
                <p className="mt-2 text-body font-normal text-steel/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            <DarkFilledBadge>No credit card</DarkFilledBadge>
            <DarkFilledBadge>Privacy first</DarkFilledBadge>
          </div>
        </DarkPanel>
      </div>
    </main>
  );
}
