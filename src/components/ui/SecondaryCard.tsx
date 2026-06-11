import type { HTMLAttributes, ReactNode } from "react";

interface SecondaryCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

/** Muted fog surface card for secondary content blocks. */
export function SecondaryCard({
  children,
  className = "",
  ...props
}: SecondaryCardProps) {
  return (
    <div className={`bg-fog rounded-card-sm p-6 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
