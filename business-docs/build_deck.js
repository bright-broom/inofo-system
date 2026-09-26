// サービス説明資料（スライド）の生成スクリプト。`node build_deck.js` で deck/project/slides/*.html を作り直す。
// deck/templates/*.html の {{…}} に config/pricing.json の値を差し込む。スライドの文言やデザインはテンプレート側を直す。
// 生成後、変わったスライドを Artifact（https://claude.ai/artifact/J4tLwpUKXKDt2kuDRHJN59）に公開し直す必要がある。
const fs = require("fs");
const path = require("path");
const { pricing, yen, target, plan } = require("./lib_pricing");

const TEMPLATES = path.join(__dirname, "deck/templates");
const SLIDES = path.join(__dirname, "deck/project/slides");

const { weekday, holiday } = pricing.serviceHours;
const values = {
  capacity: String(pricing.capacity),
  overage: yen(pricing.overage.ratePerHour),
  unit: String(pricing.overage.unitMinutes),
  weekday: `${weekday.open}〜${weekday.close}`,
  holiday: `${holiday.open}〜${holiday.close}`,
  hoursLabel: `平日 ${weekday.open}〜${weekday.close}／土日祝 ${holiday.open}〜${holiday.close}`,
  minPriceMan: String(Math.min(...pricing.plans.map((p) => p.price)) / 10000),
};
for (const p of pricing.plans) {
  Object.assign(values, {
    [`${p.id}.price`]: yen(p.price),
    [`${p.id}.hours`]: String(p.hours),
    [`${p.id}.reply`]: p.reply,
    [`${p.id}.target`]: target(p.employees),
    [`${p.id}.pc`]: String(p.pcSetupPerMonth),
    [`${p.id}.meetings`]: String(p.meetingsPerMonth),
    [`${p.id}.meetingsLabel`]: p.meetingsPerMonth ? `月${p.meetingsPerMonth}回` : "—",
    [`${p.id}.perHour`]: yen(Math.round(p.price / p.hours)),
  });
}

const changed = [];
for (const file of fs.readdirSync(TEMPLATES).filter((f) => f.endsWith(".html")).sort()) {
  const html = fs.readFileSync(path.join(TEMPLATES, file), "utf8").replace(/\{\{([\w.]+)\}\}/g, (_, key) => {
    if (!(key in values)) throw new Error(`${file}: 未定義の差し込み記号 {{${key}}}`);
    return values[key];
  });
  if (html.includes("{{")) throw new Error(`${file}: 差し込み記号の書き方が不正です`);
  const out = path.join(SLIDES, file);
  const before = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : null;
  if (before !== html) {
    fs.writeFileSync(out, html);
    changed.push(file);
  }
}
console.log(changed.length ? `スライドを更新：${changed.join(", ")}（Artifact への公開が必要）` : "スライド：変更なし");
