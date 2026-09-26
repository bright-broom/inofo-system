import { Card, Footer, Slide, Title, type SlideProps } from "../components.tsx";
import { C, head, paperSection, row } from "../theme.ts";

const FAQ: [string, string][] = [
  ["どのプランを選べばいい？", "迷ったらスタンダードがおすすめです。無料相談で現状を伺ってご提案します。"],
  ["ひとりで運営していて大丈夫？", "返信の目安を事前にお約束し、不在予定は前もってお知らせします。"],
  ["ツールの利用料は含まれる？", "含まれません。SaaSなどの利用料はお客様のご負担です。選定はお手伝いします。"],
  ["途中でプランを変えられる？", "はい。前月20日までのご連絡で、翌月から変更できます。"],
];

export default function Faq({ page }: SlideProps) {
  return (
    <Slide id="faq" style={{ ...paperSection, gap: "40px" }} notes="ひとり運営への不安は必ず出るので、ここで正面から答える。">
      <Title eyebrow="FAQ">よくあるご質問</Title>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
        {FAQ.map(([q, a]) => (
          <Card key={q} radius="24px" padding="36px" gap="14px">
            <div style={{ ...row, gap: "16px" }}>
              <p style={{ ...head, fontSize: "34px", color: C.indigo }}>Q</p>
              <h3 style={{ fontSize: "32px", fontWeight: 900, lineHeight: 1.4 }}>{q}</h3>
            </div>
            <div style={{ ...row, gap: "16px" }}>
              <p style={{ ...head, fontSize: "34px", color: C.red }}>A</p>
              <p style={{ fontSize: "26px", lineHeight: 1.6, color: C.muted }}>{a}</p>
            </div>
          </Card>
        ))}
      </div>
      <Footer page={page} />
    </Slide>
  );
}
