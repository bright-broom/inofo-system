"""生成物のスナップショットを作り、変更前後の差分を確認するための検証ツール。

使い方:
  .venv/bin/python snapshot.py <出力ファイル.json>
  .venv/bin/python snapshot.py --diff <前.json> <後.json>

- docx は本文テキスト（mammoth で抽出）
- xlsx は全セルの「計算後の値」（formulas で再計算）
- スライドは HTML をそのまま
を記録する。リファクタで見た目・金額が変わっていないことの確認に使う。
TODAY() を使うセル（期限の「注意」列）は日付が変わると値が変わるため、同じ日に比較すること。
"""
import json
import subprocess
import sys
from pathlib import Path

OUT = Path(__file__).parent / "out"


def docx_text(path: Path) -> str:
    js = "require('mammoth').extractRawText({path:process.argv[1]}).then(r=>process.stdout.write(r.value))"
    return subprocess.run(["node", "-e", js, str(path)], capture_output=True, text=True, check=True, cwd=Path(__file__).parent).stdout


def xlsx_values(path: Path) -> dict:
    import formulas
    import openpyxl

    sol = formulas.ExcelModel().loads(str(path)).finish().calculate()
    vals = {}
    for k, v in sol.items():
        if "!" not in k:
            continue
        x = v.value
        x = x[0][0] if hasattr(x, "shape") else x
        vals[k.split("]", 1)[1]] = str(x)
    # 数式でないセル（入力値・見出し）も記録する
    wb = openpyxl.load_workbook(path)
    for ws in wb.worksheets:
        for row in ws.iter_rows():
            for c in row:
                if c.value is not None and not (isinstance(c.value, str) and c.value.startswith("=")):
                    vals.setdefault(f"'{ws.title.upper()}'!{c.coordinate}", str(c.value))
    return dict(sorted(vals.items()))


def snapshot() -> dict:
    snap = {}
    for f in sorted(OUT.glob("*.docx")):
        snap[f.name] = docx_text(f)
    for f in sorted(OUT.glob("*.xlsx")):
        snap[f.name] = xlsx_values(f)
    for f in sorted((Path(__file__).parent / "deck/project/slides").glob("*.html")):
        snap[f"スライド/{f.name}"] = f.read_text(encoding="utf-8")
    return snap


def diff(a: dict, b: dict) -> int:
    problems = 0
    for name in sorted(set(a) | set(b)):
        if name not in a or name not in b:
            print(f"[{'追加' if name not in a else '消失'}] {name}")
            problems += name not in b
            continue
        if a[name] == b[name]:
            print(f"[同一] {name}")
            continue
        problems += 1
        print(f"[差分] {name}")
        if isinstance(a[name], dict):
            for k in sorted(set(a[name]) | set(b[name])):
                if a[name].get(k) != b[name].get(k):
                    print(f"    {k}: {a[name].get(k)!r} → {b[name].get(k)!r}")
        else:
            import difflib
            for line in difflib.unified_diff(a[name].splitlines(), b[name].splitlines(), lineterm="", n=0):
                print("    " + line)
    return problems


if __name__ == "__main__":
    if sys.argv[1] == "--diff":
        a, b = (json.loads(Path(p).read_text(encoding="utf-8")) for p in sys.argv[2:4])
        sys.exit(1 if diff(a, b) else 0)
    Path(sys.argv[1]).write_text(json.dumps(snapshot(), ensure_ascii=False, indent=1), encoding="utf-8")
    print("saved", sys.argv[1])
