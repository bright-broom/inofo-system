// config/pricing.json の入力チェック。`node config/validate-pricing.mts` で実行し、問題があれば終了コード 1。
// ここにあるルールは、サイト・書類・スライドが前提にしていること（崩れると表示が嘘になる、または生成が壊れる）。
import pricing from "./pricing.json" with { type: "json" };

type Plan = {
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

const errors: string[] = [];
const check = (ok: boolean, message: string) => {
  if (!ok) errors.push(message);
};
const isPositiveInt = (n: unknown) => Number.isInteger(n) && (n as number) > 0;
const isTime = (s: unknown) => typeof s === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(s);

const plans = pricing.plans as Plan[];

// 生成コードがプラン id を名前で参照している（スライドの文言、比較表の○の付け方など）
const EXPECTED_IDS = ["lite", "standard", "pro"];
check(
  JSON.stringify(plans.map((p) => p.id)) === JSON.stringify(EXPECTED_IDS),
  `plans の id は ${EXPECTED_IDS.join(" → ")} の順で3つ必要です（今: ${plans.map((p) => p.id).join(", ")}）`,
);

for (const p of plans) {
  const at = `plans["${p.id}"]`;
  check(typeof p.name === "string" && p.name.length > 0, `${at}.name が空です`);
  check(typeof p.rank === "string" && p.rank.length > 0, `${at}.rank が空です`);
  check(isPositiveInt(p.price), `${at}.price は正の整数（円）にしてください（今: ${p.price}）`);
  check(isPositiveInt(p.hours), `${at}.hours は正の整数（時間）にしてください（今: ${p.hours}）`);
  check(typeof p.reply === "string" && p.reply.length > 0, `${at}.reply が空です`);
  check(Number.isInteger(p.pcSetupPerMonth) && p.pcSetupPerMonth >= 0, `${at}.pcSetupPerMonth は0以上の整数にしてください`);
  check(Number.isInteger(p.meetingsPerMonth) && p.meetingsPerMonth >= 0, `${at}.meetingsPerMonth は0以上の整数にしてください`);
  const [min, max] = p.employees;
  check(p.employees.length === 2 && isPositiveInt(max), `${at}.employees は [下限 または null, 上限] にしてください`);
  check(min === null || (isPositiveInt(min) && min < (max ?? 0)), `${at}.employees の下限は上限より小さくしてください（今: ${min}〜${max}）`);
}

check(plans.filter((p) => p.recommended).length === 1, `recommended: true のプランはちょうど1つにしてください（今: ${plans.filter((p) => p.recommended).length}）`);
check(plans[0]?.employees[0] === null, `最初のプランの対象人数の下限は null（〜N名）にしてください`);

for (let i = 1; i < plans.length; i++) {
  const [a, b] = [plans[i - 1], plans[i]];
  check(a.employees[1] === b.employees[0], `対象人数の範囲が途切れています：${a.name}（〜${a.employees[1]}名）と ${b.name}（${b.employees[0]}名〜）`);
  check(a.price < b.price, `上位プランほど月額を高くしてください：${a.name} ${a.price}円 ≥ ${b.name} ${b.price}円`);
  check(a.hours < b.hours, `上位プランほど対応時間を多くしてください：${a.name} ${a.hours}h ≥ ${b.name} ${b.hours}h`);
  check(a.pcSetupPerMonth <= b.pcSetupPerMonth, `上位プランの PC セットアップ台数が下位より少なくなっています：${a.name} → ${b.name}`);
  check(a.meetingsPerMonth <= b.meetingsPerMonth, `上位プランの定例回数が下位より少なくなっています：${a.name} → ${b.name}`);
  // サイトと資料に「上位ほど1時間あたりが割安」と書いているため
  check(b.price / b.hours <= a.price / a.hours, `上位ほど1時間あたりが割安、という表示と矛盾します：${a.name} ${Math.round(a.price / a.hours)}円/h < ${b.name} ${Math.round(b.price / b.hours)}円/h`);
}

check(isPositiveInt(pricing.capacity), `capacity（同時に受ける社数）は正の整数にしてください`);
check(isPositiveInt(pricing.overage.ratePerHour), `overage.ratePerHour（超過単価）は正の整数にしてください`);
check(isPositiveInt(pricing.overage.unitMinutes) && 60 % pricing.overage.unitMinutes === 0, `overage.unitMinutes は 60 を割り切れる分数にしてください（今: ${pricing.overage.unitMinutes}）`);
for (const [key, h] of Object.entries(pricing.serviceHours)) {
  check(isTime(h.open) && isTime(h.close), `serviceHours.${key} は "HH:MM" 形式にしてください`);
  check(h.open < h.close, `serviceHours.${key} の開始が終了より後になっています（${h.open}〜${h.close}）`);
}

if (errors.length) {
  console.error(`pricing.json に ${errors.length} 件の問題があります：`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log(`pricing.json：問題なし（${plans.length}プラン・${plans.map((p) => `${p.name} ${p.price.toLocaleString("en-US")}円/${p.hours}h`).join("・")}）`);
