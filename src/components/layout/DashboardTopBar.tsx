"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Menu } from "lucide-react";
import { logout } from "@/lib/auth-client";
import { Button } from "@/components/ui/Button";
import { usePlagiarismStore } from "@/store/plagiarismStore";

interface DashboardTopBarProps {
  onMenuToggle?: () => void;
}

export function DashboardTopBar({ onMenuToggle }: DashboardTopBarProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const clearAll = usePlagiarismStore((s) => s.clearAll);

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
    <div className="mb-6 flex items-center justify-between gap-4 border-b border-line pb-6">
      <div className="flex items-center gap-3">
        {onMenuToggle ? (
          <button
            type="button"
            onClick={onMenuToggle}
            className="rounded-lg border border-line p-2 lg:hidden"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5 text-ink-subtle" />
          </button>
        ) : null}
        <div>
          <h1 className="text-xl font-semibold text-ink">Plagiarism check</h1>
          <p className="text-sm text-ink-subtle">Paste text and run a scan</p>
        </div>
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="gap-2"
      >
        <LogOut className="h-4 w-4" strokeWidth={1.5} />
        <span className="hidden sm:inline">
          {isLoggingOut ? "Logging out…" : "Log out"}
        </span>
      </Button>
    </div>
  );
}
