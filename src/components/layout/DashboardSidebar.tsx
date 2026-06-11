"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DarkFilledBadge } from "@/components/ui/DarkFilledBadge";
import { SecondaryCard } from "@/components/ui/SecondaryCard";

interface DashboardSidebarProps {
  resultCount?: number;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const navItems = [{ href: "/dashboard/check", label: "Check" }] as const;

/** Desktop and mobile dashboard navigation sidebar. */
export function DashboardSidebar({
  resultCount = 0,
  isMobileOpen = false,
  onMobileClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <>
      <Link
        href="/"
        className="text-lg font-semibold text-obsidian"
        onClick={onMobileClose}
      >
        PlagiarCheck
      </Link>

      <nav className="mt-8 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={`flex items-center justify-between rounded-card-sm px-4 py-3 text-sm font-medium transition-opacity hover:opacity-80 ${
                isActive
                  ? "bg-snow text-obsidian shadow-card-inset"
                  : "text-steel"
              }`}
            >
              <span>{item.label}</span>
              {isActive && resultCount > 0 ? (
                <DarkFilledBadge>{resultCount} checks</DarkFilledBadge>
              ) : null}
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      <aside className="hidden w-[280px] shrink-0 lg:block">
        <SecondaryCard className="sticky top-24 p-6">{sidebarContent}</SecondaryCard>
      </aside>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-obsidian/40"
            aria-label="Close navigation"
            onClick={onMobileClose}
          />
          <SecondaryCard className="absolute left-0 top-0 h-full w-[280px] overflow-y-auto rounded-l-none p-6">
            {sidebarContent}
          </SecondaryCard>
        </div>
      ) : null}
    </>
  );
}
