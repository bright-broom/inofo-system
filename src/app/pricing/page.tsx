import type { Metadata } from "next";
import Link from "next/link";
import { capacity, excluded, minPriceMan, planNotes } from "@/content";
import { breadcrumbLd, graph, organizationLd, plansOfferLd } from "@/seo";
import { SubPage } from "@/components/SubPage";
import { JsonLd } from "@/components/JsonLd";
import { CompareTable, PlanCards } from "@/components/PlanTable";

const title = `情シス外注の料金プラン（月額${minPriceMan}万円〜）`;
const description = `中小企業向け情シス代行の料金です。ライト・スタンダード・プロの3プランを月額${minPriceMan}万円（税別）から。月の対応時間、返信の目安、含まれる業務をプランごとに比較できます。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pricing" },
  openGraph: { title, description, url: "/pricing" },
};

export default function PricingPage() {
  const crumbs = [{ name: "料金プラン", path: "/pricing" }];
  return (
    <SubPage en="Pricing" title={title} breadcrumbs={crumbs} lead={`プランは3つだけです。会社の規模とIT対応の量に合わせてお選びください。品質を保つため、ご契約は同時に${capacity}社までとしています。`}>
      <JsonLd data={graph(organizationLd(), breadcrumbLd(crumbs), { "@type": "OfferCatalog", name: "月額プラン", itemListElement: plansOfferLd() })} />
      <PlanCards />
      <CompareTable />
      <ul className="mt-6 grid gap-1 text-xs">
        {planNotes.map((n) => <li key={n}>※{n}</li>)}
      </ul>
      <section className="mt-12 rounded-3xl bg-soft p-6">
        <h2 className="font-black">月額料金に含まれないもの</h2>
        <ul className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
          {excluded.map((e) => <li key={e} className="flex gap-2"><span className="text-indigo">●</span>{e}</li>)}
        </ul>
      </section>
      <p className="mt-10 text-sm">
        各プランで対応する業務の詳細は<Link href="/services" className="font-bold text-indigo underline">サービス一覧</Link>、契約についての疑問は<Link href="/faq" className="font-bold text-indigo underline">よくある質問</Link>をご覧ください。
      </p>
    </SubPage>
  );
}
