import { Fragment } from "react";
import { Arrow, Card, Footer, IconBadge, Slide, Title, type SlideProps } from "../components.tsx";
import { C, paperSection, row } from "../theme.ts";
import { plan } from "../../lib_pricing.ts";

const CYCLE: [string, string, [string, string]][] = [
  ["PaperPlane", "ご依頼", ["メールやチャットで", "気軽にご連絡"]],
  ["Wrench", "対応", ["対応時間内に", "リモートで作業"]],
  ["Chart", "月次レポート", ["件数・作業時間・内容を", "翌月10日までにご報告"]],
  ["Users", "定例で振り返り", ["次にやることを", "いっしょに決める"]],
];

export default function Monthly({ page }: SlideProps) {
  return (
    <Slide id="monthly" style={paperSection} notes="月次レポートで作業時間が見えるので、プランが合っているかを毎月確認できる。">
      <Title eyebrow="EVERY MONTH">毎月の進め方</Title>
      <div style={{ ...row, gap: "20px" }}>
        {CYCLE.map(([icon, title, [l1, l2]], i) => (
          <Fragment key={title}>
            {i > 0 && <Arrow />}
            <Card flex radius="28px" padding="40px 28px" gap="16px" extra={{ alignItems: "center" }}>
              <IconBadge name={icon} size="96px" iconSize="48px" background={C.sun} color={C.ink} radius="50%" border={`3px solid ${C.ink}`} />
              <h3 style={{ fontSize: "34px", fontWeight: 900, textAlign: "center" }}>{title}</h3>
              <p style={{ fontSize: "26px", lineHeight: 1.55, color: C.muted, textAlign: "center" }}>
                {l1}<br />{l2}
              </p>
            </Card>
          </Fragment>
        ))}
      </div>
      <p style={{ fontSize: "26px", color: C.muted }}>{`※ 定例はスタンダード（月${plan("standard").meetingsPerMonth}回）とプロ（月${plan("pro").meetingsPerMonth}回）に含まれます。`}</p>
      <Footer page={page} />
    </Slide>
  );
}
