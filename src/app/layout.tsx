import type { Metadata, Viewport } from "next";
import { brand, siteUrl, siteDescription } from "@/content";
import "./globals.css";

const title = `${brand.name}｜中小企業の情シス業務をまるごと支援`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s｜${brand.name}` },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: brand.name,
    title,
    description: siteDescription,
    url: "/",
  },
  twitter: { card: "summary_large_image", title, description: siteDescription },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = { themeColor: "#ffed69" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Zen+Maru+Gothic:wght@400;500;700;900&display=swap"
        />
      </head>
      <body className="font-sans">
        <a
          href="#main"
          className="fixed top-2 left-2 z-[100] -translate-y-20 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition focus:translate-y-0"
        >
          本文へスキップ
        </a>
        {children}
      </body>
    </html>
  );
}
