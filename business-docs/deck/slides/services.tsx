import { Card, Footer, IconBadge, Slide, Title, type SlideProps } from "../components.tsx";
import { C, paperSection, row } from "../theme.ts";

const SERVICES: [string, string, string][] = [
  ["Tool", "PCセットアップ", "新しいPCの初期設定や、入社・退職時の端末対応"],
  ["Chat", "ヘルプデスク", "「メールが送れない」など日々の困りごとに対応"],
  ["Cloud", "クラウド運用", "Microsoft 365 / Google Workspace のユーザーと権限の管理"],
  ["Globe", "ネットワーク", "Wi-Fi・VPNなど社内ネットワークの見直し"],
  ["Lock", "セキュリティ", "多要素認証や端末管理など、基本の守りを整備"],
  ["Lightning", "業務自動化", "定型作業の自動化や、SaaS同士の連携"],
];

export default function Services({ page }: SlideProps) {
  return (
    <Slide id="services" style={{ ...paperSection, gap: "40px" }} notes="プランによって含まれる範囲が変わる（詳細は比較表）。専門外の大規模工事などは専門業者を紹介する。">
      <Title eyebrow="SERVICE">お任せいただける領域</Title>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "32px" }}>
        {SERVICES.map(([icon, title, desc]) => (
          <Card key={title} radius="24px" padding="36px" gap="16px">
            <div style={{ ...row, gap: "20px", alignItems: "center" }}>
              <IconBadge name={icon} size="72px" iconSize="44px" background={C.ink} color={C.sun} radius="18px" />
              <h3 style={{ fontSize: "38px", fontWeight: 900 }}>{title}</h3>
            </div>
            <p style={{ fontSize: "26px", lineHeight: 1.55, color: C.muted }}>{desc}</p>
          </Card>
        ))}
      </div>
      <Footer page={page} />
    </Slide>
  );
}
