import { AnnouncementBanner } from "@/components/landing/AnnouncementBanner";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { PublicHeader } from "@/components/layout/PublicHeader";

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
