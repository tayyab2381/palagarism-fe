import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const productLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#features", label: "Features" },
  { href: "/signup", label: "Get started" },
  { href: "/login", label: "Sign in" },
] as const;

/** Dark slate footer with gradient top border. */
export function PublicFooter() {
  return (
    <footer className="relative mt-section border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-brand opacity-60" />
      <div className="mx-auto max-w-page px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">PlagiarCheck</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Professional plagiarism detection for students and researchers.
              Free, private, and instant.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Product</p>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Legal</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/#privacy"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-slate-800 pt-8 text-sm text-slate-500">
          © {new Date().getFullYear()} PlagiarCheck. Built for students worldwide.
        </p>
      </div>
    </footer>
  );
}
