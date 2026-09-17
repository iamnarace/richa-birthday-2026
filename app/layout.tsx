import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For Richa — 20 September 2026",
  description: "A private birthday experience, made with love for Richa.",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
