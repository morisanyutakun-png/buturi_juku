import Link from "next/link";
import { ArrowRight, FileText, Sparkles, Wifi } from "lucide-react";
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

      <Container className="relative py-12 sm:py-24 lg:py-40">
        {/* Mobile-first: 単純なブロックフロー。lg+ で 2 カラムグリッドに切替。
            余白・タイポも mobile を default とし、`sm:` `lg:` で desktop に拡張する。 */}
        <div className="lg:grid lg:items-center lg:gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div className="relative">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/[0.10] bg-white/85 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10.5px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.18em] text-ink-700">
                <FileText className="h-3 w-3 text-brand" aria-hidden />
                AI復習プリント付き
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/[0.10] bg-white/85 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10.5px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.18em] text-ink-700">
                <Wifi className="h-3 w-3 text-warm-deep" aria-hidden />
                全国オンライン 1対1
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/[0.10] bg-white/85 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10.5px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.18em] text-ink-700">
                <Sparkles className="h-3 w-3 text-gold-deep" aria-hidden />
                高校物理・理系個別指導
              </span>
            </div>

            <p className="mt-5 sm:mt-10 text-[10.5px] sm:text-[12px] font-medium tracking-[0.18em] sm:tracking-[0.32em] uppercase text-brand-deep">
              {siteConfig.nameEn}
              <span className="hidden sm:inline"> — AI復習プリント付き 理系個別指導</span>
            </p>
            <h1
              className="mt-4 font-serif text-display-2xl text-ink-900"
              style={{ wordBreak: "keep-all", overflowWrap: "break-word", lineBreak: "strict" }}
            >
              <span className="block">解けなかった</span>
              <span className="block">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(120deg, #1f5aa6 0%, #3b7cd9 60%, #6ea8ff 100%)",
                  }}
                >
                  1問
                </span>
                を、
              </span>
              <span className="block">その子専用の</span>
              <span className="block text-ink-900">
                <span className="relative inline-block">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(120deg, #b35f27 0%, #e28040 50%, #f3a86c 100%)",
                    }}
                  >
                    復習プリント
                  </span>
                  <span className="text-ink-900">に。</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-1 h-[10px] -z-10 rounded-full bg-warm/25"
                  />
                </span>
              </span>
            </h1>

            {/* under-the-headline accent rule */}
            <div className="mt-6 sm:mt-8 flex items-center gap-3" aria-hidden>
              <span className="h-px w-10 sm:w-12 bg-ink-900/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-warm" />
              <span className="h-px flex-1 max-w-[10rem] sm:max-w-[12rem] bg-gradient-to-r from-warm/50 via-brand/40 to-transparent" />
            </div>

            {/* モバイルでは 3 行のキー文に分割、デスクトップでは1段落で見せる。 */}
            <div className="mt-5 sm:mt-8 max-w-xl space-y-2.5 sm:space-y-0 sm:hidden">
              <p className="text-[14.5px] leading-[1.85] text-ink-800">
                <strong className="font-medium text-ink-900">{siteConfig.name}</strong> は、高校物理のつまずきを <strong className="font-medium text-ink-900">個別指導 × AI 復習プリント</strong> で修復するオンライン指導です。
              </p>
              <p className="text-[14.5px] leading-[1.85] text-ink-700">
                授業で解けなかった1問を、講師が確認したうえで類題生成 AI「REM」と整理し、復習用 PDF にしてお渡しします。
              </p>
              <p className="text-[14.5px] leading-[1.85] text-ink-700">
                公式暗記ではなく、現象の理解 → 立式 → 演習 → 復習までを一つの流れで。
              </p>
            </div>
            <p className="mt-6 sm:mt-8 max-w-xl text-[17px] leading-[1.85] text-ink-700 hidden sm:block">
              <strong className="text-ink-900 font-medium">{siteConfig.name}</strong>は、高校物理・理系科目のつまずきを、個別指導と <strong className="text-ink-900 font-medium">AI 復習プリント</strong>で修復するオンライン指導サービスです。授業で解けなかった問題をもとに、講師が理解を確認し、類題生成 AI「REM」を活用して類題・解答・復習用 PDF を作成します。<br />
              公式暗記ではなく、現象の理解、立式、演習、復習までを一つの流れで支えます。
            </p>

            <p className="mt-4 sm:mt-5 text-[10.5px] sm:text-[11px] leading-[1.7] sm:leading-[1.85] tracking-[0.1em] sm:tracking-[0.22em] text-ink-500">
              <span className="sm:hidden">高校物理が苦手な高校生・受験生 / 初学者〜難関大対応</span>
              <span className="hidden sm:inline">中心読者：高校物理が苦手な高校生・受験生 — 初学者から難関大・医学部まで対応 / 高校物理 個別指導</span>
            </p>

            <div className="mt-6 sm:mt-12 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
              <Link
                href="/trial"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-4 text-[15px] sm:text-[14px] font-medium text-paper transition duration-300 ease-out min-h-[52px] sm:min-h-0"
                style={{
                  background:
                    "linear-gradient(120deg, #142341 0%, #1e3056 50%, #1f5aa6 100%)",
                }}
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  無料体験を申し込む
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
              className="relative mx-auto mt-7 block w-full overflow-hidden rounded-2xl border border-ink-900/[0.08] bg-gradient-to-b from-white via-warm-bg/30 to-brand-bg/30 p-5 text-center shadow-soft lg:hidden"
              aria-hidden
            >
              <p className="text-[10px] tracking-[0.24em] uppercase text-brand-deep">
                SOLVORA LEARNING LAB
              </p>
              <p className="mt-2 font-serif text-[1.15rem] leading-[1.4] tracking-[-0.012em] text-ink-900">
                解けなかった1問を、復習プリントに。
              </p>
              <ul
                className="mt-3.5 grid grid-cols-2 gap-1.5 font-mono text-[11.5px] text-ink-800"
              >
                <li className="truncate rounded-lg border border-ink-900/[0.10] bg-white/85 px-2.5 py-1.5 text-center">
                  F = ma
                </li>
                <li className="truncate rounded-lg border border-ink-900/[0.10] bg-white/85 px-2.5 py-1.5 text-center">
                  v = f λ
                </li>
                <li className="truncate rounded-lg border border-ink-900/[0.10] bg-white/85 px-2.5 py-1.5 text-center">
                  ε = − dΦ/dt
                </li>
                <li className="truncate rounded-lg border border-ink-900/[0.10] bg-white/85 px-2.5 py-1.5 text-center">
                  E₁ = E₂
                </li>
              </ul>
              <p className="mt-3 text-[10.5px] tracking-[0.18em] uppercase text-gold-deep">
                TRIAL · 60 MIN
              </p>
            </div>

            <ul className="mx-auto mt-7 sm:mt-16 grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-900/[0.10] bg-ink-900/[0.06] sm:grid-cols-4">
              {[
                { k: "指導分野", v: "高校物理 / 理系", c: "text-brand-deep" },
                { k: "授業形式", v: "1対1", c: "text-ink-800" },
                { k: "対応地域", v: "全国オンライン", c: "text-brand-deep" },
                { k: "入塾金", v: "0円", c: "text-warm-deep" },
              ].map((item) => (
                <li
                  key={item.k}
                  className="bg-white/85 px-3 py-4 text-center sm:px-5 sm:py-5 sm:text-left"
                >
                  <p className="text-[9.5px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.22em] uppercase text-ink-500">
                    {item.k}
                  </p>
                  <p className={`mt-1.5 sm:mt-2 font-serif text-[0.95rem] sm:text-[1.05rem] tracking-[-0.01em] ${item.c}`}>
                    {item.v}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-2.5 sm:mt-3 max-w-xl text-[10.5px] sm:text-[12px] leading-[1.7] sm:leading-[1.85] text-ink-500">
              ※ 力学・電磁気・波動・熱力学・原子をはじめ、理系科目は段階的に拡張予定。
            </p>

            <p className="mt-7 sm:mt-9 max-w-xl font-serif text-[1.05rem] sm:text-[1.35rem] leading-[1.65] sm:leading-[1.7] tracking-[-0.005em] text-ink-700">
              <span className="text-brand-deep">解けなかった</span>が、
              <span className="text-warm-deep">次に解ける</span>に変わる仕組みを。
            </p>
            <p className="mt-2 text-[9.5px] sm:text-[10.5px] tracking-[0.18em] sm:tracking-[0.32em] uppercase text-gold-deep">
              {siteConfig.name} / 高校物理・理系個別指導
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
