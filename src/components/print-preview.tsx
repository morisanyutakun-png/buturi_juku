import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Lock, Sparkles } from "lucide-react";
import type { Print } from "@/data/prints";
import { printPageImagePaths, PRINT_BLUR_DATA_URL } from "@/data/prints";

type Props = {
  print: Print;
};

/**
 * PDF のページ画像を縦に並べた Web プレビュー。
 *
 * - 「ダウンロードしなくても中身が読める」が一次目的なので、
 *   画像はページごとにカード化し、ページ番号と区切りを明示する。
 * - スマホでも紙の質感が残るように、淡い影と紙色のフレームをつける。
 * - `kind === "paid"` で `previewMaxPage` が指定されているプリントは
 *   それ以降のページにロックオーバーレイをかけ、note への購入導線に流す。
 *
 * 画像最適化:
 * - ソースは WebP（PNG 比 60〜70% 減）。next/image で AVIF/WebP に再エンコード配信。
 * - 1 ページ目だけ `priority`（LCP 候補）+ blur プレースホルダで CLS と "白い空白" を回避。
 * - 他ページは next/image デフォルトの lazy load に任せる（viewport 接近で読み込み）。
 * - `quality={80}` でファイル容量を抑制（文字・図ベースのプリントなら劣化感じにくい）。
 */

export function PrintPreview({ print }: Props) {
  const pages = printPageImagePaths(print);
  const lockAfter =
    print.kind === "paid" && typeof print.previewMaxPage === "number"
      ? print.previewMaxPage
      : pages.length;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-5 flex items-center justify-between">
        <p className="flex items-center gap-2 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.22em] sm:tracking-[0.28em] text-warm-deep">
          <Sparkles className="h-3 w-3" aria-hidden />
          Web プレビュー — 全 {pages.length} ページ
        </p>
        <p className="font-mono text-[10.5px] text-ink-400">
          {print.subject} / {print.topic}
        </p>
      </div>

      <ol className="space-y-6 sm:space-y-8">
        {pages.map((src, i) => {
          const pageNum = i + 1;
          const locked = pageNum > lockAfter;
          return (
            <li key={src} className="relative">
              <figure className="relative overflow-hidden rounded-2xl border border-ink-900/[0.08] bg-paper shadow-card">
                {/* 紙の上のうっすらしたグラデーション */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-[1] opacity-[0.5] [background-image:radial-gradient(1200px_500px_at_20%_-10%,rgba(202,163,75,0.08),transparent_55%)]"
                />
                <Image
                  src={src}
                  alt={`${print.title}（${print.subject} / ${print.topic}）— Page ${pageNum} / ${pages.length}`}
                  width={1240}
                  height={1754}
                  sizes="(min-width: 768px) 720px, 100vw"
                  quality={80}
                  priority={pageNum === 1}
                  loading={pageNum === 1 ? undefined : "lazy"}
                  placeholder={pageNum === 1 ? "blur" : undefined}
                  blurDataURL={pageNum === 1 ? PRINT_BLUR_DATA_URL : undefined}
                  className={`relative z-0 h-auto w-full ${locked ? "blur-md scale-[1.02]" : ""}`}
                />
                <figcaption className="absolute bottom-2 right-3 z-[2] rounded-full bg-ink-900/85 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.14em] text-paper">
                  Page {pageNum} / {pages.length}
                </figcaption>
              </figure>

              {locked && print.paidUrl && (
                <div className="absolute inset-0 z-[3] flex items-center justify-center px-4">
                  <div className="max-w-sm rounded-2xl border border-gold/40 bg-white/95 p-5 sm:p-6 text-center shadow-card backdrop-blur">
                    <p className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-gold-deep">
                      <Lock className="h-3 w-3" aria-hidden />
                      PAID — 続きは有料版で
                    </p>
                    <p className="mt-3 font-serif text-[1.05rem] leading-snug text-ink-900">
                      解説の続きは note の有料プリントで読めます。
                    </p>
                    <a
                      href={print.paidUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-5 inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-3 text-[13.5px] font-medium text-paper transition hover:bg-ink-800"
                    >
                      note で続きを購入する
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <p className="mt-6 text-center text-[11.5px] text-ink-500">
        画像が小さい場合は PDF をダウンロードしてご覧ください。
      </p>

      {/* 末尾の購入導線（有料・previewMaxPage 未指定でも note の他教材へ） */}
      {print.kind === "paid" && print.paidUrl && (
        <div className="mt-8 rounded-2xl border border-gold/30 bg-gold-soft/30 p-5 sm:p-6 text-center">
          <p className="font-serif text-[1.05rem] text-ink-900">
            このプリントは <strong className="text-gold-deep">有料版</strong>です。
          </p>
          <Link
            href={print.paidUrl}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-3 text-[13.5px] font-medium text-paper transition hover:bg-ink-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            note で購入する
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
