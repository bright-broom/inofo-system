import { BandedRows, Footer, Slide, type SlideProps } from "../components.tsx";
import { C, head, paperSection, row } from "../theme.ts";
import { pricing, yen, type Plan } from "../../lib_pricing.ts";

const yes = () => "○";
const from = (ids: string[]) => (p: Plan) => (ids.includes(p.id) ? "○" : "—");

// 比較表の行：[項目, プランごとの値]
const ROWS: [string, (p: Plan) => string][] = [
  ["月額（税別）", (p) => `¥${yen(p.price)}`],
  ["月の対応時間", (p) => `${p.hours}時間`],
  ["返信の目安（対応時間内）", (p) => p.reply],
  ["ヘルプデスク・アカウント管理", yes],
  ["PCセットアップ", (p) => `月${p.pcSetupPerMonth}台`],
  ["IT資産台帳の管理", from(["standard", "pro"])],
  ["クラウド運用（M365 / GWS）", from(["standard", "pro"])],
  ["セキュリティ基本対策", from(["standard", "pro"])],
  ["オンライン定例", (p) => (p.meetingsPerMonth ? `月${p.meetingsPerMonth}回` : "—")],
  ["IT顧問・ITロードマップ", from(["pro"])],
  ["業務自動化・SaaS連携", from(["pro"])],
  ["優先対応", from(["pro"])],
];

export default function Compare({ page }: SlideProps) {
  const plans = pricing.plans;
  return (
    <Slide id="compare" style={{ ...paperSection, padding: "112px 128px 160px", gap: "28px" }} notes="契約書の別紙1と同じ内容。質問が出たら該当行を指して説明する。">
      <div style={{ ...row, justifyContent: "space-between", alignItems: "end" }}>
        <h2 style={{ ...head, fontSize: "64px", lineHeight: 1.2 }}>プラン比較表</h2>
        <p style={{ fontSize: "24px", color: C.muted }}>○＝含む　—＝含まない</p>
      </div>
      <table style={{ width: "1664px", fontSize: "24px", color: C.ink, border: `2px solid ${C.ink}`, borderRadius: "16px" }}>
        <tr style={{ background: C.ink }}>
          <th style={{ width: "40%", color: C.paper, textAlign: "left" }}>項目</th>
          {plans.map((p) => (
            <th key={p.id} style={{ width: "20%", color: p.recommended ? C.sun : C.paper, textAlign: "center" }}>
              {p.recommended ? `${p.name}（おすすめ）` : p.name}
            </th>
          ))}
        </tr>
        <BandedRows
          rows={ROWS.map(([label, f]) => [label, ...plans.map(f)])}
          render={([label, ...values]) => (
            <>
              <td>{label}</td>
              {values.map((v, i) =>
                plans[i].recommended ? (
                  <td key={plans[i].id} style={{ textAlign: "center", color: C.indigo }}><b>{v}</b></td>
                ) : (
                  <td key={plans[i].id} style={{ textAlign: "center" }}>{v}</td>
                ),
              )}
            </>
          )}
        />
      </table>
      <Footer page={page} />
    </Slide>
  );
}
