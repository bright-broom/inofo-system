import type { Metadata, Viewport } from "next";
import { brand, minPriceMan, siteUrl, siteDescription } from "@/content";
import "./globals.css";

// 検索される言葉（ひとり情シス・外注・ITサポート）を前に、屋号を後ろに置く
const title = `ひとり情シスの外注・ITサポート｜月額${minPriceMan}万円〜｜${brand.name}`;

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
  // Google Search Console の所有権確認（HTMLタグ方式）。値は環境変数で渡す
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined,
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
