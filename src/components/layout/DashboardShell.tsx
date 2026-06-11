"use client";

import { useState, type ReactNode } from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardTopBar } from "@/components/layout/DashboardTopBar";

interface DashboardShellProps {
  children: ReactNode;
}

/** Premium dashboard shell with unified sidebar. */
export function DashboardShell({ children }: DashboardShellProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-page gap-8 px-6 py-8">
        <DashboardSidebar
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
