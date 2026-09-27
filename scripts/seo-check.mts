// SEO の自動チェック。`npm run build` の後に `npm run seo:check` で実行し、問題があれば終了コード 1。
// ビルド結果（.next/server/app の HTML）を検査するので、実際に配信される内容をそのまま確かめられる。
import fs from "node:fs";
import path from "node:path";

const APP = path.join(import.meta.dirname, "..", ".next/server/app");
if (!fs.existsSync(APP)) {
  console.error("ビルド結果がありません。先に npm run build を実行してください。");
  process.exit(1);
}

const problems: string[] = [];
const fail = (page: string, msg: string) => problems.push(`${page}  ${msg}`);

// ページ一覧（ビルドで作られた HTML）。404・エラーページは別扱い
const files = fs.readdirSync(APP, { recursive: true, encoding: "utf8" }).filter((f) => f.endsWith(".html"));
const toPath = (f: string) => "/" + f.replace(/\.html$/, "").replace(/(^|\/)index$/, "");
const pages = files.filter((f) => !/^_/.test(path.basename(f))).map((f) => ({ file: f, path: toPath(f) === "/" ? "/" : toPath(f) }));
const known = new Set(pages.map((p) => p.path));

const attr = (html: string, re: RegExp) => html.match(re)?.[1];
const titles = new Map<string, string>();
const descriptions = new Map<string, string>();

for (const { file, path: p } of pages) {
  const html = fs.readFileSync(path.join(APP, file), "utf8");
  const title = attr(html, /<title>([^<]*)<\/title>/);
  const desc = attr(html, /<meta name="description" content="([^"]*)"/);
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);

  if (!title) fail(p, "title がありません");
  else if (titles.has(title)) fail(p, `title が ${titles.get(title)} と重複しています：${title}`);
  else titles.set(title, p);

  if (!desc) fail(p, "meta description がありません");
  else {
    if (desc.length < 50 || desc.length > 160) fail(p, `meta description の長さが ${desc.length} 文字です（50〜160 文字にする）`);
    if (descriptions.has(desc)) fail(p, `meta description が ${descriptions.get(desc)} と重複しています`);
    descriptions.set(desc, p);
  }

  if (!canonical) fail(p, "canonical がありません");
  else if (new URL(canonical).pathname.replace(/\/$/, "") !== p.replace(/\/$/, "")) fail(p, `canonical が別のページを指しています：${canonical}`);

  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) fail(p, `h1 が ${h1} 個あります（1 個にする）`);

  if (!/<meta property="og:title"/.test(html)) fail(p, "og:title がありません");
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) fail(p, "noindex になっています（公開ページなのに検索に載らない）");

  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!ld.length) fail(p, "構造化データ（JSON-LD）がありません");
  for (const [, json] of ld) {
    try {
      const data = JSON.parse(json);
      if (data["@context"] !== "https://schema.org") fail(p, "構造化データに @context がありません");
    } catch {
      fail(p, "構造化データが JSON として読めません");
    }
  }

  for (const [, href] of html.matchAll(/<a [^>]*href="(\/[^"]*)"/g)) {
    const target = href.split("#")[0].split("?")[0] || "/";
    if (!known.has(target.replace(/\/$/, "") || "/")) fail(p, `リンク切れ：${href}`);
  }
}

// 404 ページは検索に載せない
const nf = files.find((f) => path.basename(f) === "_not-found.html");
if (nf && !/<meta name="robots" content="[^"]*noindex/.test(fs.readFileSync(path.join(APP, nf), "utf8"))) fail("404", "noindex が付いていません");

// サイトマップと robots
const sitemap = fs.readFileSync(path.join(APP, "sitemap.xml.body"), "utf8");
const listed = new Set([...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map(([, u]) => new URL(u).pathname.replace(/\/$/, "") || "/"));
for (const p of known) if (!listed.has(p)) fail("sitemap.xml", `${p} が載っていません`);
for (const p of listed) if (!known.has(p)) fail("sitemap.xml", `存在しないページ ${p} が載っています`);
if (!/Sitemap:/.test(fs.readFileSync(path.join(APP, "robots.txt.body"), "utf8"))) fail("robots.txt", "Sitemap の記載がありません");

if (problems.length) {
  console.error(`SEO チェック：${problems.length} 件の問題があります`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}
console.log(`SEO チェック：問題なし（${pages.length} ページ・タイトル/説明文の重複なし・h1・canonical・構造化データ・内部リンク・サイトマップ）`);
