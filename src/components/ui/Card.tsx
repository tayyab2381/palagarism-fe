import type { HTMLAttributes, ReactNode } from "react";

type CardVariant = "elevated" | "glass" | "muted";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: CardVariant;
  hover?: boolean;
  className?: string;
}

const variantClasses: Record<CardVariant, string> = {
  elevated: "bg-white border border-slate-200/80 shadow-card",
  glass: "bg-white/80 backdrop-blur-xl border border-white/60 shadow-card",
  muted: "bg-slate-50 border border-slate-200/60",
};

/** Premium card with elevation and glass variants. */
export function Card({
  children,
  variant = "elevated",
  hover = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-2xl p-6 ${variantClasses[variant]} ${hover ? "transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-glow-sm" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
