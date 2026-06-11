import type { ReactNode } from "react";
import { PrimaryCard } from "@/components/ui/PrimaryCard";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

/** Structured empty state inside a primary card surface. */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <PrimaryCard className={`text-center ${className}`.trim()}>
      {icon ? (
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-card-sm bg-fog text-obsidian">
          {icon}
        </div>
      ) : null}
      <h3 className="text-heading-sm font-semibold text-obsidian">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-body font-normal text-steel">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </PrimaryCard>
  );
}
