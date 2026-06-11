import type { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

/** Styled textarea with brand focus ring. */
export function TextArea({ className = "", ...props }: TextAreaProps) {
  return (
    <textarea
      className={`w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${className}`.trim()}
      {...props}
    />
  );
}
