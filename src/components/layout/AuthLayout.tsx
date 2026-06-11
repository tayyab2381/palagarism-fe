import type { ReactNode } from "react";
import { AuthProductPreview } from "@/components/layout/AuthProductPreview";

interface AuthLayoutProps {
  children: ReactNode;
}

/** Premium auth shell with gradient background and product preview. */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-hero"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-page items-center gap-12 px-6 py-section lg:grid-cols-2">
        <div>{children}</div>
        <AuthProductPreview />
      </div>
    </main>
  );
}
