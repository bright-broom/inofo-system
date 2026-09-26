import { Pill, Slide } from "../components.tsx";
import { BODY_FONT, C, column, head, row } from "../theme.ts";
import { pricing } from "../../lib_pricing.ts";

const minPriceMan = Math.min(...pricing.plans.map((p) => p.price)) / 10000;
const point = { fontSize: "32px", fontWeight: 700, color: C.paper };

export default function Cover() {
  return (
    <Slide
      id="cover"
      transition="fade"
      style={{ background: C.sun, color: C.ink, fontFamily: BODY_FONT, padding: "128px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "40px" }}
      notes="表紙。宛名と日付は商談ごとに差し替える。「ひとり情シス」「IT担当がいない」会社向けであることを最初に伝える。"
    >
      <div style={{ ...row, gap: "64px", alignItems: "center" }}>
        <div style={{ flex: 1, ...column("40px") }}>
          <Pill style={{ fontSize: "28px", fontWeight: 700, background: C.paper, border: `3px solid ${C.ink}`, padding: "10px 32px" }}>IT担当が「ひとり」の会社へ</Pill>
          <h1 style={{ ...head, fontSize: "88px", lineHeight: 1.35 }}>
            「ラクシス」は、<br />小さな会社の情シスを<br />まるっと支える相棒です。
          </h1>
          <p style={{ fontSize: "36px", fontWeight: 700 }}>サービスご説明資料</p>
        </div>
        <div style={{ width: "460px", ...column("20px"), background: C.ink, padding: "48px", borderRadius: "32px", boxShadow: `12px 12px 0 ${C.indigo}` }}>
          <p style={{ fontSize: "26px", fontWeight: 700, color: C.sun }}>3つのポイント</p>
          <p style={point}>プランは3つだけ</p>
          <p style={point}>{`月額${minPriceMan}万円から`}</p>
          <p style={point}>平日夜・土日祝に対応</p>
        </div>
      </div>
      <p style={{ position: "absolute", left: "128px", bottom: "72px", width: "1200px", fontSize: "26px", fontWeight: 700 }}>〔会社名〕様　｜　〔2026年〇月〇日〕</p>
    </Slide>
  );
}
