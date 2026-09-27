import type { Metadata } from "next";
import Link from "next/link";
import { minPriceMan } from "@/content";
import { services, planNames } from "@/services";
import { breadcrumbLd, graph, organizationLd } from "@/seo";
import { SubPage } from "@/components/SubPage";
import { JsonLd } from "@/components/JsonLd";

const title = "情シス業務の代行サービス一覧";
const description = `ヘルプデスク、PCセットアップ、Microsoft 365・Google Workspace の運用、セキュリティ対策、ネットワーク、業務自動化まで。中小企業の情シス業務を月額${minPriceMan}万円から代行するサービスの一覧です。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services" },
};

export default function ServicesPage() {
  const crumbs = [{ name: "サービス", path: "/services" }];
  return (
    <SubPage en="Services" title={title} breadcrumbs={crumbs} lead="IT担当がいない・兼務している会社の代わりに、日々のIT対応から改善までを引き受けます。どの業務がどのプランに含まれるかも、各ページでご確認いただけます。">
      <JsonLd
        data={graph(organizationLd(), breadcrumbLd(crumbs), {
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.name, url: `/services/${s.slug}` })),
        })}
      />
      <ul className="grid gap-5 sm:grid-cols-2">
        {services.map((s) => (
          <li key={s.slug}>
            <Link href={`/services/${s.slug}`} className="block h-full rounded-3xl border-[2.5px] border-ink bg-white p-6 transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#111]">
              <h2 className="text-lg font-black">{s.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.lead}</p>
              <p className="mt-4 text-xs font-bold text-indigo">対象プラン：{planNames(s.plans).join("・")} →</p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm">
        料金と、プランごとの対応範囲は<Link href="/pricing" className="font-bold text-indigo underline">料金プラン</Link>のページにまとめています。
      </p>
    </SubPage>
  );
}
