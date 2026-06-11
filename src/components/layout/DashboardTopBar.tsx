"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronRight, LogOut, Menu } from "lucide-react";
import { logout } from "@/lib/auth-client";
import { Button } from "@/components/ui/Button";
import { usePlagiarismStore } from "@/store/plagiarismStore";

interface DashboardTopBarProps {
  onMenuToggle?: () => void;
}

/** Dashboard top bar with breadcrumb and avatar chip. */
export function DashboardTopBar({ onMenuToggle }: DashboardTopBarProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const clearAll = usePlagiarismStore((state) => state.clearAll);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logout();
      clearAll();
      router.push("/");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {onMenuToggle ? (
          <button
            type="button"
            onClick={onMenuToggle}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        ) : null}

        <div>
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <span>Dashboard</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-slate-700">Plagiarism check</span>
          </div>
          <h1 className="mt-0.5 text-2xl font-bold text-slate-900">
            Check your document
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-brand text-xs font-bold text-white ring-2 ring-brand-100">
            PC
          </div>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="gap-2 px-4 py-2"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">
            {isLoggingOut ? "Logging out…" : "Log out"}
          </span>
        </Button>
      </div>
    </div>
  );
}
