import { Footer, Slide, Title, type SlideProps } from "../components.tsx";
import { C, column, head, paperSection, row } from "../theme.ts";
import { pricing } from "../../lib_pricing.ts";

const { weekday, holiday } = pricing.serviceHours;

export default function Hours({ page }: SlideProps) {
  return (
    <Slide id="hours" style={paperSection} notes="できないことを先に伝えておくと、契約後の期待のズレを防げる。24時間監視が必要な会社には専門業者との併用を提案する。">
      <Title eyebrow="SUPPORT">対応時間と、お約束</Title>
      <div style={{ ...row, gap: "40px" }}>
        <div style={{ width: "620px", ...column("24px"), background: C.ink, color: C.paper, borderRadius: "28px", padding: "48px" }}>
          <p style={{ fontSize: "26px", fontWeight: 700, color: C.sun }}>対応時間</p>
          <p style={{ ...head, fontSize: "44px", lineHeight: 1.5 }}>
            {`平日 ${weekday.open}〜${weekday.close}`}<br />{`土日祝 ${holiday.open}〜${holiday.close}`}
          </p>
          <p style={{ fontSize: "26px", lineHeight: 1.6, color: C.onDark }}>メールは24時間受け付けています。平日の日中は、返信のみ随時行います。</p>
        </div>
        <div style={{ flex: 1, ...column("28px") }}>
          <div style={{ ...column("12px"), background: C.white, border: `3px solid ${C.ink}`, borderRadius: "24px", padding: "36px" }}>
            <h3 style={{ fontSize: "34px", fontWeight: 900, color: C.indigo }}>お約束していること</h3>
            <ul style={{ fontSize: "28px", lineHeight: 1.6 }}>
              <li>プランごとの返信目安を守ります</li>
              <li>休暇などの不在予定は事前にお知らせします</li>
              <li>毎月の作業内容をレポートでご報告します</li>
            </ul>
          </div>
          <div style={{ ...column("12px"), background: C.pill, borderRadius: "24px", padding: "36px" }}>
            <h3 style={{ fontSize: "34px", fontWeight: 900, color: C.muted }}>対応していないこと</h3>
            <ul style={{ fontSize: "28px", lineHeight: 1.6, color: C.muted }}>
              <li>即時の駆けつけ、24時間の監視</li>
              <li>訪問は原則なし（東京23区内のみ別途お見積り）</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer page={page} />
    </Slide>
  );
}
