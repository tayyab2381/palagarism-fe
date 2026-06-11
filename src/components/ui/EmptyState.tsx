import type { LucideIcon } from "lucide-react";
import { FileSearch } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon = FileSearch,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <Card variant="outline" className={`text-center ${className}`.trim()}>
      <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-stone-100">
        <Icon className="h-5 w-5 text-ink-subtle" strokeWidth={1.5} />
      </div>
      <h3 className="font-semibold text-ink">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-sm text-sm text-ink-subtle">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </Card>
  );
}
