import type { HTMLAttributes, ReactNode } from "react";

interface PrimaryCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

/** White card surface on mist canvas — inset border only, no drop shadow. */
export function PrimaryCard({
  children,
  className = "",
  ...props
}: PrimaryCardProps) {
  return (
    <div
      className={`bg-snow rounded-card p-7 ${className}`.trim()}
      style={{ boxShadow: "var(--shadow-card-inset)" }}
      {...props}
    >
      {children}
    </div>
  );
}
