// サイト内の文言・データはすべてここに集約。ブランド差し替え時はこのファイルを編集する。

// 本番URL。Vercel などでは環境変数 NEXT_PUBLIC_SITE_URL で上書きする
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");

export const siteDescription =
  "IT担当者が兼務・不在の中小企業向け情シスアウトソーシング。月額5万円からの3プランで、毎日8:00〜21:00・土日も専門チームが対応します。";

export const brand = {
  name: "ラクシス",
  roman: "raku-sys",
  tagline: "まるっと頼れる情シス窓口",
  company: "サンプルテック株式会社",
  zip: "〒100-0000",
  address: "東京都千代田区サンプル町1-2-3 サンプルビル5F",
  tel: "03-0000-0000",
  url: "https://example.com/",
  // 仮置きのダミー。本番前に差し替える
  email: "hello@example.com",
};

export const hours = {
  label: "毎日 8:00〜21:00",
  note: "平日・土日祝ともに対応しています。",
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
    target: "従業員 〜30名",
    price: "50,000",
    hours: "月10時間まで",
    features: ["チャット・メールのITヘルプデスク", "アカウント発行・停止", "PCセットアップ（月2台まで）"],
  },
  {
    id: "standard",
    rank: "竹",
    name: "スタンダード",
    catch: "情シス担当を、まるごと任せる",
    target: "従業員 30〜100名",
    price: "120,000",
    hours: "月30時間まで",
    base: "ライトの全内容",
    features: ["M365 / Google Workspace の運用", "セキュリティ対策の導入と監視", "月1回の定例ミーティング"],
    recommended: true,
  },
  {
    id: "pro",
    rank: "松",
    name: "プロ",
    catch: "ITを、経営の武器にする",
    target: "従業員 100名〜",
    price: "250,000",
    hours: "月70時間まで",
    base: "スタンダードの全内容",
    features: ["IT顧問・CIO代行", "中期ITロードマップの策定", "業務自動化・SaaS連携の構築"],
  },
];

// 比較表。true = 含む / false = 含まない / 文字列 = 内容
export const compareRows: { label: string; values: (string | boolean)[] }[] = [
  { label: "月の対応時間", values: ["10時間", "30時間", "70時間"] },
  { label: "初回返信の目安", values: ["4時間以内", "1時間以内", "30分以内"] },
  { label: "ヘルプデスク", values: [true, true, true] },
  { label: "アカウント管理", values: [true, true, true] },
  { label: "PCセットアップ", values: ["月2台", "月10台", "無制限"] },
  { label: "IT資産台帳の管理", values: [false, true, true] },
  { label: "クラウド(M365/GWS)運用", values: [false, true, true] },
  { label: "セキュリティ導入・監視", values: [false, true, true] },
  { label: "定例ミーティング", values: [false, "月1回", "隔週"] },
  { label: "IT顧問・ロードマップ", values: [false, false, true] },
  { label: "業務自動化・SaaS連携", values: [false, false, true] },
  { label: "専任PM", values: [false, false, true] },
];

export const planNotes = [
  "表示価格はすべて税別・月額です。",
  "対応時間を超えた分は 6,000円/時間 で承ります。",
  "サーバー移行・オフィス移転などのスポット案件は別途お見積りします。",
];

export const experts = ["端末セットアップ", "ヘルプデスク", "NW・サーバー", "AI・DX", "セキュリティ", "業務改善"];

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
  { big: "正社員エンジニアの\nチーム制", body: "在籍エンジニアはすべて正社員。窓口は1つのまま、内容に応じて専門家が対応します。" },
  { big: "毎日 8:00〜21:00\n土日も対応", body: "始業前の「PCが起動しない」も、週末のトラブルも。業務時間の外こそ頼れる体制です。" },
  { big: "ノウハウが\n社内に残る", body: "手順書や判断基準をドキュメントで残すので、担当交代や将来の内製化でも困りません。" },
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
  role: "代表取締役",
  body: [
    "はじめまして。ラクシスを運営するサンプルテック代表の山田です。",
    "これまで多くの中小企業のIT現場を見てきて感じるのは、困りごとの多くが「技術」ではなく「運用」の問題だということです。ツールを入れても使われない、設定した人が辞めたら誰も分からない——そんな状況を何度も目にしてきました。",
    "私たちが目指すのは、派手なDXではなく、明日からも無理なく続けられる仕組みづくりです。専門用語ではなく皆さんの業務の言葉でお話しし、一緒に優先順位を決めて、一歩ずつ整えていきます。",
    "「何から相談すればいいか分からない」という段階でも大歓迎です。まずはお気軽にお声がけください。",
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
  { q: "月の対応時間を使い切ったらどうなりますか？", a: "超過分は 6,000円/時間 で対応します。超過が続く場合は、上位プランの方が割安になるケースが多いのでご案内します。" },
  { q: "月額料金にツールの利用料は含まれますか？", a: "含まれません。各種SaaSやソフトウェアの利用料はお客様のご負担です。選定や契約手続きのサポートは可能です。" },
  { q: "最低契約期間や解約の条件は？", a: "最低契約期間は1ヶ月、以降は1ヶ月ごとの自動更新です。解約は満了の1ヶ月前までにお申し出ください。" },
  { q: "訪問(オンサイト)対応は可能ですか？", a: "可能です。対応エリアや頻度に応じて別途お見積りいたします。" },
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
    { label: "会社名", value: "サンプルテック株式会社" },
    { label: "代表者", value: "代表取締役 山田 太郎" },
    { label: "所在地", value: "〒100-0000 東京都千代田区サンプル町1-2-3 サンプルビル5F" },
    { label: "設立", value: "20XX年X月" },
    { label: "資本金", value: "X,XXX万円" },
    { label: "従業員数", value: "XX名（うちエンジニア XX名）" },
    { label: "事業内容", value: "情報システム部門の運用支援・アウトソーシング／ITコンサルティング／システム開発" },
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
