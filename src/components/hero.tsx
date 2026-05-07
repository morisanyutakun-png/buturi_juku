import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { HeroVisual } from "@/components/hero-visual";
import { siteConfig } from "@/data/site";

/**
 * Hero（FV）— モバイル第一の高凝縮版。
 * 訴求は「H1 + サブコピー + 単一 CTA」のみ。
 * 詳細（badges / stats / formula card）は撤去し、直下の「実績ストリップ」と
 * 「悩み」セクションに役割を委譲する。
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-ink-900/[0.06]">
      <HeroBackdrop />

      {/* desktop-only diagonal beams（雰囲気） */}
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

      <Container className="relative py-12 sm:py-20 lg:py-32">
        <div className="lg:grid lg:items-center lg:gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative">
            <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.18em] sm:tracking-[0.3em] uppercase text-brand-deep">
              {siteConfig.nameEn}
            </p>

            <h1
              className="mt-4 sm:mt-5 font-serif text-[2.1rem] leading-[1.2] tracking-[-0.018em] text-ink-900 sm:text-[3.2rem] sm:leading-[1.15] lg:text-[4rem] lg:leading-[1.1]"
              style={{
                wordBreak: "keep-all",
                overflowWrap: "break-word",
                lineBreak: "strict",
              }}
            >
              <span className="block">解けなかった<span className="text-brand-deep">1問</span>を、</span>
              <span className="block">
                次に
                <span className="relative inline-block">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(120deg, #b35f27 0%, #e28040 50%, #f3a86c 100%)",
                    }}
                  >
                    解ける
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-1 h-[8px] sm:h-[10px] -z-10 rounded-full bg-warm/25"
                  />
                </span>
                問題へ。
              </span>
            </h1>

            <p className="mt-5 sm:mt-7 max-w-xl text-[14.5px] sm:text-[17px] leading-[1.85] sm:leading-[1.85] text-ink-700">
              高校物理専門のオンライン個別指導。
              <br />
              <strong className="font-medium text-ink-900">AI復習プリント付き</strong>で、苦手を次回までに潰します。
            </p>

            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
              <Link
                href="/trial"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-4 text-[15px] sm:text-[14.5px] font-medium text-paper transition duration-300 ease-out min-h-[54px] sm:min-h-0"
                style={{
                  background:
                    "linear-gradient(120deg, #142341 0%, #1e3056 50%, #1f5aa6 100%)",
                }}
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  体験授業を申し込む
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent)] transition-transform duration-700 group-hover:translate-x-full"
                />
              </Link>
              <Link
                href="#proof"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-full px-5 py-3 text-[13.5px] sm:text-[13px] text-ink-700 transition hover:text-ink-900 sm:underline-offset-4 sm:hover:underline"
              >
                講師の実績を見る
                <ArrowRight className="h-3.5 w-3.5 opacity-50" />
              </Link>
            </div>
          </div>

          {/* RIGHT: hero visual — desktop only */}
          <div className="relative mx-auto mt-10 hidden w-full max-w-[520px] lg:mt-0 lg:block">
            <HeroVisual />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-6 -top-4 inline-flex items-center gap-2 rounded-full border border-ink-900/[0.10] bg-white/90 px-3.5 py-2 text-[11px] tracking-[0.22em] text-brand-deep shadow-soft"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              TRIAL · 60 MIN
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-3 bottom-10 inline-flex items-center gap-2 rounded-full border border-warm/35 bg-warm-bg/95 px-3.5 py-2 text-[11px] tracking-[0.22em] text-warm-deep shadow-soft"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-warm" />
              AI復習プリント付き
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
