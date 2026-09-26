import { Eyebrow, Slide } from "../components.tsx";
import { BODY_FONT, C, head } from "../theme.ts";

export default function Solution() {
  return (
    <Slide
      id="solution"
      transition="fade"
      style={{ background: C.ink, color: C.paper, fontFamily: BODY_FONT, padding: "128px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "56px" }}
      notes="ここがサービスの一言説明。ひとり運営であることを弱みではなく「担当が変わらない」強みとして伝える。"
    >
      <Eyebrow color={C.sun}>SOLUTION</Eyebrow>
      <h2 style={{ ...head, fontSize: "80px", lineHeight: 1.4 }}>
        ラクシスは、IT担当が<br />「ひとり」か「いない」会社のための<br /><span style={{ color: C.sun }}>月額制ITサポート</span>です。
      </h2>
      <p style={{ fontSize: "36px", lineHeight: 1.6, color: C.onDark }}>
        相談する人と、実際に手を動かす人が同じ。<br />だから、話が早くて、毎回イチから説明する必要がありません。
      </p>
    </Slide>
  );
}
