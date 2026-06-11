import { DarkPanel } from "@/components/ui/DarkPanel";

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

/** Dark contrast panel for value propositions. */
export function FeaturesPanel() {
  return (
    <section className="pb-section">
      <DarkPanel className="p-10">
        <div className="grid gap-10 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.keyPhrase}>
              <p className="text-subheading leading-snug">
                <span className="font-light text-ash">{feature.leadIn}</span>{" "}
                <span className="font-semibold text-snow">
                  {feature.keyPhrase}
                </span>
              </p>
              <p className="mt-3 text-body font-normal text-steel/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </DarkPanel>
    </section>
  );
}
