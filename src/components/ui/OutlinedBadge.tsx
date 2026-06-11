import type { HTMLAttributes, ReactNode } from "react";

interface OutlinedBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  className?: string;
}

/** Ghost badge for tags on dark surfaces or images. */
export function OutlinedBadge({
  children,
  className = "",
  ...props
}: OutlinedBadgeProps) {
  return (
    <span
      className={`inline-flex items-center border border-white/30 text-white text-xs font-medium px-2 py-1 rounded-badge ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}
