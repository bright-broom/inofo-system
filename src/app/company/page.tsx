import type { Metadata } from "next";
import { legal, mailto } from "@/content";
import { SubPage } from "@/components/SubPage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, graph, organizationLd } from "@/seo";

export const metadata: Metadata = {
  title: "運営者情報",
  description: "中小企業向けの情シス代行・ITサポート「ラクシス」の運営者情報です。屋号、運営者、所在地、事業内容、対応時間、お問い合わせ先をご案内します。",
  alternates: { canonical: "/company" },
};

export default function CompanyPage() {
  return (
    <SubPage en="About" title="運営者情報" breadcrumbs={[{ name: "運営者情報", path: "/company" }]}>
      <JsonLd data={graph(organizationLd(), breadcrumbLd([{ name: "運営者情報", path: "/company" }]))} />
      <dl className="overflow-hidden rounded-3xl border-[2.5px] border-ink">
        {legal.company.map((row, i) => (
          <div key={row.label} className={`grid gap-1 p-5 md:grid-cols-[10rem_1fr] md:gap-6 ${i ? "border-t border-neutral-200" : ""}`}>
            <dt className="text-sm font-black">{row.label}</dt>
            <dd className="text-[15px] break-words">{row.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-12 text-center">
        <a href={mailto()} className="inline-block rounded-full bg-ink px-8 py-4 font-bold text-white transition hover:bg-indigo">
          メールで無料相談 →
        </a>
      </div>
    </SubPage>
  );
}
