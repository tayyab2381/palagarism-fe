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

/** Empty state with default icon and card wrapper. */
export function EmptyState({
  icon: Icon = FileSearch,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <Card variant="muted" className={`text-center ${className}`.trim()}>
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand shadow-glow-sm">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </Card>
  );
}
