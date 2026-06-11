import type { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function TextArea({ className = "", ...props }: TextAreaProps) {
  return (
    <textarea
      className={`w-full resize-y rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200 ${className}`.trim()}
      {...props}
    />
  );
}
