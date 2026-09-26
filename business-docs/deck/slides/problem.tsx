import { Card, Footer, Slide, Title, type SlideProps } from "../components.tsx";
import { C, center, head, paperSection, row } from "../theme.ts";

const PROBLEMS: [string, string, string[]][] = [
  ["IT担当が", "片手間で限界", ["本業とIT対応の二重負担", "設定した人しか分からない"]],
  ["何にいくら払うのが", "正解か分からない", ["SaaSが部署ごとにバラバラ", "ベンダーの見積もりを比べられない"]],
  ["トラブルと", "セキュリティが不安", ["「PCが動かない」で業務が止まる", "取引先からセキュリティ確認書が届く"]],
];

export default function Problem({ page }: SlideProps) {
  return (
    <Slide id="problem" style={paperSection} notes="3つのうちどれに当てはまるかを聞き、相手の状況を引き出す。">
      <Title eyebrow="PROBLEM">こんなお悩み、ありませんか？</Title>
      <div style={{ ...row, gap: "40px" }}>
        {PROBLEMS.map(([l1, l2, points], i) => (
          <Card key={l1} flex radius="28px" padding="44px" gap="24px">
            <div style={{ width: "72px", height: "72px", ...center, background: C.sun, border: `3px solid ${C.ink}`, borderRadius: "50%" }}>
              <p style={{ ...head, fontSize: "32px" }}>{i + 1}</p>
            </div>
            <h3 style={{ fontSize: "40px", fontWeight: 900, lineHeight: 1.35 }}>
              {l1}<br />{l2}
            </h3>
            <ul style={{ fontSize: "28px", lineHeight: 1.6, color: C.muted }}>
              {points.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </Card>
        ))}
      </div>
      <Footer page={page} />
    </Slide>
  );
}
