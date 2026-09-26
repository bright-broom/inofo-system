import { Header } from "./Header";
import { Footer } from "./Footer";

// プライバシーポリシー・運営会社などの下層ページ共通レイアウト
export function SubPage({ en, title, children }: { en: string; title: string; children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="min-h-[70vh]">
        <div className="bg-sun pt-28 pb-14 md:pt-36 md:pb-20">
          <div className="mx-auto max-w-3xl px-4">
            <p className="mb-2 font-display text-xs tracking-[.35em] uppercase">{en}</p>
            <h1 className="sec-title text-3xl md:text-4xl">{title}</h1>
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 py-14 md:py-20">{children}</div>
      </main>
      <Footer />
    </>
  );
}
