#!/bin/sh
# すべての書類を config/pricing.json から作り直す。
# 使い方: ./build_all.sh          … 生成のみ
#         ./build_all.sh --check  … 生成前後の中身を比べ、変わった書類を表示する（料金を変えていないのに差分が出たら不具合）
set -e
cd "$(dirname "$0")"
PY=.venv/bin/python
if [ "$1" = "--check" ]; then $PY snapshot.py "${TMPDIR:-/tmp}/rakusys_before.json" >/dev/null 2>&1; fi
for s in build_contracts.ts build_proposal.ts build_incident.ts build_manual.ts build_faq.ts build_pricelist.ts build_deck.ts; do
  node "$s"
done
for s in build_xlsx.py build_report.py build_hearing.py build_onboarding.py build_offboarding.py; do
  $PY "$s"
done
if [ "$1" = "--check" ]; then
  $PY snapshot.py "${TMPDIR:-/tmp}/rakusys_after.json" >/dev/null 2>&1
  $PY snapshot.py --diff "${TMPDIR:-/tmp}/rakusys_before.json" "${TMPDIR:-/tmp}/rakusys_after.json"
fi
