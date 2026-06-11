interface StatBlockProps {
  value: string;
  label: string;
  className?: string;
}

/** Awesomic stat numeral block — typographic emphasis, no card wrapper. */
export function StatBlock({ value, label, className = "" }: StatBlockProps) {
  return (
    <div className={className}>
      <p className="text-heading-lg font-bold text-obsidian">{value}</p>
      <p className="mt-1 text-caption font-normal text-steel">{label}</p>
    </div>
  );
}
