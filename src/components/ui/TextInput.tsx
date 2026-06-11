import type { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

/** White input field with pebble focus ring — no chromatic focus state. */
export function TextInput({ className = "", ...props }: TextInputProps) {
  return (
    <input
      className={`bg-snow border-transparent rounded-input px-4 py-3 text-sm font-normal text-ink placeholder:text-ash focus:outline-none focus:ring-1 focus:ring-pebble w-full ${className}`.trim()}
      {...props}
    />
  );
}
