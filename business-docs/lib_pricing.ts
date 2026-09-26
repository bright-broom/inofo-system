// config/pricing.json（料金・時間の唯一の定義）を読み、書類で使う表記に整える。
import pricingJson from "../config/pricing.json" with { type: "json" };

export type Plan = {
  id: string;
  rank: string;
  name: string;
  price: number;
  hours: number;
  employees: (number | null)[];
  reply: string;
  pcSetupPerMonth: number;
  meetingsPerMonth: number;
  recommended?: boolean;
};

export const pricing = pricingJson as typeof pricingJson & { plans: Plan[] };

export const yen = (n: number): string => n.toLocaleString("en-US"); // 30000 → "30,000"

const { weekday, holiday } = pricing.serviceHours;
export const hoursLabel = (holidayWord = "土日祝"): string =>
  `平日 ${weekday.open}〜${weekday.close}／${holidayWord} ${holiday.open}〜${holiday.close}`;
export const HOURS = hoursLabel();

export const target = ([min, max]: (number | null)[]): string => `従業員 ${min ?? ""}〜${max}名`;

export const plan = (id: string): Plan => {
  const found = pricing.plans.find((p) => p.id === id);
  if (!found) throw new Error(`pricing.json にプラン "${id}" がありません`);
  return found;
};

export const recommended: Plan = pricing.plans.find((p) => p.recommended) ?? plan("standard");

// プランごとに含まれる内容（契約書 別紙1・価格表で共通）。行 = [項目名, プランごとの値を返す関数]
const FEATURE_ROWS: [string, (x: Plan) => string][] = [
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

export const featureTable = (): string[][] => [
  ["項目", ...pricing.plans.map((x) => x.name)],
  ...FEATURE_ROWS.map(([label, f]) => [label, ...pricing.plans.map(f)]),
];
