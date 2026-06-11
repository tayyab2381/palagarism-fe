import type { HTMLAttributes, ReactNode } from "react";

type BadgeVariant = "default" | "teal" | "amber" | "rose" | "muted";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-stone-100 text-ink-muted",
  teal: "bg-accent-light text-accent-dark",
  amber: "bg-amber-50 text-amber-800",
  rose: "bg-rose-50 text-rose-800",
  muted: "bg-stone-50 text-ink-subtle border border-line",
};

/** Small label badge — muted, not loud. */
export function Badge({
  children,
  variant = "muted",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}
