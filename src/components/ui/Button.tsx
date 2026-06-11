import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-white hover:bg-stone-800 shadow-sm active:scale-[0.98]",
  secondary:
    "border border-line bg-surface text-ink hover:border-stone-400 hover:bg-stone-50",
  ghost: "text-ink-subtle hover:bg-stone-100 hover:text-ink",
};

/** Solid, editorial button — no gradients. */
export function Button({
  children,
  variant = "primary",
  href,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const classes =
    `inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
