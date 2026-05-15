#!/usr/bin/env bash
# 演習プリント PDF を Web 表示用の PNG ページ画像に変換する。
#
# 使い方:
#   ./scripts/build-print-previews.sh
#
# 動作:
#   public/prints/<slug>.pdf を読み、public/prints/<slug>/page-N.png を生成する。
#   pdftoppm（poppler）を使用。macOS では `brew install poppler` で導入する。
#
# 解像度:
#   144 DPI（A4 で約 1190 x 1684 px）。Retina で十分な精細感を確保しつつ、
#   next/image が自動で responsive に縮小する前提で、これ以上は上げない。
#
# 注意:
#   既存の page-*.png は上書きされる。PDF を差し替えたときは必ず再生成。

set -euo pipefail

cd "$(dirname "$0")/.."

if ! command -v pdftoppm >/dev/null 2>&1; then
  echo "ERROR: pdftoppm が見つかりません。macOS なら 'brew install poppler' を実行してください。" >&2
  exit 1
fi

DPI=144
SHRINK_TO_FIT=1240   # 横幅の最大ピクセル（後段の next/image でも縮小される）

PRINTS_DIR="public/prints"

shopt -s nullglob
for pdf in "$PRINTS_DIR"/*.pdf; do
  slug="$(basename "$pdf" .pdf)"
  out_dir="$PRINTS_DIR/$slug"
  mkdir -p "$out_dir"
  echo "→ $slug"
  # -scale-to で横幅を制限、-png で出力フォーマット指定、-r でも DPI 指定可
  # ここでは -scale-to を優先（出力サイズが安定する）
  pdftoppm -png -scale-to "$SHRINK_TO_FIT" "$pdf" "$out_dir/page"
  # pdftoppm の出力は page-1.png ではなく page-01.png のような 0 埋め形式に
  # なることがある（総ページ数によって桁数が変わる）。Web 側の参照を単純化するため、
  # ゼロ埋めを除去した page-N.png にリネームする。
  for f in "$out_dir"/page-*.png; do
    base="$(basename "$f")"
    # 例: page-01.png → 01 / page-1.png → 1
    num="${base#page-}"
    num="${num%.png}"
    # 先頭のゼロを除去（10 はそのまま 10）
    trimmed="$(echo "$num" | sed 's/^0*//')"
    [ -z "$trimmed" ] && trimmed="0"
    new_path="$out_dir/page-${trimmed}.png"
    if [ "$f" != "$new_path" ]; then
      mv "$f" "$new_path"
    fi
  done
  pages=$(ls "$out_dir"/page-*.png 2>/dev/null | wc -l | tr -d ' ')
  echo "    pages=$pages"
done

echo "done."
