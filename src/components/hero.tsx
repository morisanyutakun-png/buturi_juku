import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/container";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { RemPrintCard } from "@/components/rem-print-card";
import { siteConfig } from "@/data/site";

/**
 * Hero（FV）— モバイル第一の高凝縮版。
 * H1 + サブ + 本文1段落 + CTA2つ。それ以外（badges / stats / formula chip）は撤去。
 * モバイル広告流入が中心で、3秒判断 → スクロールで深掘り、という設計。
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
                AI 復習プリント付
              </span>
            </div>

            <h1
              className="mt-4 sm:mt-5 font-serif text-[2.05rem] leading-[1.18] tracking-[-0.02em] text-ink-900 sm:text-[3.3rem] sm:leading-[1.12] lg:text-[4.1rem] lg:leading-[1.06]"
              style={{
                wordBreak: "keep-all",
                overflowWrap: "break-word",
                lineBreak: "strict",
              }}
            >
              <span className="block">解けなかった<span className="text-brand-deep">1問</span>を、</span>
              <span className="block">
                <span className="relative inline-block">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(120deg, #b35f27 0%, #e28040 50%, #f3a86c 100%)",
                    }}
                  >
                    専用の復習プリント
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-1 h-[8px] sm:h-[10px] -z-10 rounded-full bg-warm/25"
                  />
                </span>
                に。
              </span>
            </h1>

            {/* formula display — visual hook echoing the print */}
            <div className="mt-5 sm:mt-7 inline-flex items-center gap-3 rounded-2xl border border-ink-900/[0.10] bg-white/85 px-4 py-3 shadow-soft backdrop-blur">
              <span
                className="font-serif italic text-[1.15rem] sm:text-[1.35rem] tracking-tight text-ink-900"
                style={{ fontFamily: "'Times New Roman', serif" }}
              >
                F = −kx
              </span>
              <span className="hidden h-4 w-px bg-ink-900/15 sm:inline-block" />
              <span className="text-[12px] sm:text-[13px] text-ink-700">
                の意味から、解ける形へ。
              </span>
            </div>

            <p className="mt-5 sm:mt-6 max-w-xl text-[13.5px] sm:text-[15.5px] leading-[1.85] sm:leading-[1.85] text-ink-700">
              高校物理専門のオンライン個別指導。授業で詰まった問題を、
              <strong className="font-medium text-ink-900">森祐太</strong>が原因分析し、
              <strong className="font-medium text-ink-900">AI復習プリント</strong>で
              次に解ける形へ整えます。
            </p>

            {/* checkmark bullets — atmosphere from the attached print LP */}
            <ul className="mt-5 sm:mt-6 space-y-2 text-[13px] sm:text-[14px] text-ink-800">
              {[
                "つまずきの原因を、講師が言語化",
                "類題 + 解答 + 解説を AI（REM）で生成",
                "次回授業の冒頭で、再確認",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <span className="mt-[3px] inline-flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-brand/10 ring-1 ring-brand/35">
                    <Check className="h-3 w-3 text-brand-deep" strokeWidth={2.6} />
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
              <Link
                href="/contact?topic=trial#contact-form"
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
                href="/courses"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-ink-900/15 bg-white/80 px-6 py-3.5 text-[14.5px] sm:text-[14px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white min-h-[52px] sm:min-h-0"
              >
                講座料金を見る
                <ArrowRight className="h-3.5 w-3.5 opacity-60" />
              </Link>
            </div>
          </div>

          {/* RIGHT: REM print mockup — desktop only */}
          <div className="relative mx-auto mt-10 hidden w-full max-w-[460px] lg:mt-0 lg:block">
            {/* glowy halo behind print */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,200,148,0.45), transparent 65%), radial-gradient(closest-side at 30% 80%, rgba(155,188,255,0.4), transparent 70%)",
              }}
            />

            <RemPrintCard />

            {/* floating chips around the print */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-4 top-[42%] inline-flex items-center gap-2 rounded-2xl border border-ink-900/[0.10] bg-white/95 px-3.5 py-2 text-[11px] text-ink-800 shadow-soft"
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
              className="pointer-events-none absolute -right-2 -bottom-3 inline-flex items-center gap-2 rounded-full border border-warm/40 bg-warm-bg/95 px-3.5 py-2 text-[11px] tracking-[0.22em] text-warm-deep shadow-soft"
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-warm/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-warm" />
              </span>
              60 MIN TRIAL
            </div>
          </div>

          {/* MOBILE preview — compact print under the headline (sm only) */}
          <div className="mx-auto mt-8 block w-full max-w-[360px] sm:mt-10 sm:max-w-[420px] lg:hidden">
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 -z-10"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(255,200,148,0.35), transparent 70%)",
                }}
              />
              <RemPrintCard />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
