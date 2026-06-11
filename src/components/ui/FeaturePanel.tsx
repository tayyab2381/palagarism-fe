import type { HTMLAttributes, ReactNode } from "react";

interface FeaturePanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

/** Warm charcoal panel — no purple gradient mesh. */
export function FeaturePanel({
  children,
  className = "",
  ...props
}: FeaturePanelProps) {
  return (
    <div
      className={`rounded-xl bg-stone-900 px-8 py-10 text-stone-100 md:px-10 ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
