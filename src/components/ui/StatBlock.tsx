import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface StatBlockProps {
  value: string;
  label: string;
  icon?: LucideIcon;
  iconClassName?: string;
  className?: string;
}

/** Stat block with optional icon circle. */
export function StatBlock({
  value,
  label,
  icon: Icon,
  iconClassName = "bg-brand-50 text-brand-600",
  className = "",
}: StatBlockProps) {
  return (
    <div className={className}>
      {Icon ? (
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${iconClassName}`}
        >
          <Icon className="h-6 w-6" />
        </div>
      ) : null}
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}

/** Section heading with optional subtitle. */
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
      {eyebrow ? (
        <div className="mb-4">{eyebrow}</div>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-lg text-slate-500">{subtitle}</p>
      ) : null}
    </div>
  );
}
