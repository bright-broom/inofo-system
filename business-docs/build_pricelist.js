// 価格表の生成スクリプト。`node build_pricelist.js` で docx を再生成する。
// 金額・時間・条件はすべて config/pricing.json から読む。この書類に数値は直書きしない。
const fs = require("fs");
const { Packer, Paragraph, BorderStyle } = require("docx");
const { INDIGO, SUN, MUTED, run, p, h1, bullet, table, makeDoc } = require("./lib_docx");
const { pricing, yen, target, HOURS, featureTable } = require("./lib_pricing");

const TAX = 0.1; // 標準税率（税込の参考表示に使う）
const plans = pricing.plans;
const over = pricing.overage;
const W3 = [2426, 2200, 2200, 2200];

/* ---------------------------------------------------------------- 見出し */
const head = [
  new Paragraph({ children: [run("PRICE LIST", { size: 22, bold: true, color: INDIGO })] }),
  new Paragraph({
    spacing: { before: 80, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 36, color: SUN, space: 6 } },
    children: [run("ラクシス　料金表", { size: 44, bold: true })],
  }),
  p("適用日：〔2026年〇月〇日〕　／　表示価格はすべて税別・月額です（税込は参考）", { size: 19, color: MUTED }),
];

/* ---------------------------------------------------------------- 1. 月額プラン */
const monthly = [
  h1("1", "月額プラン"),
  table(W3, [
    ["", ...plans.map((x) => (x.recommended ? `${x.name}（おすすめ）` : x.name))],
    ["月額（税別）", ...plans.map((x) => `${yen(x.price)}円`)],
    ["月額（税込・参考）", ...plans.map((x) => `${yen(Math.round(x.price * (1 + TAX)))}円`)],
    ["月の対応時間", ...plans.map((x) => `${x.hours}時間`)],
    ["1時間あたり（実質）", ...plans.map((x) => `${yen(Math.round(x.price / x.hours))}円`)],
    ["対象の目安", ...plans.map((x) => target(x.employees).replace("従業員 ", ""))],
    ["返信の目安（対応時間内）", ...plans.map((x) => x.reply)],
  ], { highlightRow: 1 }),
  p(`対応時間：${HOURS}（メールは24時間受付）`, { size: 19, before: 100 }),
];

/* ---------------------------------------------------------------- 2. 含まれる内容 */
// 金額・時間・返信の行は1章に載せたので、項目名で除く（行の位置に頼らない）
const IN_SECTION_1 = new Set(["項目", "月額委託料（税別）", "月間対応時間", "返信の目安（対応時間内）"]);
const featureRows = featureTable().filter(([label]) => !IN_SECTION_1.has(label));
const features = [
  h1("2", "プランに含まれる内容"),
  table(W3, [["項目", ...plans.map((x) => x.name)], ...featureRows]),
  p("○＝含む　—＝含まない", { size: 18, color: MUTED, before: 80 }),
];

/* ---------------------------------------------------------------- 3. そのほかの料金 */
const options = [
  h1("3", "そのほかの料金"),
  table([3000, 2513, 3513], [
    ["項目", "料金（税別）", "内容"],
    ["初期費用", "0円", "初回のかんたん診断・棚卸しを含みます"],
    ["対応時間を超えた分", `${yen(over.ratePerHour)}円／時間`, `${over.unitMinutes}分単位で計算し、月次レポートでご報告します`],
    ["訪問対応", "別途お見積り", "東京23区内に限ります。原則はリモートで対応します"],
    ["スポット作業", "別途お見積り", "オフィス移転、メール・データの移行、システム入れ替えなど"],
    ["機器・ソフト・ツールの利用料", "実費", "月額料金には含まれません"],
  ]),
];

/* ---------------------------------------------------------------- 4. ご契約の条件 */
const terms = [
  h1("4", "ご契約の条件"),
  bullet("1ヶ月ごとの自動更新です（最低契約期間は1ヶ月）。解約は期間満了の1ヶ月前までにご連絡ください。"),
  bullet("初月の月額料金は、契約開始日から月末までの日割りで計算します。"),
  bullet("月の対応時間のうち、使わなかった時間は翌月に繰り越しません。"),
  bullet("お支払いは月末締め・翌月末までのお振込みです（振込手数料はご負担ください）。"),
  bullet("プランの変更は、前月20日までのご連絡で翌月から切り替えられます。"),
  bullet(`品質を保つため、ご契約は同時に${pricing.capacity}社までとしています。`),
  bullet("即時の駆けつけ、24時間の監視、対応時間外の緊急対応は含まれません。"),
  p("お見積りは、無料相談で状況を伺ったうえで個別にお出しします。　お問い合わせ：〔メールアドレス〕", { before: 200, bold: true }),
];

(async () => {
  fs.mkdirSync("out", { recursive: true });
  const out = "out/料金表.docx";
  fs.writeFileSync(out, await Packer.toBuffer(makeDoc("ラクシス｜料金表", [...head, ...monthly, ...features, ...options, ...terms])));
  console.log(out);
})();
