import type { Metadata } from "next";
import { brand } from "@/content";
import "./globals.css";

export const metadata: Metadata = {
  title: `${brand.name}｜中小企業の情シス業務をまるごと支援`,
  description: "IT担当者が兼務・不在の中小企業向けに、ヘルプデスクからIT戦略までを月額で支援する情シスアウトソーシング。",
};

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
      <body className="font-sans">{children}</body>
    </html>
  );
}
