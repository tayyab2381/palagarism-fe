import Link from "next/link";

const productLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#features", label: "Features" },
  { href: "/signup", label: "Get started" },
  { href: "/login", label: "Sign in" },
] as const;

export function PublicFooter() {
  return (
    <footer className="mt-section border-t border-line bg-stone-100/50">
      <div className="mx-auto max-w-page px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-semibold text-ink">PlagiarCheck</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-subtle">
              Plagiarism detection that stays out of your way. Free, private,
              and built for real deadlines.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-ink-subtle">
              Product
            </p>
            <ul className="mt-3 space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-muted hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-ink-subtle">
              Legal
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/#privacy" className="text-sm text-ink-muted hover:text-ink">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-sm text-ink-muted hover:text-ink">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule mt-10" />
        <p className="mt-6 text-xs text-ink-subtle">
          © {new Date().getFullYear()} PlagiarCheck
        </p>
      </div>
    </footer>
  );
}
