import type { ReactNode } from "react";
import { AuthProductPreview } from "@/components/layout/AuthProductPreview";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="mx-auto grid max-w-page items-start gap-10 px-6 py-12 lg:grid-cols-2 lg:gap-16 lg:py-section">
      <div>{children}</div>
      <AuthProductPreview />
    </main>
  );
}
