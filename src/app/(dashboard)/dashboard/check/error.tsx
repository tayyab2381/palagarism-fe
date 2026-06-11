"use client";

import { PrimaryCard } from "@/components/ui/PrimaryCard";
import { PrimaryCtaButton } from "@/components/ui/PrimaryCtaButton";

interface CheckErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Error boundary UI for the dashboard check page. */
export default function CheckError({ reset }: CheckErrorProps) {
  return (
    <PrimaryCard className="text-center">
      <h2 className="text-heading-sm font-semibold text-obsidian">
        Something went wrong
      </h2>
      <p className="mx-auto mt-2 max-w-md text-body font-normal text-steel">
        We couldn&apos;t load the plagiarism checker. Please try again.
      </p>
      <PrimaryCtaButton type="button" onClick={reset} className="mt-6">
        Try again
      </PrimaryCtaButton>
    </PrimaryCard>
  );
}
