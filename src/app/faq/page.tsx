import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/content";
import { services } from "@/services";
import { breadcrumbLd, faqLd, graph, organizationLd } from "@/seo";
import { SubPage } from "@/components/SubPage";
import { JsonLd } from "@/components/JsonLd";

const title = "情シス外注のよくある質問";
const description = "情シスの外注・ITサポートについてのよくある質問です。プランの選び方、対応時間、契約期間や解約、ツールの利用料、訪問対応などにお答えします。";

// サービスページの質問もまとめて載せる（同じ質問は1回だけ）
const all = [...faqs, ...services.flatMap((s) => s.faqs)].filter((f, i, arr) => arr.findIndex((x) => x.q === f.q) === i);

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/faq" },
  openGraph: { title, description, url: "/faq" },
};

export default function FaqPage() {
  const crumbs = [{ name: "よくある質問", path: "/faq" }];
  return (
    <SubPage en="FAQ" title={title} breadcrumbs={crumbs}>
      <JsonLd data={graph(organizationLd(), breadcrumbLd(crumbs), faqLd(all))} />
      <dl className="grid gap-4">
        {all.map((f) => (
          <div key={f.q} className="rounded-3xl border-[2.5px] border-ink bg-white p-5 md:p-6">
            <dt className="font-black"><span className="mr-2 font-display text-indigo">Q.</span>{f.q}</dt>
            <dd className="mt-3 text-sm leading-relaxed"><span className="mr-2 font-display text-alert">A.</span>{f.a}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-10 text-sm">
        料金の詳細は<Link href="/pricing" className="font-bold text-indigo underline">料金プラン</Link>、対応する業務は<Link href="/services" className="font-bold text-indigo underline">サービス一覧</Link>をご覧ください。
      </p>
    </SubPage>
  );
}
