import Link from "next/link";

const productLinks = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/signup", label: "Get Started" },
  { href: "/login", label: "Sign In" },
] as const;

/** Multi-column public footer. */
export function PublicFooter() {
  return (
    <footer className="border-t border-pebble bg-mist py-12">
      <div className="mx-auto max-w-page px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold text-obsidian">PlagiarCheck</p>
            <p className="mt-3 max-w-xs text-body font-normal text-steel">
              Free plagiarism detection for students, researchers, and writers.
              No limits. No storage. No cost — ever.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Product</p>
            <ul className="mt-4 space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body font-normal text-steel hover:opacity-80"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Legal</p>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="text-body font-normal text-steel">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-body font-normal text-steel">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-pebble pt-8 text-body font-normal text-steel">
          PlagiarCheck © {new Date().getFullYear()} · Built for students in
          Pakistan and beyond
        </p>
      </div>
    </footer>
  );
}
