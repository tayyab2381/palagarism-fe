import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

interface FormErrorProps {
  children: ReactNode;
  className?: string;
}

/** Rose-tinted form error with icon. */
export function FormError({ children, className = "" }: FormErrorProps) {
  return (
    <div
      className={`flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 ${className}`.trim()}
      role="alert"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent-rose" />
      <p className="text-sm font-medium text-rose-800">{children}</p>
    </div>
  );
}
