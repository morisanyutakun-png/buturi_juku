import Link from "next/link";
import { ArrowRight, BookOpen, FileText } from "lucide-react";
import { Container } from "@/components/container";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { RemPrintCard } from "@/components/rem-print-card";
import { siteConfig } from "@/data/site";

/**
 * Hero（FV）— モバイル第一の高凝縮版。
 *
 * サイト方針（2026.05）以降:
 *   - 第一印象は「高校物理プリント・解説 PDF・参考書の棚」。
 *     体験授業の売り込みではなく、教材リソースへの導線を主役にする。
 *   - 主 CTA → /prints（無料・申込不要）
 *   - 副 CTA → /teacher#books（KDP 参考書 6 冊）
 *   - 学習サポート（個別指導・体験授業）は本文末尾の soft link として残す。
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-ink-900/[0.06]">
      <HeroBackdrop />

      {/* desktop-only diagonal beams */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 -top-1/2 hidden h-[200%] w-[60%] rotate-[24deg] opacity-50 lg:block"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1/3 -top-1/2 hidden h-[200%] w-[55%] -rotate-[18deg] opacity-35 lg:block"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(251,221,196,0.7), transparent)",
        }}
      />

      <Container className="relative py-10 sm:py-20 lg:py-28">
        <div className="lg:grid lg:items-center lg:gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative">
            {/* eyebrow chips: brand + tag pair */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] sm:text-[10.5px] font-medium tracking-[0.16em] sm:tracking-[0.22em] uppercase text-paper"
                style={{
                  background:
                    "linear-gradient(120deg, #142341 0%, #1e3056 65%, #1f5aa6 100%)",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-warm" />
                {siteConfig.nameEn}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-warm/35 bg-warm-bg px-3 py-1 text-[10px] sm:text-[10.5px] font-medium tracking-[0.18em] text-warm-deep">
                高校物理 無料プリント
              </span>
            </div>

            <h1
              className="mt-4 sm:mt-5 font-serif text-[2.05rem] leading-[1.22] tracking-[-0.02em] text-ink-900 sm:text-[3.1rem] sm:leading-[1.14] lg:text-[3.85rem] lg:leading-[1.08]"
              style={{
                wordBreak: "keep-all",
                overflowWrap: "break-word",
                lineBreak: "strict",
              }}
            >
              <span className="block">公式は覚えた。</span>
              <span className="block">
                それなのに、
                <span className="relative inline-block">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(120deg, #b35f27 0%, #e28040 50%, #f3a86c 100%)",
                    }}
                  >
                    解けない
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-1 h-[8px] sm:h-[10px] -z-10 rounded-full bg-warm/25"
                  />
                </span>
                。
              </span>
            </h1>

            <p className="mt-6 sm:mt-7 max-w-xl text-[14.5px] sm:text-[16px] leading-[1.95] sm:leading-[1.85] text-ink-700">
              ——その壁は、立式の手順を踏み直せば崩せます。<br className="hidden sm:block" />
              力学・電磁気・波動・熱・原子の演習プリントを、解答と解説までセットで無料で公開しています。気になる単元から、開いてください。
            </p>

            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
              <Link
                href="/prints"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-4 text-[15px] sm:text-[14.5px] font-medium text-paper transition duration-300 ease-out min-h-[54px] sm:min-h-0"
                style={{
                  background:
                    "linear-gradient(120deg, #142341 0%, #1e3056 50%, #1f5aa6 100%)",
                }}
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  <FileText className="h-4 w-4 opacity-90" aria-hidden />
                  演習プリントを開く（無料）
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent)] transition-transform duration-700 group-hover:translate-x-full"
                />
              </Link>
              <Link
                href="/teacher#books"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-ink-900/15 bg-white/80 px-6 py-3.5 text-[14.5px] sm:text-[14px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white min-h-[52px] sm:min-h-0"
              >
                <BookOpen className="h-3.5 w-3.5 opacity-70" aria-hidden />
                参考書 6 冊を見る
                <ArrowRight className="h-3.5 w-3.5 opacity-60" />
              </Link>
            </div>

            {/* tiny value-prop strip — プリントの「無料・申込不要・解説あり」を端的に明示 */}
            <ul className="mt-5 sm:mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11.5px] sm:text-[12px] text-ink-600">
              <li className="inline-flex items-center gap-1.5">
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-forest" />
                完全無料・登録不要
              </li>
              <li className="inline-flex items-center gap-1.5">
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                Web で読める / PDF 印刷 OK
              </li>
              <li className="inline-flex items-center gap-1.5">
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-warm-deep" />
                解答・解説までセット
              </li>
            </ul>

            {/* soft path CTA — 体験授業を最弱トーンで残す。プリント・参考書のあとの選択肢として明示 */}
            <p className="mt-4 sm:mt-5 text-[12.5px] sm:text-[13px] text-ink-500 leading-[1.85]">
              それでも 1 問で止まる方には、{" "}
              <Link
                href="/trial"
                className="font-medium text-warm-deep underline decoration-warm/30 underline-offset-[5px] transition hover:decoration-warm-deep"
              >
                60 分の体験授業（¥3,000）
              </Link>
              もあります。
            </p>
          </div>

          {/* REM print mockup — モバイル/PC を 1 つの DOM に統合。
              旧構成: モバイル用と PC 用を別々にマウントしていたため、SVG/HTML を含む
              RemPrintCard が SSR HTML 内に 2 回シリアライズされ、RSC ペイロードを
              ~15KB 余計に増やしていた。1 マウントに統合し、ラッパー側のクラスで
              モバイル横位置 / PC 縦右配置を切り替える。 */}
          <div className="relative mx-auto mt-8 w-full max-w-[360px] sm:mt-10 sm:max-w-[420px] lg:mx-0 lg:mt-0 lg:max-w-[460px]">
            {/* halo — モバイル弱め / PC 強め */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 lg:-inset-10"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,200,148,0.35), transparent 70%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 hidden lg:block"
              style={{
                background:
                  "radial-gradient(closest-side at 30% 80%, rgba(155,188,255,0.4), transparent 70%)",
              }}
            />

            <RemPrintCard />

            {/* floating chips — PC のみ表示（モバイルでは混み合うので非表示） */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-4 top-[42%] hidden lg:inline-flex items-center gap-2 rounded-2xl border border-ink-900/[0.10] bg-white/95 px-3.5 py-2 text-[11px] text-ink-800 shadow-soft"
              style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}
            >
              <span className="text-[9.5px] tracking-[0.22em] text-warm-deep">
                類題
              </span>
              <span className="h-3 w-px bg-ink-900/20" />
              <span className="text-[9.5px] tracking-[0.22em] text-warm-deep">
                解答
              </span>
              <span className="h-3 w-px bg-ink-900/20" />
              <span className="text-[9.5px] tracking-[0.22em] text-warm-deep">
                解説
              </span>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-2 -bottom-3 hidden lg:inline-flex items-center gap-2 rounded-full border border-warm/40 bg-warm-bg/95 px-3.5 py-2 text-[11px] tracking-[0.22em] text-warm-deep shadow-soft"
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-warm/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-warm" />
              </span>
              FREE / PDF & WEB
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
