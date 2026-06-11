import { TextInput } from "@/components/ui/TextInput";
import type { InputHTMLAttributes } from "react";

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

/** Labelled auth input with inline field error below. */
export function AuthField({
  id,
  label,
  error,
  ...props
}: AuthFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <TextInput id={id} className="mt-2" aria-invalid={Boolean(error)} {...props} />
      {error ? (
        <p className="mt-1 text-sm font-medium text-obsidian" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
