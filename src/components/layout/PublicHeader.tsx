import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#use-cases", label: "Use cases" },
] as const;

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-page items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-ink" strokeWidth={1.75} />
          <span className="text-[15px] font-semibold tracking-tight text-ink">
            PlagiarCheck
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-subtle transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/login" variant="ghost" className="hidden px-3 py-2 sm:inline-flex">
            Log in
          </Button>
          <Button href="/signup" className="px-4 py-2 text-sm">
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}
