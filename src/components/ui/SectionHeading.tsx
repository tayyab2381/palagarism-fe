interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  id?: string;
}

/** Reusable section title with optional subtitle. */
export function SectionHeading({
  title,
  subtitle,
  className = "",
  id,
}: SectionHeadingProps) {
  return (
    <div className={className} id={id}>
      <h2 className="text-heading font-bold text-obsidian">{title}</h2>
      {subtitle ? (
        <p className="mt-2 max-w-lg text-body font-normal text-steel">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
