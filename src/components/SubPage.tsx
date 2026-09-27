import { Header } from "./Header";
import { Footer } from "./Footer";
import { Breadcrumbs } from "./Breadcrumbs";
import type { Crumb } from "@/seo";

// プライバシーポリシー・運営会社などの下層ページ共通レイアウト
export function SubPage({ en, title, breadcrumbs, lead, children }: { en: string; title: string; breadcrumbs?: Crumb[]; lead?: string; children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="min-h-[70vh]">
        <div className="bg-sun pt-28 pb-14 md:pt-36 md:pb-20">
          <div className="mx-auto max-w-3xl px-4">
            {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
            <p className="mb-2 font-display text-xs tracking-[.35em] uppercase">{en}</p>
            <h1 className="sec-title text-3xl md:text-4xl">{title}</h1>
            {lead && <p className="mt-5 max-w-2xl text-sm leading-loose font-bold md:text-base">{lead}</p>}
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 py-14 md:py-20">{children}</div>
      </main>
      <Footer />
    </>
  );
}
