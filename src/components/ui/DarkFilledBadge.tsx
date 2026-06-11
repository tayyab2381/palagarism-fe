import type { HTMLAttributes, ReactNode } from "react";

interface DarkFilledBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  className?: string;
}

/** Graphite filled badge for tags on light surfaces. */
export function DarkFilledBadge({
  children,
  className = "",
  ...props
}: DarkFilledBadgeProps) {
  return (
    <span
      className={`inline-flex items-center bg-graphite text-white text-xs font-medium px-2 py-1 rounded-badge ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}
