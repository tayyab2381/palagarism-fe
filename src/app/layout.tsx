import type { Metadata } from "next";
import "./globals.css";

// Root layout — global styles and font setup
export const metadata: Metadata = {
  title: "PlagiarCheck",
  description: "Free plagiarism detection platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-display antialiased">{children}</body>
    </html>
  );
}
