import type { HTMLAttributes, ReactNode } from "react";

interface DarkPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

/** Obsidian contrast panel for feature or problem-statement sections. */
export function DarkPanel({
  children,
  className = "",
  ...props
}: DarkPanelProps) {
  return (
    <div
      className={`bg-obsidian rounded-card p-7 text-snow ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
