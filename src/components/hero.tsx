import Link from "next/link";
import { ArrowRight, Atom, Sparkles, Wifi } from "lucide-react";
import { Container } from "@/components/container";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { HeroVisual } from "@/components/hero-visual";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-ink-900/[0.06]">
      {/* full-bleed pastel backdrop */}
      <HeroBackdrop />

      {/* diagonal light beams — desktop only; phones already have enough atmosphere
          and these are pure paint cost on small viewports */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 -top-1/2 hidden h-[200%] w-[60%] rotate-[24deg] opacity-50 sm:block"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1/3 -top-1/2 hidden h-[200%] w-[55%] -rotate-[18deg] opacity-35 sm:block"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(251,221,196,0.7), transparent)",
        }}
      />

      {/* HUGE watermark kanji behind everything (left edge, bleed off) */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[6vw] top-[14%] hidden select-none font-serif leading-[0.8] tracking-[-0.05em] text-warm-deep/[0.07] lg:block"
        style={{ fontSize: "clamp(20rem, 36vw, 44rem)" }}
      >
        森
      </span>
      {/* Mobile watermark — sized to vw and clipped at parent overflow-hidden */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[14vw] top-[18%] select-none font-serif leading-[0.8] tracking-[-0.05em] text-brand-deep/[0.06] lg:hidden"
        style={{ fontSize: "min(60vw, 18rem)" }}
      >
        森
      </span>

      <Container className="relative py-16 sm:py-24 lg:py-40">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div className="relative">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/[0.10] bg-white/85 px-3 py-1.5 text-[11.5px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.18em] text-ink-700">
                <Atom className="h-3 w-3 sm:h-3 sm:w-3 text-brand" aria-hidden />
                高校物理専門塾
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/[0.10] bg-white/85 px-3 py-1.5 text-[11.5px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.18em] text-ink-700">
                <Wifi className="h-3 w-3 sm:h-3 sm:w-3 text-warm-deep" aria-hidden />
                全国オンライン
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/[0.10] bg-white/85 px-3 py-1.5 text-[11.5px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.18em] text-ink-700">
                <Sparkles className="h-3 w-3 sm:h-3 sm:w-3 text-gold-deep" aria-hidden />
                初学者〜難関大
              </span>
            </div>

            <p className="mt-7 sm:mt-10 text-[12px] sm:text-[12px] font-medium tracking-[0.22em] sm:tracking-[0.32em] uppercase text-brand-deep">
              高校物理専門塾「物理の森」
            </p>
            <h1
              className="mt-4 font-serif text-display-2xl text-ink-900"
              style={{ wordBreak: "keep-all", overflowWrap: "break-word", lineBreak: "strict" }}
            >
              <span className="block">
                高校物理が
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(120deg, #1f5aa6 0%, #3b7cd9 60%, #6ea8ff 100%)",
                  }}
                >
                  苦手
                </span>
                な
              </span>
              <span className="block">受験生を、</span>
              <span className="block">
                <span
                  className="relative inline-block bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(120deg, #b35f27 0%, #e28040 50%, #f3a86c 100%)",
                  }}
                >
                  得点源
                </span>
                <span className="text-ink-900">まで</span>
              </span>
              <span className="block text-ink-900">
                <span className="relative inline-block">
                  引き上げる。
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-1 h-[10px] -z-10 rounded-full bg-warm/25"
                  />
                </span>
              </span>
            </h1>

            {/* under-the-headline accent rule */}
            <div className="mt-8 flex items-center gap-3" aria-hidden>
              <span className="h-px w-12 bg-ink-900/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-warm" />
              <span className="h-px flex-1 max-w-[12rem] bg-gradient-to-r from-warm/50 via-brand/40 to-transparent" />
            </div>

            <p className="mt-6 sm:mt-8 max-w-xl text-[15.5px] sm:text-[17px] leading-[1.9] sm:leading-[1.85] text-ink-700">
              <strong className="text-ink-900 font-medium">高校物理専門塾「{siteConfig.name}」</strong>は、森祐太(名古屋大学 工学部 電気電子情報工学科)が主宰する、全国オンライン対応の高校物理専門塾です。<strong className="text-ink-900 font-medium">『高校物理だけ』を、暗記ではなく構造で教える</strong>ことに特化し、苦手で止まっている人を、得点源まで引き上げます。
            </p>

            <p className="mt-4 sm:mt-5 text-[11px] sm:text-[11px] leading-[1.85] tracking-[0.14em] sm:tracking-[0.22em] text-ink-500">
              中心読者：高校物理が苦手な高校生・受験生 — 初学者から難関大・医学部まで対応
            </p>

            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
              <Link
                href="/trial"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-4 text-[15px] sm:text-[14px] font-medium text-paper transition duration-300 ease-out min-h-[52px] sm:min-h-0"
                style={{
                  background:
                    "linear-gradient(120deg, #142341 0%, #1e3056 50%, #1f5aa6 100%)",
                }}
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  無料体験授業を申し込む
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent)] transition-transform duration-700 group-hover:translate-x-full"
                />
              </Link>
              <Link
                href="/courses"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-ink-900/[0.14] bg-white/75 px-7 py-4 text-[15px] sm:text-[14px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white min-h-[52px] sm:min-h-0"
              >
                講座を見る
                <ArrowRight className="h-3.5 w-3.5 opacity-50" />
              </Link>
            </div>

            {/* Lightweight mobile hero card — replaces the full HeroVisual SVG
                on phones for faster LCP / smaller DOM. */}
            <div
              className="relative mt-9 overflow-hidden rounded-3xl border border-ink-900/[0.08] bg-gradient-to-br from-white via-warm-bg/45 to-brand-bg/45 p-6 shadow-soft lg:hidden"
              aria-hidden
            >
              <span
                className="pointer-events-none absolute -right-4 -bottom-10 select-none font-serif text-[10rem] leading-[0.8] tracking-tighter text-warm-deep/[0.10]"
              >
                森
              </span>
              <p className="relative text-[10px] tracking-[0.28em] uppercase text-brand-deep">
                MORI PHYSICS FOREST
              </p>
              <p className="relative mt-2.5 font-serif text-[1.3rem] leading-[1.45] tracking-[-0.012em] text-ink-900">
                高校物理を、構造で。
              </p>
              <ul
                className="relative mt-4 grid grid-cols-2 gap-2 font-mono text-[12.5px] text-ink-800"
              >
                <li className="truncate rounded-xl border border-ink-900/[0.10] bg-white/85 px-3 py-2">
                  F = ma
                </li>
                <li className="truncate rounded-xl border border-ink-900/[0.10] bg-white/85 px-3 py-2">
                  v = f λ
                </li>
                <li className="truncate rounded-xl border border-ink-900/[0.10] bg-white/85 px-3 py-2">
                  ε = − dΦ/dt
                </li>
                <li className="truncate rounded-xl border border-ink-900/[0.10] bg-white/85 px-3 py-2">
                  E₁ = E₂
                </li>
              </ul>
              <p className="relative mt-4 text-[11px] tracking-[0.22em] uppercase text-gold-deep">
                FREE TRIAL · 60 MIN
              </p>
            </div>

            <ul className="mt-10 sm:mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-900/[0.10] bg-ink-900/[0.06] sm:grid-cols-4">
              {[
                { k: "指導分野", v: "物理のみ", c: "text-brand-deep" },
                { k: "授業形式", v: "1対1", c: "text-forest-deep" },
                { k: "対応地域", v: "全国", c: "text-brand-deep" },
                { k: "入塾金", v: "0円", c: "text-warm-deep" },
              ].map((item) => (
                <li
                  key={item.k}
                  className="bg-white/85 px-4 py-5 sm:px-5 sm:py-5"
                >
                  <p className="text-[10.5px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.22em] uppercase text-ink-500">
                    {item.k}
                  </p>
                  <p className={`mt-2 font-serif text-[1.2rem] sm:text-[1.15rem] tracking-[-0.01em] ${item.c}`}>
                    {item.v}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-9 max-w-xl font-serif text-[1.15rem] sm:text-[1.35rem] leading-[1.7] tracking-[-0.005em] text-ink-700">
              <span className="text-brand-deep">わからない</span>が、
              <span className="text-warm-deep">わかる</span>に変わる瞬間を。
            </p>
            <p className="mt-2 text-[10.5px] sm:text-[10.5px] tracking-[0.24em] sm:tracking-[0.32em] uppercase text-gold-deep">
              構造で理解する高校物理専門塾 / Physics Forest
            </p>
          </div>

          {/* RIGHT: bright illustrated card */}
          <div className="relative mx-auto hidden w-full max-w-[560px] lg:block">
            <HeroVisual />

            {/* Decorative scattered chips around the visual */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-6 -top-4 inline-flex items-center gap-2 rounded-full border border-ink-900/[0.10] bg-white/90 px-3.5 py-2 text-[11px] tracking-[0.22em] text-brand-deep shadow-soft"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              FREE TRIAL · 60 MIN
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-3 bottom-10 inline-flex items-center gap-2 rounded-full border border-warm/35 bg-warm-bg/95 px-3.5 py-2 text-[11px] tracking-[0.22em] text-warm-deep shadow-soft"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-warm" />
              月 ¥38,000〜
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
