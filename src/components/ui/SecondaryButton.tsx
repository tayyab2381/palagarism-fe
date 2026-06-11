import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  href?: string;
}

const baseClassName =
  "inline-flex items-center justify-center bg-snow text-graphite border border-graphite text-sm font-medium px-5 py-3 rounded-pill hover:opacity-90 transition-opacity";

/** Outlined white pill button for secondary actions. */
export function SecondaryButton({
  children,
  className = "",
  href,
  type = "button",
  ...props
}: SecondaryButtonProps) {
  const classNames = `${baseClassName} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classNames}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classNames} {...props}>
      {children}
    </button>
  );
}
