import type { Metadata } from "next";
import Link from "next/link";
import { Mascot } from "@/components/Mascot";

export const metadata: Metadata = {
  title: "ページが見つかりません",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-screen place-items-center bg-sun px-4 text-center">
      <div>
        <Mascot className="bob mx-auto w-28" />
        <p className="mt-6 font-display text-6xl">404</p>
        <h1 className="sec-title mt-2 text-2xl">ページが見つかりませんでした</h1>
        <p className="mt-3 text-sm">URLが変更されたか、削除された可能性があります。</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-ink px-8 py-4 font-bold text-white transition hover:bg-indigo">
          トップへ戻る
        </Link>
      </div>
    </main>
  );
}
