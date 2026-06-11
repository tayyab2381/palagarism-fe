"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileSearch, History } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SimilarityScoreBadge } from "@/components/ui/SimilarityScoreBadge";
import { formatCheckedAt } from "@/lib/score-utils";
import {
  usePlagiarismStore,
  useResultCount,
} from "@/store/plagiarismStore";

interface DashboardSidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const navItems = [
  { href: "/dashboard/check", label: "Check", icon: FileSearch },
] as const;

export function DashboardSidebar({
  isMobileOpen = false,
  onMobileClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const history = usePlagiarismStore((s) => s.history);
  const currentId = usePlagiarismStore((s) => s.currentResult?.id ?? null);
  const setCurrentResult = usePlagiarismStore((s) => s.setCurrentResult);
  const removeResult = usePlagiarismStore((s) => s.removeResult);
  const clearAll = usePlagiarismStore((s) => s.clearAll);
  const resultCount = useResultCount();

  const content = (
    <>
      <Link href="/" className="text-sm font-semibold text-ink" onClick={onMobileClose}>
        ← PlagiarCheck
      </Link>

      <nav className="mt-6">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                active
                  ? "bg-stone-100 font-medium text-ink"
                  : "text-ink-subtle hover:bg-stone-50"
              }`}
            >
              <item.icon className="h-4 w-4" strokeWidth={1.5} />
              {item.label}
              {active && resultCount > 0 ? (
                <Badge variant="muted" className="ml-auto">
                  {resultCount}
                </Badge>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 border-t border-line pt-6">
        <div className="mb-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-ink-subtle">
          <History className="h-3.5 w-3.5" />
          Session
        </div>

        <div className="max-h-64 space-y-2 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-sm text-ink-subtle">No checks yet.</p>
          ) : (
            history.map((entry) => (
              <div
                key={entry.id}
                className={`rounded-lg border px-3 py-2 ${
                  entry.id === currentId
                    ? "border-stone-300 bg-stone-50"
                    : "border-line"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setCurrentResult(entry.id);
                    onMobileClose?.();
                  }}
                  className="w-full text-left"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium text-ink">
                      {entry.title}
                    </span>
                    <SimilarityScoreBadge score={entry.result.overallScore} />
                  </div>
                  <span className="text-xs text-ink-subtle">
                    {formatCheckedAt(entry.checkedAt)}
                  </span>
                </button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeResult(entry.id)}
                  className="mt-1 h-7 w-full px-2 text-xs"
                >
                  Remove
                </Button>
              </div>
            ))
          )}
        </div>

        {history.length > 0 ? (
          <Button
            type="button"
            variant="secondary"
            onClick={clearAll}
            className="mt-3 w-full text-sm"
          >
            Clear session
          </Button>
        ) : null}
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block">
        <Card variant="outline" className="sticky top-20 p-4">
          {content}
        </Card>
      </aside>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-stone-900/20"
            aria-label="Close"
            onClick={onMobileClose}
          />
          <Card className="absolute left-0 top-0 h-full w-64 overflow-y-auto rounded-none p-4">
            {content}
          </Card>
        </div>
      ) : null}
    </>
  );
}
