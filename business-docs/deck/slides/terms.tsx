import { BandedRows, Footer, Slide, Title, type SlideProps } from "../components.tsx";
import { C, paperSection } from "../theme.ts";
import { pricing, yen } from "../../lib_pricing.ts";

const TERMS: string[][] = [
  ["契約期間", "1ヶ月ごとの自動更新（最低1ヶ月）"],
  ["解約", "期間満了の1ヶ月前までにご連絡ください"],
  ["初月の料金", "契約開始日から月末までの日割り"],
  ["超過分", `${yen(pricing.overage.ratePerHour)}円/時間（税別・${pricing.overage.unitMinutes}分単位）`],
  ["使わなかった時間", "翌月への繰り越しはありません"],
  ["お支払い", "月末締め・翌月末までにお振込み"],
  ["プラン変更", "前月20日までのご連絡で、翌月から変更できます"],
  ["含まれない費用", "機器・ソフトの購入費やツールの利用料、工事費など"],
];

export default function Terms({ page }: SlideProps) {
  return (
    <Slide id="terms" style={{ ...paperSection, gap: "40px" }} notes="業務委託契約書の条文と同じ内容。詳細は契約書で確認してもらう。">
      <Title eyebrow="TERMS">ご契約の条件</Title>
      <table style={{ width: "1664px", fontSize: "28px", color: C.ink, border: `2px solid ${C.ink}`, borderRadius: "16px" }}>
        <tr style={{ background: C.ink }}>
          <th style={{ width: "30%", color: C.paper, textAlign: "left" }}>項目</th>
          <th style={{ width: "70%", color: C.paper, textAlign: "left" }}>内容</th>
        </tr>
        <BandedRows rows={TERMS} render={([label, value]) => (<><td><b>{label}</b></td><td>{value}</td></>)} />
      </table>
      <Footer page={page} />
    </Slide>
  );
}
