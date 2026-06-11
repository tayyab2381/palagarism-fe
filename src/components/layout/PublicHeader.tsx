import Link from "next/link";
import { PrimaryCtaButton } from "@/components/ui/PrimaryCtaButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

/** Sticky public navigation header. */
export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-pebble bg-mist">
      <div className="mx-auto flex h-14 max-w-page items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold text-obsidian">
          PlagiarCheck
        </Link>

        <nav className="flex items-center gap-3">
          <SecondaryButton href="/login">Login</SecondaryButton>
          <PrimaryCtaButton href="/signup">Get Started Free</PrimaryCtaButton>
        </nav>
      </div>
    </header>
  );
}
