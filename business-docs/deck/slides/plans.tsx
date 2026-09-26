import { CheckItem, Footer, Pill, Slide, Title, type SlideProps } from "../components.tsx";
import { BODY_FONT, C, column, head, row } from "../theme.ts";
import { pricing, yen, target, type Plan } from "../../lib_pricing.ts";

// プランごとのスライド用の文言（料金・時間は pricing.json）
const COPY: Record<string, { catch: string; base?: string; features: (p: Plan) => string[] }> = {
  lite: { catch: "困ったときに、すぐ聞ける", features: (p) => ["メール・チャットのヘルプデスク", "アカウント発行・停止", `PCセットアップ（月${p.pcSetupPerMonth}台）`] },
  standard: { catch: "IT担当を、まるごと任せる", base: "ライトの全内容", features: (p) => ["M365 / Google Workspace 運用", "多要素認証・端末管理などの基本対策", `月${p.meetingsPerMonth}回のオンライン定例`] },
  pro: { catch: "ITの方針から、いっしょに考える", base: "スタンダードの全内容", features: () => ["IT顧問（方針・ベンダー選定）", "年間ITロードマップの作成", "業務自動化・SaaS連携の構築"] },
};

const LIGHT = { bg: C.white, fg: C.ink, sub: C.muted, acc: C.indigo, pill: C.pill, chk: C.ink, chkFg: C.white, line: C.onDark };
const DARK = { bg: C.ink, fg: C.paper, sub: C.onDark, acc: C.sun, pill: C.darkPill, chk: C.sun, chkFg: C.ink, line: C.darkLine };

function PlanCard({ plan }: { plan: Plan }) {
  const t = plan.recommended ? DARK : LIGHT;
  const copy = COPY[plan.id];
  return (
    <div style={{ flex: 1, ...column("14px"), background: t.bg, color: t.fg, border: `3px solid ${C.ink}`, borderRadius: "28px", padding: "40px" }}>
      {plan.recommended && (
        <Pill style={{ fontSize: "24px", fontWeight: 900, color: C.white, background: C.red, padding: "6px 20px" }}>いちばん人気・おすすめ</Pill>
      )}
      <div style={{ ...row, justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ ...head, fontSize: "48px", color: t.fg }}>{plan.name}</h3>
        <p style={{ fontSize: "26px", fontWeight: 900, color: t.acc, border: `2px solid ${t.acc}`, borderRadius: "999px", padding: "4px 16px" }}>{plan.rank}</p>
      </div>
      <p style={{ fontSize: "26px", fontWeight: 700, color: t.acc }}>{copy.catch}</p>
      <Pill style={{ fontSize: "24px", fontWeight: 700, background: t.pill, padding: "4px 18px" }}>{target(plan.employees)}</Pill>
      <div style={{ ...row, alignItems: "baseline", gap: "8px" }}>
        <p style={{ fontSize: "28px", fontWeight: 700 }}>¥</p>
        <p style={{ ...head, fontSize: "72px", lineHeight: 1.1 }}>{yen(plan.price)}</p>
        <p style={{ fontSize: "24px", color: t.sub }}>/月（税別）</p>
      </div>
      <p style={{ fontSize: "24px", fontWeight: 700, color: t.sub }}>{`月${plan.hours}時間まで`}</p>
      <div style={{ ...column("12px"), borderTop: `2px dashed ${t.line}`, padding: "20px 0 0 0" }}>
        {copy.base && <p style={{ fontSize: "26px", fontWeight: 900, color: t.acc }}>{`＋ ${copy.base}`}</p>}
        {copy.features(plan).map((f) => (
          <CheckItem key={f} background={t.chk} color={t.chkFg}>{f}</CheckItem>
        ))}
      </div>
    </div>
  );
}

const perHour = (p: Plan) => `${p.name}${yen(Math.round(p.price / p.hours))}円/h`;

export default function Plans({ page }: SlideProps) {
  return (
    <Slide
      id="plans"
      transition="fade"
      style={{ background: C.sun, color: C.ink, fontFamily: BODY_FONT, padding: "112px 128px 160px", display: "flex", flexDirection: "column", gap: "32px" }}
      notes={`真ん中のスタンダードを基準に説明する。上位ほど1時間あたりが割安（${pricing.plans.map(perHour).join("、")}）。品質維持のため同時${pricing.capacity}社までと伝える。`}
    >
      <div style={{ ...row, justifyContent: "space-between", alignItems: "end" }}>
        <Title eyebrow="PLANS" size="64px" gap="8px">シンプルな3つのプラン</Title>
        <p style={{ fontSize: "26px", fontWeight: 700, background: C.paper, border: `3px solid ${C.ink}`, borderRadius: "999px", padding: "8px 24px" }}>{`ご契約は同時に${pricing.capacity}社まで`}</p>
      </div>
      <div style={{ ...row, gap: "28px", alignItems: "stretch" }}>
        {pricing.plans.map((p) => <PlanCard key={p.id} plan={p} />)}
      </div>
      <Footer
        page={page}
        left={{ text: `超過分は${yen(pricing.overage.ratePerHour)}円/時間（税別）。迷ったらスタンダードがおすすめです。`, width: "1300px", color: C.muted }}
      />
    </Slide>
  );
}
