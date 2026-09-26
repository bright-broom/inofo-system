import { Footer, Slide, Title, type SlideProps } from "../components.tsx";
import { BODY_FONT, C, column, head, row } from "../theme.ts";

const REASONS: [string, string, string][] = [
  ["現役エンジニアが", "直接対応", "営業担当や取り次ぎを挟みません。実際に手を動かす本人が、お話を伺って対応します。"],
  ["担当者が", "ずっと変わらない", "毎回イチから説明する必要はありません。社内の事情を理解したまま伴走します。"],
  ["ノウハウが", "社内に残る", "手順書や判断基準をドキュメントで残すので、将来の内製化や引き継ぎでも困りません。"],
];

export default function Reasons({ page }: SlideProps) {
  return (
    <Slide
      id="reasons"
      style={{ background: C.ink, color: C.paper, fontFamily: BODY_FONT, padding: "128px 128px 160px", display: "flex", flexDirection: "column", gap: "56px" }}
      notes="3つ目の「ノウハウが残る」は、外注で失敗した経験のある会社に特に響く。"
    >
      <Title eyebrow="REASON" eyebrowColor={C.sun}>選ばれる3つの理由</Title>
      <div style={{ ...row, gap: "40px" }}>
        {REASONS.map(([l1, l2, body], i) => (
          <div key={l1} style={{ flex: 1, ...column("20px"), background: C.darkCard, border: `2px solid ${C.darkLine}`, borderRadius: "28px", padding: "48px" }}>
            <p style={{ ...head, fontSize: "72px", color: C.sun, opacity: 0.35 }}>{String(i + 1).padStart(2, "0")}</p>
            <h3 style={{ fontSize: "44px", fontWeight: 900, lineHeight: 1.35, color: C.sun }}>
              {l1}<br />{l2}
            </h3>
            <p style={{ fontSize: "28px", lineHeight: 1.6, color: C.onDark }}>{body}</p>
          </div>
        ))}
      </div>
      <Footer page={page} color={C.faintOnDark} />
    </Slide>
  );
}
