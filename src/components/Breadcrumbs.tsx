import Link from "next/link";
import type { Crumb } from "@/seo";

// 画面に出すパンくずリスト（構造化データは各ページの JsonLd で出す）
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "ホーム", path: "/" }, ...items];
  return (
    <nav aria-label="パンくずリスト" className="mb-4 text-xs font-bold">
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden className="opacity-50">›</span>}
            {i < all.length - 1 ? (
              <Link href={c.path} className="underline-offset-4 hover:underline">{c.name}</Link>
            ) : (
              <span aria-current="page" className="opacity-70">{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
