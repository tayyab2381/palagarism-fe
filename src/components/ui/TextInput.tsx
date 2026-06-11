import type { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function TextInput({ className = "", ...props }: TextInputProps) {
  return (
    <input
      className={`w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200 ${className}`.trim()}
      {...props}
    />
  );
}
