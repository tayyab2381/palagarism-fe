import type { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

/** Multi-line text field using the same input surface recipe. */
export function TextArea({ className = "", ...props }: TextAreaProps) {
  return (
    <textarea
      className={`bg-snow border-transparent rounded-input px-4 py-3 text-sm font-normal text-ink placeholder:text-ash focus:outline-none focus:ring-1 focus:ring-pebble w-full resize-none ${className}`.trim()}
      {...props}
    />
  );
}
