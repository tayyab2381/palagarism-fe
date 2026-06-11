import { DarkFilledBadge } from "@/components/ui/DarkFilledBadge";
import { PrimaryCard } from "@/components/ui/PrimaryCard";

const trustTags = [
  "No document storage",
  "Memory-only results",
  "Free forever",
] as const;

/** Privacy callout with trust badges. */
export function PrivacySection() {
  return (
    <section className="pb-section">
      <PrimaryCard className="text-center">
        <p className="text-subheading leading-snug">
          <span className="font-light text-steel">Your work stays</span>{" "}
          <span className="font-semibold text-obsidian">yours alone</span>
        </p>
        <p className="mx-auto mt-4 max-w-lg text-body font-normal text-steel">
          We never store your documents. Results exist only in your browser
          session and disappear when you close the tab. No database. No logs. No
          compromises.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {trustTags.map((tag) => (
            <DarkFilledBadge key={tag}>{tag}</DarkFilledBadge>
          ))}
        </div>
      </PrimaryCard>
    </section>
  );
}
