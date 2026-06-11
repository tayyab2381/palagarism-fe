import type { ReactNode } from "react";

interface FormErrorProps {
  children: ReactNode;
  className?: string;
}

/** Neutral form-level error — achromatic, no red text. */
export function FormError({ children, className = "" }: FormErrorProps) {
  return (
    <div
      className={`rounded-card-sm border-l-2 border-graphite bg-fog px-4 py-3 ${className}`.trim()}
      role="alert"
    >
      <p className="text-sm font-medium text-obsidian">{children}</p>
    </div>
  );
}
