"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileSearch, History, ShieldCheck } from "lucide-react";
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
  { href: "/dashboard/check", label: "Plagiarism check", icon: FileSearch },
] as const;

/** Unified sidebar with nav and session history. */
export function DashboardSidebar({
  isMobileOpen = false,
  onMobileClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const history = usePlagiarismStore((state) => state.history);
  const currentId = usePlagiarismStore((state) => state.currentResult?.id ?? null);
  const setCurrentResult = usePlagiarismStore((state) => state.setCurrentResult);
  const removeResult = usePlagiarismStore((state) => state.removeResult);
  const clearAll = usePlagiarismStore((state) => state.clearAll);
  const resultCount = useResultCount();

  const sidebarContent = (
    <>
      <Link
        href="/"
        className="flex items-center gap-2.5"
        onClick={onMobileClose}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand">
          <ShieldCheck className="h-4 w-4 text-white" />
        </div>
        <span className="font-bold text-slate-900">PlagiarCheck</span>
      </Link>

      <nav className="mt-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1">{item.label}</span>
              {isActive && resultCount > 0 ? (
                <Badge variant="brand">{resultCount}</Badge>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 border-t border-slate-200 pt-6">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          <History className="h-3.5 w-3.5" />
          This session
        </div>

        <div className="max-h-[calc(100vh-20rem)] space-y-2 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-sm text-slate-500">
              No checks yet. Run your first scan to see history here.
            </p>
          ) : (
            history.map((entry) => {
              const isActive = entry.id === currentId;

              return (
                <div
                  key={entry.id}
                  className={`rounded-xl border p-3 transition-colors ${
                    isActive
                      ? "border-brand-200 bg-brand-50/50"
                      : "border-slate-100 bg-slate-50 hover:border-slate-200"
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
                      <p className="text-sm font-medium text-slate-800">
                        {entry.title}
                      </p>
                      <SimilarityScoreBadge score={entry.result.overallScore} />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      {formatCheckedAt(entry.checkedAt)}
                    </p>
                  </button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeResult(entry.id)}
                    className="mt-2 h-8 w-full px-2 py-1 text-xs"
                  >
                    Remove
                  </Button>
                </div>
              );
            })
          )}
        </div>

        {history.length > 0 ? (
          <Button
            type="button"
            variant="secondary"
            onClick={clearAll}
            className="mt-4 w-full text-sm"
          >
            Clear all history
          </Button>
        ) : null}
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden w-[300px] shrink-0 lg:block">
        <Card variant="elevated" className="sticky top-24 p-5">
          {sidebarContent}
        </Card>
      </aside>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            aria-label="Close navigation"
            onClick={onMobileClose}
          />
          <Card
            variant="elevated"
            className="absolute left-0 top-0 h-full w-[300px] overflow-y-auto rounded-l-none p-5"
          >
            {sidebarContent}
          </Card>
        </div>
      ) : null}
    </>
  );
}
