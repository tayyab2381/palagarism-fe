"use client";

import { useState, type ReactNode } from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardTopBar } from "@/components/layout/DashboardTopBar";
import { useResultCount } from "@/store/plagiarismStore";

interface DashboardShellProps {
  children: ReactNode;
}

/** Enterprise dashboard shell with sidebar nav and top bar. */
export function DashboardShell({ children }: DashboardShellProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const resultCount = useResultCount();

  return (
    <div className="min-h-screen bg-mist">
      <div className="mx-auto flex max-w-page gap-6 px-6 py-8">
        <DashboardSidebar
          resultCount={resultCount}
          isMobileOpen={isMobileNavOpen}
          onMobileClose={() => setIsMobileNavOpen(false)}
        />

        <div className="min-w-0 flex-1">
          <DashboardTopBar onMenuToggle={() => setIsMobileNavOpen(true)} />
          {children}
        </div>
      </div>
    </div>
  );
}
