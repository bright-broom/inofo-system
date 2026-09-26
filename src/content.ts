// サイト内の文言・データはすべてここに集約。ブランド差し替え時はこのファイルを編集する。
// 料金・対応時間・条件の数値は config/pricing.json が唯一の定義（書類の生成スクリプトと共有）。
import pricing from "../config/pricing.json";
import business from "../config/business.json";

const yen = (n: number) => n.toLocaleString("en-US");
const { weekday, holiday } = pricing.serviceHours;
const minPrice = Math.min(...pricing.plans.map((p) => p.price));
const byId = (id: string) => pricing.plans.find((p) => p.id === id)!;
const target = ([min, max]: (number | null)[]) => `従業員 ${min ?? ""}〜${max}名`;

// 本番URL。Vercel などでは環境変数 NEXT_PUBLIC_SITE_URL で上書きする
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");

export const siteDescription =
  `IT担当者が兼務・不在の小さな会社向け情シスサポート。月額${minPrice / 10000}万円からの3プランで、現役ITエンジニアが担当を変えずに直接サポートします。`;

export const brand = {
  name: "ラクシス",
  roman: "raku-sys",
  tagline: "まるっと頼れる情シス窓口",
  // 個人事業として運営。屋号と運営者名を分けて持つ
  company: "ラクシス",
  operator: "山田 太郎",
  area: "東京都",
  url: "https://example.com/",
  email: business.email, // config/business.json が唯一の定義
};

// 本業と並行して確実に守れる時間帯だけを約束する
export const hours = {
  label: `平日 ${weekday.open}〜${weekday.close}／土日祝 ${holiday.open}〜${holiday.close}`,
  short: "平日夜・土日祝",
  note: "メールは24時間受け付けています。平日の日中は、返信のみ随時行います。",
};

export const nav = [
  { href: "/#problem", label: "よくある悩み" },
  { href: "/#plans", label: "プラン" },
  { href: "/#reason", label: "選ばれる理由" },
  { href: "/#flow", label: "導入の流れ" },
  { href: "/#faq", label: "FAQ" },
];

export const problems = [
  {
    title: "IT担当が\n片手間で限界",
    points: ["本業とIT対応の二重負担", "担当者しか分からない設定が増殖"],
  },
  {
    title: "何にいくら払うのが\n正解か分からない",
    points: ["SaaSが部署ごとにバラバラ", "ベンダーの見積もりを比較できない"],
  },
  {
    title: "トラブルと\nセキュリティが不安",
    points: ["「PCが動かない」で業務が止まる", "取引先からセキュリティ確認書が届く"],
  },
];

export type Plan = {
  id: string;
  rank: string;
  name: string;
  catch: string;
  target: string;
  price: string;
  hours: string;
  base?: string;
  features: string[];
  recommended?: boolean;
};

// 松竹梅。上位プランは「下位プランの全内容＋差分」で見せ、差分は3つまでに絞る
export const plans: Plan[] = [
  {
    id: "lite",
    rank: "梅",
    name: "ライト",
    catch: "困ったときに、すぐ聞ける",
    target: target(byId("lite").employees),
    price: yen(byId("lite").price),
    hours: `月${byId("lite").hours}時間まで`,
    features: ["メール・チャットのITヘルプデスク", "アカウント発行・停止", `PCセットアップ（月${byId("lite").pcSetupPerMonth}台まで）`],
  },
  {
    id: "standard",
    rank: "竹",
    name: "スタンダード",
    catch: "IT担当を、まるごと任せる",
    target: target(byId("standard").employees),
    price: yen(byId("standard").price),
    hours: `月${byId("standard").hours}時間まで`,
    base: "ライトの全内容",
    features: ["M365 / Google Workspace の運用", "多要素認証・端末管理などの基本対策", `月${byId("standard").meetingsPerMonth}回のオンライン定例`],
    recommended: true,
  },
  {
    id: "pro",
    rank: "松",
    name: "プロ",
    catch: "ITの方針から、いっしょに考える",
    target: target(byId("pro").employees),
    price: yen(byId("pro").price),
    hours: `月${byId("pro").hours}時間まで`,
    base: "スタンダードの全内容",
    features: ["IT顧問（方針・ベンダー選定の相談）", "年間ITロードマップの作成", "業務自動化・SaaS連携の構築"],
  },
];

// 比較表。true = 含む / false = 含まない / 文字列 = 内容
export const compareRows: { label: string; values: (string | boolean)[] }[] = [
  { label: "月の対応時間", values: pricing.plans.map((p) => `${p.hours}時間`) },
  { label: "返信の目安（対応時間内）", values: pricing.plans.map((p) => p.reply) },
  { label: "ヘルプデスク", values: [true, true, true] },
  { label: "アカウント管理", values: [true, true, true] },
  { label: "PCセットアップ", values: pricing.plans.map((p) => `月${p.pcSetupPerMonth}台`) },
  { label: "IT資産台帳の管理", values: [false, true, true] },
  { label: "クラウド(M365/GWS)運用", values: [false, true, true] },
  { label: "セキュリティ基本対策", values: [false, true, true] },
  { label: "オンライン定例", values: pricing.plans.map((p) => (p.meetingsPerMonth ? `月${p.meetingsPerMonth}回` : false)) },
  { label: "IT顧問・ロードマップ", values: [false, false, true] },
  { label: "業務自動化・SaaS連携", values: [false, false, true] },
  { label: "優先対応", values: [false, false, true] },
];

export const planNotes = [
  "表示価格はすべて税別・月額です。",
  `対応時間を超えた分は ${yen(pricing.overage.ratePerHour)}円/時間 で承ります。`,
  "サポートは原則リモートです。訪問が必要な場合は東京23区内に限り別途お見積りします。",
  "即時の駆けつけ・24時間監視には対応していません。",
];

// 品質を保つための同時受け入れ上限
export const capacity = pricing.capacity;

// 構造化データ・見出しで使う数値
export const minPriceMan = minPrice / 10000;
export const serviceHours = pricing.serviceHours;

export const skills = ["PCセットアップ", "ヘルプデスク", "クラウド運用", "ネットワーク", "セキュリティ", "業務自動化"];

export const steps = [
  {
    free: true,
    title: "無料相談",
    sub: "メールでご連絡",
    items: ["いまのIT環境とお困りごと", "従業員数と今後の計画", "ご希望のプラン(未定でOK)"],
  },
  {
    free: true,
    title: "かんたん診断・ご提案",
    sub: "最適なプランを提示",
    items: ["IT資産とアカウントの確認", "セキュリティ簡易チェック", "プランとお見積り"],
  },
  {
    free: false,
    title: "運用スタート",
    sub: "最短で翌週から",
    items: ["管理者権限の引き継ぎ", "社内への窓口アナウンス", "問い合わせ方法の決定"],
  },
];

export const reasons = [
  { big: "現役エンジニアが\n直接対応", body: "営業担当や取り次ぎを挟みません。実際に手を動かす本人が、お話を伺って対応します。" },
  { big: "担当者が\nずっと変わらない", body: "毎回イチから説明する必要はありません。社内の事情を理解したまま伴走します。" },
  { big: "ノウハウが\n社内に残る", body: "手順書や判断基準をドキュメントで残すので、将来の内製化や引き継ぎでも困りません。" },
];

export const tips = [
  {
    bad: { title: "価格だけで決める", body: "月額が安くても、対応範囲外の作業が都度見積もりになると結果的に高くつくことがあります。" },
    good: { title: "対応範囲が具体的", body: "対象業務・対応時間・返信の目安が明示されていると、社内も依頼しやすくなります。" },
  },
  {
    bad: { title: "「何でもお任せ」", body: "得意分野があいまいだと、誰が何をどこまで担当するのかが見えにくくなります。" },
    good: { title: "判断と作業を分ける", body: "方針の相談と実作業の担当が分かれていると、意思決定が速く、品質も安定します。" },
  },
  {
    bad: { title: "丸投げ前提", body: "社内にノウハウが残らず、契約終了時にゼロからやり直しになりがちです。" },
    good: { title: "社内にノウハウが残る", body: "ドキュメントや運用ルールを一緒に整え、引き継ぎまで見据えてくれるパートナーが安心です。" },
  },
];

export const message = {
  heading: "続けられるITを、いっしょに。",
  name: "山田 太郎",
  roman: "Taro Yamada",
  role: "運営者",
  body: [
    "はじめまして。ラクシスを運営している山田です。現役のITエンジニアとして働きながら、小さな会社のIT担当をお引き受けしています。",
    "小さな会社のIT現場で起きている困りごとの多くは、「技術」ではなく「運用」の問題です。ツールを入れても使われない、設定した人が辞めたら誰も分からない——そんな状況をなくしたいと考えています。",
    "ひとりで運営しているからこそ、窓口と作業者が同じで、担当が変わることもありません。専門用語ではなく皆さんの業務の言葉でお話しし、一緒に優先順位を決めて、一歩ずつ整えていきます。",
    "品質を保つため、同時にお受けできる会社数には上限を設けています。まずはお気軽にご相談ください。",
  ],
};

export const excluded = [
  "機器購入費・ソフトウェア利用料",
  "配線工事・機器設置等の工事費用",
  "他社保守契約に基づく費用(複合機保守など)",
  "遠方への出張交通費・送料等の実費",
  "機器の破損・盗難・災害等に起因する費用",
  "データ消失・漏えいに伴う復旧費用および損害賠償",
];

export const faqs = [
  { q: "どのプランを選べばいいか分かりません。", a: "迷ったらスタンダードがおすすめです。無料相談で現状を伺い、最適なプランをご提案します。契約後のプラン変更も翌月から可能です。" },
  { q: "ひとりで運営していて、不在のときは大丈夫ですか？", a: "対応時間と返信の目安は事前にお約束し、休暇などの不在予定は前もってお知らせします。即時の駆けつけや24時間監視は行っていないため、必要な場合は専門業者との併用をご提案します。" },
  { q: "月の対応時間を使い切ったらどうなりますか？", a: `超過分は ${yen(pricing.overage.ratePerHour)}円/時間 で対応します。超過が続く場合は、上位プランの方が割安になるケースが多いのでご案内します。` },
  { q: "月額料金にツールの利用料は含まれますか？", a: "含まれません。各種SaaSやソフトウェアの利用料はお客様のご負担です。選定や契約手続きのサポートは可能です。" },
  { q: "最低契約期間や解約の条件は？", a: "最低契約期間は1ヶ月、以降は1ヶ月ごとの自動更新です。解約は満了の1ヶ月前までにお申し出ください。" },
  { q: "訪問(オンサイト)対応は可能ですか？", a: "サポートは原則リモートです。訪問が必要な場合は、東京23区内に限り別途お見積りのうえ対応します。" },
];

// URL が空のものは表示しない。アカウント開設後に URL を入れる
export const sns: { name: string; href: string }[] = [
  { name: "Instagram", href: "" },
  { name: "YouTube", href: "" },
  { name: "TikTok", href: "" },
];

export const legal = {
  // 規程の制定日・最終改定日
  privacyUpdated: "2026年9月26日",
  company: [
    { label: "屋号", value: brand.name },
    { label: "運営者", value: `${brand.operator}（個人事業主）` },
    { label: "所在地", value: `${brand.area}（詳細はご契約時にお知らせします）` },
    { label: "事業内容", value: "小規模企業向けのIT運用サポート／ITに関するご相談" },
    { label: "対応時間", value: hours.label },
    { label: "お問い合わせ", value: brand.email },
  ],
};

// 件名・本文テンプレ入りの mailto。プラン名を渡すと件名に入る
export function mailto(plan?: string) {
  const subject = plan ? `【${plan}プラン】無料相談の申し込み` : "【無料相談】お問い合わせ";
  const body = [
    "会社名：",
    "お名前：",
    "従業員数：",
    `ご希望のプラン：${plan ?? "未定"}`,
    "ご相談内容：",
    "",
  ].join("\n");
  return `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
