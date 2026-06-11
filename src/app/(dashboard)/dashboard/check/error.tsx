"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface CheckErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CheckError({ reset }: CheckErrorProps) {
  return (
    <Card variant="elevated" className="text-center">
      <h2 className="text-lg font-semibold text-slate-900">
        Something went wrong
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        We couldn&apos;t load the plagiarism checker. Please try again.
      </p>
      <Button type="button" onClick={reset} className="mt-6">
        Try again
      </Button>
    </Card>
  );
}
