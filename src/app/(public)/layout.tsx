import { AnnouncementBanner } from "@/components/landing/AnnouncementBanner";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { PublicHeader } from "@/components/layout/PublicHeader";

/** Shared layout for all public routes — landing, login, signup. */
export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AnnouncementBanner />
      <PublicHeader />
      {children}
      <PublicFooter />
    </>
  );
}
