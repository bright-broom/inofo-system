"""config/pricing.json（料金・時間の唯一の定義）を読み、書類で使う表記に整える。"""
import json
from pathlib import Path

PRICING = json.loads((Path(__file__).parent.parent / "config" / "pricing.json").read_text(encoding="utf-8"))
PLANS = PRICING["plans"]
OVERAGE = PRICING["overage"]["ratePerHour"]
_w, _h = PRICING["serviceHours"]["weekday"], PRICING["serviceHours"]["holiday"]
HOURS = f"平日 {_w['open']}〜{_w['close']}／土日祝 {_h['open']}〜{_h['close']}"


def plan(plan_id):
    return next(p for p in PLANS if p["id"] == plan_id)


RECOMMENDED = next(p for p in PLANS if p.get("recommended"))
