import type { Metadata } from "next";
import { brand, legal } from "@/content";
import { SubPage } from "@/components/SubPage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, graph, organizationLd } from "@/seo";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "情シス代行・ITサポート「ラクシス」のプライバシーポリシーです。取得する個人情報、利用目的、第三者提供、安全管理措置、開示などの請求方法について定めています。",
  alternates: { canonical: "/privacy" },
};

// ひな形。公開前に法務確認のうえ実態に合わせて修正すること
const sections: { h: string; body: React.ReactNode }[] = [
  {
    h: "1. 取得する個人情報",
    body: "当方は、お問い合わせやサービスのご契約にあたり、会社名・氏名・メールアドレス・電話番号・ご相談内容など、業務の遂行に必要な範囲の個人情報を取得します。",
  },
  {
    h: "2. 利用目的",
    body: (
      <ul className="list-disc space-y-1 pl-5">
        <li>お問い合わせへの回答およびご提案のため</li>
        <li>契約に基づくサービスの提供・運用・保守のため</li>
        <li>料金の請求およびご契約に関する連絡のため</li>
        <li>サービスの改善および新サービスのご案内のため</li>
      </ul>
    ),
  },
  {
    h: "3. 第三者提供",
    body: "当方は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供しません。",
  },
  {
    h: "4. 業務委託",
    body: "当方は、利用目的の達成に必要な範囲で個人情報の取り扱いを外部に委託することがあります。その場合、委託先を適切に選定し、必要かつ適切な監督を行います。",
  },
  {
    h: "5. 安全管理措置",
    body: "当方は、個人情報の漏えい・滅失・毀損を防止するため、アクセス権限の管理、通信の暗号化、従業員教育など、必要かつ適切な安全管理措置を講じます。",
  },
  {
    h: "6. 開示・訂正・利用停止等の請求",
    body: "ご本人から個人情報の開示・訂正・追加・削除・利用停止等のご請求があった場合は、ご本人であることを確認のうえ、法令に従い遅滞なく対応します。",
  },
  {
    h: "7. アクセス解析",
    body: "当サイトでは、利用状況の把握のためにアクセス解析ツールを使用する場合があります。これらのツールはCookieを利用して匿名のトラフィックデータを収集しており、個人を特定するものではありません。",
  },
  {
    h: "8. 改定",
    body: "本ポリシーの内容は、法令の変更や事業内容の変化に応じて改定することがあります。改定後の内容は当サイトに掲載した時点から効力を生じます。",
  },
  {
    h: "9. お問い合わせ窓口",
    body: (
      <>
        {brand.name}（運営者：{brand.operator}）
        <br />
        メール：<a href={`mailto:${brand.email}`} className="text-indigo underline">{brand.email}</a>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <SubPage en="Privacy Policy" title="プライバシーポリシー" breadcrumbs={[{ name: "プライバシーポリシー", path: "/privacy" }]}>
      <JsonLd data={graph(organizationLd(), breadcrumbLd([{ name: "プライバシーポリシー", path: "/privacy" }]))} />
      <p className="leading-loose">
        {brand.name}（運営者：{brand.operator}、以下「当方」）は、お客様の個人情報を適切に取り扱うことを社会的責務と考え、以下の方針に基づき個人情報を保護します。
      </p>
      <div className="mt-10 grid gap-8">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="mb-3 text-lg font-black">{s.h}</h2>
            <div className="text-[15px] leading-loose">{s.body}</div>
          </section>
        ))}
      </div>
      <p className="mt-12 text-right text-sm text-neutral-600">制定日：{legal.privacyUpdated}</p>
    </SubPage>
  );
}
