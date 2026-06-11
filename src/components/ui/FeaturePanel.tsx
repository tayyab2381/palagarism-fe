import type { HTMLAttributes, ReactNode } from "react";

interface FeaturePanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

/** Dark gradient panel for feature sections. */
export function FeaturePanel({
  children,
  className = "",
  ...props
}: FeaturePanelProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-dark p-8 text-white md:p-10 ${className}`.trim()}
      {...props}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl"
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  );
}
