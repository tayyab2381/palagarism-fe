import { DashboardShell } from "@/components/layout/DashboardShell";

/** Dashboard route group layout — enterprise shell with sidebar and top bar. */
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardShell>{children}</DashboardShell>;
}
