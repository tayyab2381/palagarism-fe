import { TextInput } from "@/components/ui/TextInput";
import type { InputHTMLAttributes, ReactNode } from "react";

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  icon?: ReactNode;
}

/** Auth input with optional leading icon. */
export function AuthField({
  id,
  label,
  error,
  icon,
  className = "",
  ...props
}: AuthFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative mt-2">
        {icon ? (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        ) : null}
        <TextInput
          id={id}
          className={`${icon ? "pl-10" : ""} ${className}`.trim()}
          aria-invalid={Boolean(error)}
          {...props}
        />
      </div>
      {error ? (
        <p className="mt-1.5 text-sm font-medium text-rose-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
