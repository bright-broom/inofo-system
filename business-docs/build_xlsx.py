"""見積書・請求書テンプレート（Excel）の生成スクリプト。

.venv/bin/python build_xlsx.py で out/見積書・請求書.xlsx を再生成する。
黄色のセルが入力欄。請求書は適格請求書（インボイス）の記載事項を満たす構成にしている。
"""
from datetime import date

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

from pricing import OVERAGE, PLANS, RECOMMENDED

FONT = "游ゴシック"
INPUT_FILL = PatternFill("solid", fgColor="FFF59D")
HEAD_FILL = PatternFill("solid", fgColor="1F1F1F")
SOFT_FILL = PatternFill("solid", fgColor="F2F2F2")
THIN = Side(style="thin", color="999999")
BOX = Border(top=THIN, bottom=THIN, left=THIN, right=THIN)
BOTTOM = Border(bottom=Side(style="medium", color="111111"))

YEN = '"¥"#,##0'
NUM = "#,##0"
DATE = 'yyyy"年"m"月"d"日"'
MONTH = 'yyyy"年"m"月"'

S = "'設定'!"  # 設定シートへの参照プレフィックス

LINE_FIRST, LINE_LAST = 14, 23  # 明細行（10行）


def f(size=10, bold=False, color="111111"):
    return Font(name=FONT, size=size, bold=bold, color=color)


def put(ws, ref, value, *, size=10, bold=False, fmt=None, align=None, fill=None, border=None, color="111111", wrap=False):
    c = ws[ref]
    c.value = value
    c.font = f(size, bold, color)
    if fmt:
        c.number_format = fmt
    c.alignment = Alignment(horizontal=align, vertical="center", wrap_text=wrap)
    if fill:
        c.fill = fill
    if border:
        c.border = border
    return c


def inp(ws, ref, value, **kw):
    """入力欄（黄色・青字）"""
    return put(ws, ref, value, fill=INPUT_FILL, color="0000CC", **kw)


def setup_page(ws, last_row):
    ws.page_setup.paperSize = ws.PAPERSIZE_A4
    ws.page_setup.orientation = "portrait"
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    ws.page_setup.fitToWidth = 1
    ws.page_setup.fitToHeight = 0
    ws.print_area = f"A1:H{last_row}"
    ws.page_margins.left = ws.page_margins.right = 0.5
    ws.sheet_view.showGridLines = False


def col_widths(ws):
    for col, w in {"A": 2, "B": 6, "C": 32, "D": 8, "E": 14, "F": 12, "G": 9, "H": 15}.items():
        ws.column_dimensions[col].width = w


# ---------------------------------------------------------------- 設定
def build_settings(wb):
    ws = wb.active
    ws.title = "設定"
    ws.sheet_view.showGridLines = False
    ws.column_dimensions["A"].width = 2
    ws.column_dimensions["B"].width = 24
    ws.column_dimensions["C"].width = 52

    put(ws, "B2", "発行者情報・共通設定", size=14, bold=True)
    put(ws, "B3", "黄色のセルが入力欄です。ここを入力すると、見積書・請求書の発行者欄に反映されます。", size=9, color="666666")

    rows = [
        ("屋号", "ラクシス"),
        ("氏名", "〔氏名〕"),
        ("住所", "〔〒000-0000 東京都〇〇区〇〇 1-2-3〕"),
        ("メール", "hello@example.com"),
        ("登録番号（インボイス）", "T0000000000000"),
        ("振込先", "〔〇〇銀行 〇〇支店 普通 0000000 〔口座名義カナ〕〕"),
    ]
    for i, (k, v) in enumerate(rows):
        r = 5 + i
        put(ws, f"B{r}", k, bold=True, border=BOX, fill=SOFT_FILL)
        inp(ws, f"C{r}", v, border=BOX)
    # C5 屋号 / C6 氏名 / C7 住所 / C8 メール / C9 登録番号 / C10 振込先

    put(ws, "B12", "税率・期限", size=12, bold=True)
    for r, k, v, fmt in [
        (13, "標準税率", 0.10, "0%"),
        (14, "軽減税率", 0.08, "0%"),
        (15, "見積の有効日数", 30, '0"日"'),
    ]:
        put(ws, f"B{r}", k, bold=True, border=BOX, fill=SOFT_FILL)
        inp(ws, f"C{r}", v, fmt=fmt, border=BOX, align="left")

    put(ws, "B17", "料金表（参照用・契約書 別紙1と同じ）", size=12, bold=True)
    put(ws, "B18", "品目", bold=True, border=BOX, fill=SOFT_FILL)
    put(ws, "C18", "単価（税別）", bold=True, border=BOX, fill=SOFT_FILL)
    for i, (k, v) in enumerate([
        *[(f"{p['name']}プラン 月額委託料", p["price"]) for p in PLANS],
        ("超過対応（1時間あたり）", OVERAGE),
    ]):
        r = 19 + i
        put(ws, f"B{r}", k, border=BOX)
        inp(ws, f"C{r}", v, fmt=YEN, border=BOX, align="left")

    put(ws, "B24", "使い方", size=12, bold=True)
    notes = [
        "1. 最初にこのシートの発行者情報を入力する（1回だけ）。",
        "2. 見積書・請求書は、1件ごとにこのファイルを複製して使う（番号と日付を書き換える）。",
        "3. 請求書のお支払期限は、対象期間の翌月末日（契約書第8条）で自動計算される。",
        "4. 明細の「税率」は 10% / 8% / 対象外 から選ぶ。立替金（ドメイン代など）は「対象外」にする。",
        "5. 消費税は税率ごとに合計してから1回だけ端数を切り捨てる（インボイス制度のルール）。",
        "6. 送付は PDF で書き出して行う。発行した請求書の控えは7年間保存する。",
        "※ インボイス未登録（免税事業者）の間は、登録番号を空欄にする。その場合、請求書は適格請求書にならない。",
    ]
    for i, t in enumerate(notes):
        put(ws, f"B{25 + i}", t, size=9, color="444444")
        ws.merge_cells(f"B{25 + i}:C{25 + i}")
    return ws


# ---------------------------------------------------------------- 共通：明細と合計
def issuer_block(ws, top):
    """右上の発行者欄（設定シートから参照）"""
    put(ws, f"F{top}", f"={S}C5", bold=True, size=11)
    put(ws, f"F{top + 1}", f"={S}C6")
    put(ws, f"F{top + 2}", f"={S}C7", size=9)
    put(ws, f"F{top + 3}", f"={S}C8", size=9)
    put(ws, f"F{top + 4}", f'=IF({S}C9="","","登録番号："&{S}C9)', size=9)


def line_items(ws, examples):
    hdr = LINE_FIRST - 1
    for col, label in zip("BCDEFGH", ["No", "品目", "数量", "単位", "単価", "税率", "金額"]):
        put(ws, f"{col}{hdr}", label, bold=True, color="FFFFFF", fill=HEAD_FILL, align="center", border=BOX)
    dv = DataValidation(type="list", formula1='"10%,8%,対象外"', allow_blank=True)
    ws.add_data_validation(dv)
    for i, r in enumerate(range(LINE_FIRST, LINE_LAST + 1)):
        ex = examples[i] if i < len(examples) else (None, None, None, None, None)
        put(ws, f"B{r}", i + 1, align="center", border=BOX)
        inp(ws, f"C{r}", ex[0], border=BOX)
        inp(ws, f"D{r}", ex[1], border=BOX, align="right")
        inp(ws, f"E{r}", ex[2], border=BOX, align="center")
        inp(ws, f"F{r}", ex[3], fmt=NUM, border=BOX)
        inp(ws, f"G{r}", ex[4] if ex[4] else None, border=BOX, align="center")
        dv.add(f"G{r}")
        put(ws, f"H{r}", f'=IF(OR(D{r}="",F{r}=""),"",D{r}*F{r})', fmt=NUM, border=BOX)


def totals(ws, top):
    """税率ごとの内訳（左）と合計（右）。top 行から4行使う。"""
    rng_rate, rng_amt = f"$G${LINE_FIRST}:$G${LINE_LAST}", f"$H${LINE_FIRST}:$H${LINE_LAST}"
    put(ws, f"B{top}", "税率別内訳", bold=True, size=9)
    for col, label in zip("CDE", ["税率", "対象額（税抜）", "消費税"]):
        put(ws, f"{col}{top + 1}", label, bold=True, size=9, fill=SOFT_FILL, border=BOX, align="center")
    # C列の税率ラベルは明細のプルダウンと同じ文字列で照合する
    for i, (label, rate_ref) in enumerate([("10%", f"{S}C13"), ("8%", f"{S}C14"), ("対象外", None)]):
        r = top + 2 + i
        put(ws, f"C{r}", label, size=9, border=BOX, align="center")
        put(ws, f"D{r}", f'=SUMIF({rng_rate},C{r},{rng_amt})', fmt=NUM, size=9, border=BOX)
        tax = f"=ROUNDDOWN(D{r}*{rate_ref},0)" if rate_ref else 0
        put(ws, f"E{r}", tax, fmt=NUM, size=9, border=BOX)

    put(ws, f"F{top + 1}", "小計（税抜）", bold=True, border=BOX, fill=SOFT_FILL)
    ws.merge_cells(f"F{top + 1}:G{top + 1}")
    put(ws, f"H{top + 1}", f"=SUM({rng_amt})", fmt=NUM, border=BOX)
    put(ws, f"F{top + 2}", "消費税", bold=True, border=BOX, fill=SOFT_FILL)
    ws.merge_cells(f"F{top + 2}:G{top + 2}")
    put(ws, f"H{top + 2}", f"=E{top + 2}+E{top + 3}", fmt=NUM, border=BOX)
    put(ws, f"F{top + 3}", "合計（税込）", bold=True, border=BOX, fill=SOFT_FILL)
    ws.merge_cells(f"F{top + 3}:G{top + 3}")
    put(ws, f"H{top + 3}", f"=H{top + 1}+H{top + 2}", fmt=YEN, bold=True, border=BOX)
    return f"H{top + 3}"


# ---------------------------------------------------------------- 請求書
def build_invoice(wb):
    ws = wb.create_sheet("請求書")
    col_widths(ws)
    put(ws, "B1", "請求書", size=20, bold=True, align="center")
    ws.merge_cells("B1:H1")
    put(ws, "B2", "黄色のセルが入力欄です。淡い色なので、そのままPDF化して送付できます。", size=8, color="999999")

    put(ws, "G3", "請求書番号", size=9, align="right")
    inp(ws, "H3", "INV-2026-001", size=9)
    put(ws, "G4", "発行日", size=9, align="right")
    inp(ws, "H4", date(2026, 10, 31), fmt=DATE, size=9)

    inp(ws, "B4", "サンプル商事株式会社", size=13, bold=True, border=BOTTOM)
    ws.merge_cells("B4:D4")
    put(ws, "E4", "御中", size=12, border=BOTTOM)
    put(ws, "B6", "下記のとおりご請求申し上げます。", size=9)

    put(ws, "B8", "件名", bold=True, size=9)
    inp(ws, "C8", "ITサポート業務委託料", size=9)
    put(ws, "B9", "対象期間", bold=True, size=9)
    inp(ws, "C9", date(2026, 10, 1), fmt=DATE, size=9)
    put(ws, "D9", "〜", size=9, align="center")
    put(ws, "E9", "=EOMONTH(C9,0)", fmt=DATE, size=9)
    put(ws, "B10", "お支払期限", bold=True, size=9)
    put(ws, "C10", "=EOMONTH(C9,1)", fmt=DATE, size=9, bold=True)

    issuer_block(ws, 6)

    line_items(ws, [
        (f"{RECOMMENDED['name']}プラン 月額委託料（10月分）", 1, "式", RECOMMENDED["price"], "10%"),
        (f"超過対応（月間対応時間{RECOMMENDED['hours']}時間を超えた分）", 1.5, "時間", OVERAGE, "10%"),
        ("ドメイン更新費用（立替金）", 1, "式", 1650, "対象外"),
    ])
    total_ref = totals(ws, LINE_LAST + 2)

    # ご請求金額（明細の上に大きく）
    put(ws, "B11", "ご請求金額（税込）", bold=True, size=11, border=BOTTOM)
    ws.merge_cells("B11:C11")
    put(ws, "D11", f"={total_ref}", fmt=YEN, bold=True, size=16, border=BOTTOM)
    ws.merge_cells("D11:E11")

    r = LINE_LAST + 7
    put(ws, f"B{r}", "お振込先", bold=True, size=9)
    put(ws, f"C{r}", f"={S}C10", size=9)
    ws.merge_cells(f"C{r}:H{r}")
    put(ws, f"C{r + 1}", "※ 振込手数料は貴社にてご負担ください。", size=8, color="666666")
    put(ws, f"B{r + 3}", "備考", bold=True, size=9)
    inp(ws, f"C{r + 3}", "当月の対応時間：13.5時間（月間対応時間12時間）", size=9, wrap=True)
    ws.merge_cells(f"C{r + 3}:H{r + 4}")
    setup_page(ws, r + 4)
    return ws


# ---------------------------------------------------------------- 見積書
def build_quote(wb):
    ws = wb.create_sheet("見積書", 1)
    col_widths(ws)
    put(ws, "B1", "御見積書", size=20, bold=True, align="center")
    ws.merge_cells("B1:H1")
    put(ws, "B2", "黄色のセルが入力欄です。淡い色なので、そのままPDF化して送付できます。", size=8, color="999999")

    put(ws, "G3", "見積番号", size=9, align="right")
    inp(ws, "H3", "EST-2026-001", size=9)
    put(ws, "G4", "発行日", size=9, align="right")
    inp(ws, "H4", date(2026, 9, 26), fmt=DATE, size=9)

    inp(ws, "B4", "サンプル商事株式会社", size=13, bold=True, border=BOTTOM)
    ws.merge_cells("B4:D4")
    put(ws, "E4", "御中", size=12, border=BOTTOM)
    put(ws, "B6", "下記のとおりお見積り申し上げます。", size=9)

    put(ws, "B8", "件名", bold=True, size=9)
    inp(ws, "C8", "ITサポート業務（スタンダードプラン）", size=9)
    put(ws, "B9", "開始予定日", bold=True, size=9)
    inp(ws, "C9", date(2026, 10, 1), fmt=DATE, size=9)
    put(ws, "B10", "有効期限", bold=True, size=9)
    put(ws, "C10", f"=H4+{S}C15", fmt=DATE, size=9)

    issuer_block(ws, 6)

    line_items(ws, [
        (f"{RECOMMENDED['name']}プラン 月額委託料", 1, "ヶ月", RECOMMENDED["price"], "10%"),
        ("初期調査（IT資産・アカウントの棚卸し）", 1, "式", 0, "10%"),
    ])
    total_ref = totals(ws, LINE_LAST + 2)

    put(ws, "B11", "御見積金額（税込）", bold=True, size=11, border=BOTTOM)
    ws.merge_cells("B11:C11")
    put(ws, "D11", f"={total_ref}", fmt=YEN, bold=True, size=16, border=BOTTOM)
    ws.merge_cells("D11:E11")

    r = LINE_LAST + 7
    put(ws, f"B{r}", "備考", bold=True, size=9)
    inp(
        ws, f"C{r}",
        "・月額委託料は毎月発生します（1ヶ月ごとの自動更新）。初月は日割りで計算します。\n"
        f"・月間対応時間（{RECOMMENDED['hours']}時間）を超えた分は {OVERAGE:,}円/時間（税別）です。\n"
        "・初期調査は初回契約時に限り無償です。",
        size=9, wrap=True,
    )
    ws.merge_cells(f"C{r}:H{r + 3}")
    for rr in range(r, r + 4):
        ws.row_dimensions[rr].height = 18
    setup_page(ws, r + 3)
    return ws


def main():
    wb = Workbook()
    build_settings(wb)
    build_quote(wb)
    build_invoice(wb)
    wb.calculation.fullCalcOnLoad = True  # Excel で開いたときに必ず再計算させる
    out = "out/見積書・請求書.xlsx"
    wb.save(out)
    print(out)


if __name__ == "__main__":
    main()
