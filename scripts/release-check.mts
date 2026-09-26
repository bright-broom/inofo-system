// 公開前チェック。`npm run release:check` で実行し、公開できない状態なら一覧を出して終了コード 1。
// 仮の値（ダミーのメールアドレス・運営者名・本番URL）のまま公開するのを防ぐ。
// CI では実行しない（仮の値がある間は必ず失敗するため）。公開の直前に手元で実行する。
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");
const problems: string[] = [];

// 1. 本番URL（sitemap・canonical・OGP・構造化データに使われる）
const url = process.env.NEXT_PUBLIC_SITE_URL ?? "";
if (!url) problems.push("環境変数 NEXT_PUBLIC_SITE_URL が未設定です（本番URL。例: https://raku-sys.jp）");
else if (!/^https:\/\//.test(url)) problems.push(`NEXT_PUBLIC_SITE_URL は https:// で始めてください（今: ${url}）`);
else if (/example\.com|localhost/.test(url)) problems.push(`NEXT_PUBLIC_SITE_URL が仮の値です（今: ${url}）`);

// 2. サイトに表示される仮の値
const PLACEHOLDERS: [RegExp, string][] = [
  [/example\.com/, "仮のドメイン（example.com）"],
  [/山田/, "仮の運営者名（山田 太郎）"],
  [/〔/, "未記入の〔　〕"],
];
const files = ["src/content.ts", ...fs.readdirSync(path.join(ROOT, "src/app"), { recursive: true, encoding: "utf8" }).filter((f) => /\.tsx?$/.test(f)).map((f) => `src/app/${f}`)];
for (const file of files) {
  fs.readFileSync(path.join(ROOT, file), "utf8").split("\n").forEach((line, i) => {
    if (line.includes("NEXT_PUBLIC_SITE_URL")) return; // 1. で確認済み（未設定時の既定値）
    for (const [re, label] of PLACEHOLDERS) {
      if (re.test(line)) problems.push(`${file}:${i + 1}  ${label}：${line.trim().slice(0, 70)}`);
    }
  });
}

// 3. 料金定義
try {
  execFileSync(process.execPath, [path.join(ROOT, "config/validate-pricing.mts")], { stdio: "pipe" });
} catch (e) {
  problems.push(`pricing.json に問題があります（npm run validate:pricing で詳細を確認）`);
}

if (problems.length) {
  console.error(`公開できません。${problems.length} 件の問題があります：`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}
console.log("公開前チェック：問題なし");
