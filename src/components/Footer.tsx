import Link from "next/link";
import { brand } from "@/content";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink pt-14 pb-28 text-white md:pb-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Link href="/" aria-label="トップへ" className="[&_span:last-child]:text-white">
            <Logo />
          </Link>
          <p className="mt-4 text-sm opacity-80">{brand.company}</p>
          <p className="text-xs opacity-60">{brand.zip} {brand.address}</p>
          <p className="text-xs opacity-60">MAIL {brand.email}</p>
        </div>
        <nav aria-label="フッター" className="flex flex-wrap gap-x-6 gap-y-2 text-xs opacity-80">
          <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
          <Link href="/company" className="hover:underline">運営会社</Link>
          <Link href="/#contact" className="hover:underline">お問い合わせ</Link>
        </nav>
      </div>
      <p className="mt-10 text-center text-[11px] opacity-50">© {new Date().getFullYear()} {brand.company}</p>
    </footer>
  );
}
