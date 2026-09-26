# ラクシス

小さな会社向けの情シスサポート「ラクシス」の、サイトと営業・契約・運用書類をまとめたリポジトリです。

- **サイト**：Next.js 16（App Router）＋ React 19 ＋ TypeScript ＋ Tailwind CSS v4
- **書類**：Word・Excel の生成スクリプト（`business-docs/`）
- **料金・対応時間・条件**：`config/pricing.json` が唯一の定義で、サイトと全書類がここを読みます

```
.
├── config/pricing.json   料金・対応時間・条件（ここだけを直す）
├── src/                  サイト
│   ├── content.ts        サイトの文言（料金の数値は pricing.json から読む）
│   └── app/              ページ（トップ／プライバシーポリシー／運営者情報／404）
└── business-docs/        書類の生成スクリプト
    ├── build_all.sh      全書類をまとめて作り直す
    ├── lib_pricing.js    pricing.json を読む部品（JS）
    ├── pricing.py        pricing.json を読む部品（Python）
    ├── lib_docx.js       Word の共通デザイン
    ├── snapshot.py       書類の中身が変わっていないかの確認ツール
    ├── build_deck.js     スライドを作り直す（テンプレートに料金を差し込む）
    └── deck/
        ├── templates/    スライドのテンプレート（文言・デザインはここを直す）
        └── project/      生成されたスライド（Artifact に公開するもの）
```

## 料金や対応時間を変えるとき

1. `config/pricing.json` を直す（プランの金額・時間・返信の目安・PCセットアップ台数・定例の回数・対象人数、超過単価、受け入れ社数、対応時間）
2. 書類とスライドを作り直す：`cd business-docs && ./build_all.sh --check`
   - 変わった書類・スライドが「差分」として表示されます。料金が載っていないものに差分が出たら不具合です。
3. サイトを確認する：`npm run dev`
4. **スライドを公開し直す**：`build_deck.js` が「Artifact への公開が必要」と表示したスライドを、[サービス説明資料](https://claude.ai/artifact/J4tLwpUKXKDt2kuDRHJN59)に公開し直します（Claude に「更新されたスライドを公開して」と頼めば行えます）。

スライドの文言やデザインを変えるときは、`deck/project/slides/` ではなく `deck/templates/` を直してください。`deck/project/slides/` は生成物なので、作り直すと上書きされます。料金や時間は `{{standard.price}}` のような差し込み記号で書きます（使える記号は `build_deck.js` の `values` を参照）。

## サイト

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 本番ビルド
```

公開前に `src/content.ts` の仮の値（メールアドレス、運営者名）と、環境変数 `NEXT_PUBLIC_SITE_URL`（本番URL）を設定してください。

## 書類

初回だけ準備が必要です（Node.js と Python 3 が必要）。

```bash
cd business-docs
npm install
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
./build_all.sh   # out/ に全書類が作られる
```

| 段階 | 書類 | 形式 | スクリプト |
|---|---|---|---|
| 集客・営業 | サービス説明資料（スライド） | HTML（Artifact） | `build_deck.js` |
| 集客・営業 | 料金表 | Word | `build_pricelist.js` |
| 相談・提案 | ヒアリングシート | Excel | `build_hearing.py` |
| 相談・提案 | 提案書 | Word | `build_proposal.js` |
| 相談・提案 | 見積書・請求書 | Excel | `build_xlsx.py` |
| 契約 | 業務委託契約書（準委任）・秘密保持契約書 | Word | `build.js` |
| 運用開始 | オンボーディングチェックリスト | Excel | `build_onboarding.py` |
| 運用開始 | IT運用マニュアル | Word | `build_manual.js` |
| 運用開始 | インシデント対応手順書 | Word | `build_incident.js` |
| 運用開始 | ITよくある質問（社員向け） | Word | `build_faq.js` |
| 毎月の運用 | 月次作業報告書 | Excel | `build_report.py` |
| 契約終了 | オフボーディングチェックリスト | Excel | `build_offboarding.py` |

- 〔　〕は、お客様ごとに書き換える箇所です。記入例はすべて同じ架空の会社（サンプル商事株式会社・25名・スタンダード）でそろえています。
- 生成物（`out/`）はリポジトリに入れていません。いつでも `./build_all.sh` で作り直せます。
- 契約書・プライバシーポリシー・インシデント対応手順書は雛形です。使う前に専門家の確認を受けてください。
