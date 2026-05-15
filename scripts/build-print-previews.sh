#!/usr/bin/env bash
# 演習プリント PDF を Web 表示用の WebP ページ画像に変換する。
#
# 使い方:
#   ./scripts/build-print-previews.sh
#
# 動作:
#   public/prints/<slug>.pdf を読み、public/prints/<slug>/page-N.webp を生成する。
#   - PDF → PNG: pdftoppm（poppler）
#   - PNG → WebP: cwebp（libwebp）
#   PNG は中間ファイルとして生成後、削除する（公開ディレクトリには WebP のみ残す）。
#
# 必要ツール（macOS）:
#   brew install poppler webp
#
# 解像度:
#   144 DPI（A4 で約 1190 x 1684 px）。Retina で十分な精細感を確保しつつ、
#   next/image が自動で responsive に縮小する前提で、これ以上は上げない。
#
# 画像形式:
#   WebP を主形式として配信する。next/image 経由でさらに AVIF/WebP に再エンコードされるが、
#   ソースを WebP にしておくことで以下の利点がある:
#   - リポジトリ / デプロイサイズが PNG 比 60〜70% 減
#   - next/image のコールドキャッシュ時の最適化処理が高速
#   - PageSpeed Insights の "Serve images in next-gen formats" 指摘を解消
#
# 注意:
#   既存の page-*.webp は上書きされる。PDF を差し替えたときは必ず再生成。

set -euo pipefail

cd "$(dirname "$0")/.."

if ! command -v pdftoppm >/dev/null 2>&1; then
  echo "ERROR: pdftoppm が見つかりません。macOS なら 'brew install poppler' を実行してください。" >&2
  exit 1
fi

if ! command -v cwebp >/dev/null 2>&1; then
  echo "ERROR: cwebp が見つかりません。macOS なら 'brew install webp' を実行してください。" >&2
  exit 1
fi

SHRINK_TO_FIT=1240   # 横幅の最大ピクセル（後段の next/image でも縮小される）
WEBP_QUALITY=82      # 文字・図ベースのプリントには 80〜85 が目視で劣化を感じない上限。

PRINTS_DIR="public/prints"

shopt -s nullglob
for pdf in "$PRINTS_DIR"/*.pdf; do
  slug="$(basename "$pdf" .pdf)"
  out_dir="$PRINTS_DIR/$slug"
  mkdir -p "$out_dir"
  echo "→ $slug"

  # 1) PDF → PNG（中間ファイル）
  pdftoppm -png -scale-to "$SHRINK_TO_FIT" "$pdf" "$out_dir/page"

  # 2) pdftoppm のゼロ埋め（page-01.png）を page-1.png にリネーム
  for f in "$out_dir"/page-*.png; do
    base="$(basename "$f")"
    num="${base#page-}"
    num="${num%.png}"
    trimmed="$(echo "$num" | sed 's/^0*//')"
    [ -z "$trimmed" ] && trimmed="0"
    new_path="$out_dir/page-${trimmed}.png"
    if [ "$f" != "$new_path" ]; then
      mv "$f" "$new_path"
    fi
  done

  # 3) PNG → WebP、中間 PNG は削除
  pages=0
  for png in "$out_dir"/page-*.png; do
    webp="${png%.png}.webp"
    cwebp -q "$WEBP_QUALITY" -m 6 -quiet "$png" -o "$webp"
    rm "$png"
    pages=$((pages + 1))
  done

  echo "    pages=$pages (webp, q=$WEBP_QUALITY)"
done

echo "done."
