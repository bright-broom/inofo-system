// サービス説明資料（スライド）の生成スクリプト。`npx tsx build_deck.tsx` で deck/project/slides/*.html を作り直す。
// スライドの中身は deck/slides/*.tsx（React コンポーネント）。料金・時間は config/pricing.json から読む。
// 生成後、変わったスライドを Artifact（https://claude.ai/artifact/J4tLwpUKXKDt2kuDRHJN59）に公開し直す必要がある。
import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { SlideProps } from "./deck/components.tsx";
import Compare from "./deck/slides/compare.tsx";
import Contact from "./deck/slides/contact.tsx";
import Cover from "./deck/slides/cover.tsx";
import Faq from "./deck/slides/faq.tsx";
import Flow from "./deck/slides/flow.tsx";
import Hours from "./deck/slides/hours.tsx";
import Monthly from "./deck/slides/monthly.tsx";
import Plans from "./deck/slides/plans.tsx";
import Problem from "./deck/slides/problem.tsx";
import Reasons from "./deck/slides/reasons.tsx";
import Services from "./deck/slides/services.tsx";
import Solution from "./deck/slides/solution.tsx";
import Terms from "./deck/slides/terms.tsx";

const SLIDES: Record<string, ComponentType<SlideProps>> = {
  cover: Cover, problem: Problem, solution: Solution, services: Services, reasons: Reasons, plans: Plans,
  compare: Compare, hours: Hours, flow: Flow, monthly: Monthly, terms: Terms, faq: Faq, contact: Contact,
};

const DECK = path.join(import.meta.dirname, "deck/project");
const order: string[] = JSON.parse(fs.readFileSync(path.join(DECK, "deck.json"), "utf8")).order;

const missing = order.filter((id) => !SLIDES[id]);
const extra = Object.keys(SLIDES).filter((id) => !order.includes(id));
if (missing.length || extra.length) throw new Error(`deck.json の order とスライドが一致しません（不足: ${missing}／余分: ${extra}）`);

fs.mkdirSync(path.join(DECK, "slides"), { recursive: true });
const changed: string[] = [];
order.forEach((id, i) => {
  const Slide = SLIDES[id];
  // 属性値は二重引用符で囲まれるので、React が数値文字参照にした ' は元に戻しても安全
  const html = renderToStaticMarkup(<Slide page={i + 1} />).replaceAll("&#x27;", "'") + "\n";
  const out = path.join(DECK, "slides", `${id}.html`);
  if (!fs.existsSync(out) || fs.readFileSync(out, "utf8") !== html) {
    fs.writeFileSync(out, html);
    changed.push(`${id}.html`);
  }
});
console.log(changed.length ? `スライドを更新：${changed.join(", ")}（Artifact への公開が必要）` : "スライド：変更なし");
