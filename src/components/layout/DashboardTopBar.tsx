"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "@/lib/auth-client";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { usePlagiarismStore } from "@/store/plagiarismStore";

interface DashboardTopBarProps {
  title?: string;
  onMenuToggle?: () => void;
}

/** Dashboard top bar with page title and logout. */
export function DashboardTopBar({
  title = "Plagiarism Check",
  onMenuToggle,
}: DashboardTopBarProps) {
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
      <div className="flex items-center gap-4">
        {onMenuToggle ? (
          <button
            type="button"
            onClick={onMenuToggle}
            className="rounded-card-sm bg-fog px-3 py-2 text-sm font-medium text-ink lg:hidden"
            aria-label="Open navigation menu"
          >
            Menu
          </button>
        ) : null}
        <div>
          <p className="text-caption font-medium uppercase text-steel">
            Dashboard
          </p>
          <h1 className="text-heading-sm font-semibold text-obsidian">
            {title}
          </h1>
        </div>
      </div>

      <SecondaryButton
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="shrink-0"
      >
        {isLoggingOut ? "Logging out…" : "Log out"}
      </SecondaryButton>
    </div>
  );
}
