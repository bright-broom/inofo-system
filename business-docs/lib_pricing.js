// config/pricing.json（料金・時間の唯一の定義）を読み、書類で使う表記に整える。
const pricing = require("../config/pricing.json");

const yen = (n) => n.toLocaleString("en-US"); // 30000 → "30,000"
const { weekday, holiday } = pricing.serviceHours;
const hoursLabel = (holidayWord = "土日祝") =>
  `平日 ${weekday.open}〜${weekday.close}／${holidayWord} ${holiday.open}〜${holiday.close}`;
const target = ([min, max]) => `従業員 ${min ?? ""}〜${max}名`;
const plan = (id) => pricing.plans.find((p) => p.id === id);
const recommended = pricing.plans.find((p) => p.recommended);

// プランごとに含まれる内容（契約書 別紙1・価格表で共通）。行 = [項目名, プランごとの値を返す関数]
const FEATURE_ROWS = [
  ["月額委託料（税別）", (x) => `${yen(x.price)}円`],
  ["月間対応時間", (x) => `${x.hours}時間`],
  ["返信の目安（対応時間内）", (x) => x.reply],
  ["ヘルプデスク（メール・チャット）", () => "○"],
  ["アカウントの発行・停止", () => "○"],
  ["PCセットアップ", (x) => `月${x.pcSetupPerMonth}台まで`],
  ["IT資産台帳の管理", (x) => (x.id === "lite" ? "—" : "○")],
  ["クラウド（M365/Google Workspace）運用", (x) => (x.id === "lite" ? "—" : "○")],
  ["セキュリティ基本対策（多要素認証・端末管理等）", (x) => (x.id === "lite" ? "—" : "○")],
  ["オンライン定例", (x) => (x.meetingsPerMonth ? `月${x.meetingsPerMonth}回` : "—")],
  ["IT顧問（方針・ベンダー選定の相談）", (x) => (x.id === "pro" ? "○" : "—")],
  ["年間ITロードマップの作成", (x) => (x.id === "pro" ? "○" : "—")],
  ["業務自動化・SaaS連携の構築", (x) => (x.id === "pro" ? "○" : "—")],
  ["優先対応", (x) => (x.id === "pro" ? "○" : "—")],
];
const featureTable = () => [
  ["項目", ...pricing.plans.map((x) => x.name)],
  ...FEATURE_ROWS.map(([label, f]) => [label, ...pricing.plans.map(f)]),
];

module.exports = { pricing, yen, hoursLabel, target, plan, recommended, HOURS: hoursLabel(), FEATURE_ROWS, featureTable };
