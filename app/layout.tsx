import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Birthday Richa — हाम्रो कथा",
  description: "A private birthday album, made with love for Richa by Naresh.",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NP">
      <body>{children}</body>
    </html>
  );
}
