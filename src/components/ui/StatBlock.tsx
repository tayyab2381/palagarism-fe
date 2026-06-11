import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface StatBlockProps {
  value: string;
  label: string;
  icon?: LucideIcon;
  className?: string;
}

export function StatBlock({ value, label, icon: Icon, className = "" }: StatBlockProps) {
  return (
    <div className={className}>
      {Icon ? (
        <Icon className="mb-3 h-5 w-5 text-ink-subtle" strokeWidth={1.5} />
      ) : null}
      <p className="text-2xl font-semibold tracking-tight text-ink">{value}</p>
      <p className="mt-0.5 text-sm text-ink-subtle">{label}</p>
    </div>
  );
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  className = "",
  id,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div className={className} id={id}>
      {eyebrow ? <div className="mb-3">{eyebrow}</div> : null}
      <h2 className="text-heading font-semibold tracking-tight text-ink">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 max-w-xl text-body-lg text-ink-subtle">{subtitle}</p>
      ) : null}
    </div>
  );
}
