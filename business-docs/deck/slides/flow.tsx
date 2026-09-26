import { Fragment } from "react";
import { Arrow, Card, Footer, Slide, Title, type SlideProps } from "../components.tsx";
import { C, head, paperSection, row } from "../theme.ts";

const STEPS: { title: string; sub: string; free: boolean; items: string[] }[] = [
  { title: "無料相談", sub: "メールでご連絡ください", free: true, items: ["いまのIT環境とお困りごと", "従業員数と今後の計画", "ご希望のプラン（未定でOK）"] },
  { title: "かんたん診断・ご提案", sub: "最適なプランをご提示", free: true, items: ["IT資産とアカウントの確認", "セキュリティの簡易チェック", "プランとお見積り"] },
  { title: "運用スタート", sub: "最短で翌週から", free: false, items: ["秘密保持契約・業務委託契約の締結", "管理者権限の引き継ぎ", "社内への窓口アナウンス"] },
];

export default function Flow({ page }: SlideProps) {
  return (
    <Slide id="flow" style={paperSection} notes="STEP2で見積書を出す。契約時は秘密保持契約と業務委託契約の2つを結ぶ。">
      <div style={{ ...row, justifyContent: "space-between", alignItems: "end" }}>
        <Title eyebrow="FLOW">ご利用開始までの3ステップ</Title>
        <p style={{ fontSize: "28px", fontWeight: 900, color: C.red }}>ご提案までは無料です</p>
      </div>
      <div style={{ ...row, gap: "24px" }}>
        {STEPS.map((s, i) => (
          <Fragment key={s.title}>
            {i > 0 && <Arrow />}
            <Card flex radius="28px" padding="40px" gap="16px">
              <div style={{ ...row, justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ ...head, fontSize: "28px", color: C.indigo }}>{`STEP ${i + 1}`}</p>
                {s.free && <p style={{ fontSize: "24px", fontWeight: 900, color: C.white, background: C.red, borderRadius: "999px", padding: "4px 18px" }}>無料</p>}
              </div>
              <h3 style={{ fontSize: "40px", fontWeight: 900 }}>{s.title}</h3>
              <p style={{ fontSize: "26px", fontWeight: 700, color: C.muted }}>{s.sub}</p>
              <ul style={{ fontSize: "26px", lineHeight: 1.6, color: C.ink }}>
                {s.items.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </Card>
          </Fragment>
        ))}
      </div>
      <Footer page={page} />
    </Slide>
  );
}
