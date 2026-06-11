import type { HTMLAttributes, ReactNode } from "react";

type CardVariant = "elevated" | "outline" | "muted";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
}

const variantClasses: Record<CardVariant, string> = {
  elevated: "bg-surface border border-line shadow-soft",
  outline: "bg-surface border border-line",
  muted: "bg-stone-100/80 border border-line/80",
};

/** Clean card with neutral shadow — no purple tint. */
export function Card({
  children,
  variant = "elevated",
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-xl p-6 ${variantClasses[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
