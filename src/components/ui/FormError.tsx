import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

interface FormErrorProps {
  children: ReactNode;
  className?: string;
}

export function FormError({ children, className = "" }: FormErrorProps) {
  return (
    <div
      className={`flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50/80 px-3.5 py-2.5 ${className}`.trim()}
      role="alert"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent-rose" />
      <p className="text-sm text-rose-900">{children}</p>
    </div>
  );
}
