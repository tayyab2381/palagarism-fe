import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface PrimaryCtaButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  href?: string;
}

const baseClassName =
  "inline-flex items-center justify-center bg-obsidian text-white text-sm font-medium px-4 py-3 rounded-pill hover:opacity-90 transition-opacity";

const ctaShadowStyle = { boxShadow: "var(--shadow-cta)" };

/** Primary filled pill CTA — obsidian fill with mandatory inset shadow. */
export function PrimaryCtaButton({
  children,
  className = "",
  href,
  type = "button",
  ...props
}: PrimaryCtaButtonProps) {
  const classNames = `${baseClassName} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classNames} style={ctaShadowStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classNames}
      style={ctaShadowStyle}
      {...props}
    >
      {children}
    </button>
  );
}
