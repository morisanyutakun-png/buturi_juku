import Link from "next/link";
import { ArrowRight, Atom, Sparkles, Wifi } from "lucide-react";
import { Container } from "@/components/container";
import { PhysicsWave } from "@/components/physics-visual";
import { BrandVision } from "@/components/brand-vision";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-ink-900/[0.06]">
      {/* refined ambient gradient field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[-12%] top-[-22%] h-[36rem] w-[36rem] rounded-full bg-brand/12 blur-[120px]" />
        <div className="absolute right-[-12%] top-[18%] h-[30rem] w-[30rem] rounded-full bg-warm/15 blur-[120px]" />
        <div className="absolute bottom-[-22%] left-[28%] h-[26rem] w-[26rem] rounded-full bg-forest/12 blur-[120px]" />
      </div>

      {/* ambient formula constellation */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none leading-none text-ink-900/[0.045] hidden sm:block"
        style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}
      >
        <p className="absolute left-[3%] top-[12%] text-[5.5rem] tracking-[-0.01em]">F = ma</p>
        <p className="absolute right-[6%] top-[8%] text-[4.5rem] tracking-[-0.01em]">E = mc²</p>
        <p className="absolute left-[42%] top-[6%] text-[3.6rem] tracking-[-0.01em]">v = f λ</p>
        <p className="absolute left-[6%] bottom-[18%] text-[5rem] tracking-[-0.01em]">∮ E · dA = Q / ε₀</p>
        <p className="absolute right-[10%] bottom-[10%] text-[4.2rem] tracking-[-0.01em]">∇ × B = μ₀ J</p>
        <p className="absolute left-[36%] bottom-[6%] text-[3.4rem] tracking-[-0.01em]">pV = nRT</p>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none leading-none text-ink-900/[0.05] sm:hidden"
        style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}
      >
        <p className="absolute right-[4%] top-[10%] text-[3rem]">F = ma</p>
        <p className="absolute left-[4%] bottom-[14%] text-[2.6rem]">∮ E · dA</p>
      </div>

      <Container className="relative py-20 sm:py-32 lg:py-40">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/[0.08] bg-white/70 px-3.5 py-1.5 text-[12px] sm:text-[11px] tracking-[0.18em] text-ink-700 backdrop-blur">
                <Atom className="h-3.5 w-3.5 sm:h-3 sm:w-3 text-brand" aria-hidden />
                高校物理専門塾
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/[0.08] bg-white/70 px-3.5 py-1.5 text-[12px] sm:text-[11px] tracking-[0.18em] text-ink-700 backdrop-blur">
                <Wifi className="h-3.5 w-3.5 sm:h-3 sm:w-3 text-warm-deep" aria-hidden />
                全国オンライン対応
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/[0.08] bg-white/70 px-3.5 py-1.5 text-[12px] sm:text-[11px] tracking-[0.18em] text-ink-700 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 sm:h-3 sm:w-3 text-forest-deep" aria-hidden />
                初学者 〜 難関大
              </span>
            </div>

            <p className="mt-9 sm:mt-10 text-[13px] sm:text-[12px] font-medium tracking-[0.28em] sm:tracking-[0.32em] uppercase text-brand-deep">
              高校物理専門塾「物理の森」
            </p>
            <h1 className="mt-4 font-serif text-display-xl text-ink-900">
              高校物理が<span className="text-brand">苦手</span>な受験生を、<br className="hidden sm:block" />
              <span className="relative inline-block">
                <span className="text-warm">得点源</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-1 h-[7px] -z-10 rounded-full bg-warm/20"
                />
              </span>
              まで引き上げる。
            </h1>

            <p className="mt-8 sm:mt-9 max-w-xl text-[17px] sm:text-[17px] leading-[2] sm:leading-[1.75] text-ink-700">
              <strong className="text-ink-900 font-medium">高校物理専門塾「{siteConfig.name}」</strong>は、森祐太(名古屋大学 工学部 電気電子情報工学科)が主宰する、全国オンライン対応の高校物理専門塾です。<strong className="text-ink-900 font-medium">『高校物理だけ』を、暗記ではなく構造で教える</strong>ことに特化し、苦手で止まっている人を、得点源まで引き上げます。
            </p>

            <p className="mt-5 text-[12px] sm:text-[11px] leading-[1.9] tracking-[0.18em] sm:tracking-[0.22em] text-ink-500">
              中心読者：高校物理が苦手な高校生・受験生 — 初学者から難関大・医学部まで対応
            </p>

            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
              <Link
                href="/trial"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-ink-900 px-7 py-4 text-[15px] sm:text-[14px] font-medium text-paper transition duration-300 ease-out hover:bg-ink-800 min-h-[52px] sm:min-h-0"
              >
                無料体験授業を申し込む
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-ink-900/[0.12] bg-white/70 px-7 py-4 text-[15px] sm:text-[14px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white min-h-[52px] sm:min-h-0"
              >
                講座を見る
                <ArrowRight className="h-3.5 w-3.5 opacity-50" />
              </Link>
            </div>

            <div className="mt-10 lg:hidden">
              <BrandVision />
            </div>

            <dl className="mt-12 sm:mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-900/[0.08] bg-ink-900/[0.06] sm:grid-cols-4">
              {[
                { k: "指導分野", v: "物理のみ", c: "text-brand-deep" },
                { k: "授業形式", v: "1対1", c: "text-forest-deep" },
                { k: "対応地域", v: "全国", c: "text-brand-deep" },
                { k: "入塾金", v: "0円", c: "text-warm-deep" },
              ].map((item) => (
                <div
                  key={item.k}
                  className="bg-white/85 px-5 py-6 sm:py-5 backdrop-blur"
                >
                  <dt className="text-[11px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.22em] uppercase text-ink-500">
                    {item.k}
                  </dt>
                  <dd className={`mt-2.5 font-serif text-[1.3rem] sm:text-[1.15rem] tracking-[-0.01em] ${item.c}`}>
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto hidden w-full max-w-[640px] lg:block">
            <BrandVision />

            <div className="pointer-events-none absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-paper/20 bg-ink-950/65 px-3 py-1.5 text-[10px] tracking-[0.26em] text-paper backdrop-blur-md">
              <span className="relative inline-flex h-1.5 w-1.5" aria-hidden>
                <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-warm/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-warm" />
              </span>
              LIVE LESSON
            </div>
          </div>
        </div>
      </Container>

      <PhysicsWave className="absolute bottom-0 left-0 right-0 h-20 opacity-40" />
    </section>
  );
}
