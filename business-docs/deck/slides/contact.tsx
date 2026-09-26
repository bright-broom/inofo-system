import { Eyebrow, Slide } from "../components.tsx";
import { BODY_FONT, C, column, head, row } from "../theme.ts";
import { HOURS } from "../../lib_pricing.ts";

export default function Contact() {
  return (
    <Slide
      id="contact"
      transition="fade"
      style={{ background: C.sun, color: C.ink, fontFamily: BODY_FONT, padding: "128px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "40px" }}
      notes="メールアドレスと運営者名は本番用に差し替える。"
    >
      <Eyebrow>CONTACT</Eyebrow>
      <h2 style={{ ...head, fontSize: "80px", lineHeight: 1.3 }}>
        まずは、無料で<br />ご相談ください。
      </h2>
      <p style={{ fontSize: "34px", lineHeight: 1.6 }}>
        いまの状況を伺って、最適なプランをご提案します。<br />「まだ検討段階」でも大歓迎です。
      </p>
      <div style={{ ...row, gap: "32px", alignItems: "center", background: C.paper, border: `3px solid ${C.ink}`, borderRadius: "28px", padding: "40px 48px", boxShadow: `10px 10px 0 ${C.ink}` }}>
        <x-icon name="PaperPlane" style={{ color: C.indigo, width: "64px", height: "64px" }}></x-icon>
        <div style={column("8px")}>
          <p style={{ fontSize: "26px", fontWeight: 700, color: C.muted }}>お問い合わせ（メール）</p>
          <p style={{ ...head, fontSize: "56px" }}>hello@example.com</p>
        </div>
      </div>
      <p style={{ position: "absolute", left: "128px", bottom: "72px", width: "1300px", fontSize: "26px", fontWeight: 700 }}>{`ラクシス　運営：〔氏名〕（個人事業）　｜　対応時間：${HOURS}`}</p>
    </Slide>
  );
}
