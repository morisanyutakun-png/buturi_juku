import Link from "next/link";
import { ArrowRight, Atom, Sparkles, Wifi } from "lucide-react";
import { Container } from "@/components/container";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-ink-900/[0.2] bg-ink-950 text-paper">
      {/* full-bleed atmospheric backdrop */}
      <HeroBackdrop />

      <Container className="relative py-24 sm:py-36 lg:py-44">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-paper/20 bg-paper/[0.08] px-3.5 py-1.5 text-[12px] sm:text-[11px] tracking-[0.18em] text-paper/85 backdrop-blur">
              <Atom className="h-3.5 w-3.5 sm:h-3 sm:w-3 text-brand" aria-hidden />
              高校物理専門塾
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-paper/20 bg-paper/[0.08] px-3.5 py-1.5 text-[12px] sm:text-[11px] tracking-[0.18em] text-paper/85 backdrop-blur">
              <Wifi className="h-3.5 w-3.5 sm:h-3 sm:w-3 text-warm" aria-hidden />
              全国オンライン対応
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-paper/20 bg-paper/[0.08] px-3.5 py-1.5 text-[12px] sm:text-[11px] tracking-[0.18em] text-paper/85 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 sm:h-3 sm:w-3 text-gold" aria-hidden />
              初学者 〜 難関大
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-paper/20 bg-ink-950/55 px-3 py-1.5 text-[10.5px] tracking-[0.26em] text-paper/85 backdrop-blur">
              <span className="relative inline-flex h-1.5 w-1.5" aria-hidden>
                <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-warm/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-warm" />
              </span>
              LIVE LESSON
            </span>
          </div>

          <p className="mt-9 sm:mt-10 text-[13px] sm:text-[12px] font-medium tracking-[0.28em] sm:tracking-[0.32em] uppercase text-gold">
            高校物理専門塾「物理の森」
          </p>
          <h1 className="mt-4 font-serif text-display-xl text-paper">
            高校物理が<span className="text-brand">苦手</span>な受験生を、<br className="hidden sm:block" />
            <span className="relative inline-block">
              <span className="text-warm">得点源</span>
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-1 h-[7px] -z-10 rounded-full bg-warm/30"
              />
            </span>
            まで引き上げる。
          </h1>

          <p className="mt-8 sm:mt-9 max-w-xl text-[17px] leading-[2] sm:leading-[1.85] text-paper/85">
            <strong className="text-paper font-medium">高校物理専門塾「{siteConfig.name}」</strong>は、森祐太(名古屋大学 工学部 電気電子情報工学科)が主宰する、全国オンライン対応の高校物理専門塾です。<strong className="text-paper font-medium">『高校物理だけ』を、暗記ではなく構造で教える</strong>ことに特化し、苦手で止まっている人を、得点源まで引き上げます。
          </p>

          <p className="mt-5 text-[12px] sm:text-[11px] leading-[1.9] tracking-[0.18em] sm:tracking-[0.22em] text-paper/55">
            中心読者：高校物理が苦手な高校生・受験生 — 初学者から難関大・医学部まで対応
          </p>

          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
            <Link
              href="/trial"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-warm px-7 py-4 text-[15px] sm:text-[14px] font-medium text-white shadow-warm transition duration-300 ease-out hover:bg-warm-deep min-h-[52px] sm:min-h-0"
            >
              無料体験授業を申し込む
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-paper/25 bg-paper/[0.06] px-7 py-4 text-[15px] sm:text-[14px] text-paper backdrop-blur transition hover:border-paper/45 hover:bg-paper/[0.12] min-h-[52px] sm:min-h-0"
            >
              講座を見る
              <ArrowRight className="h-3.5 w-3.5 opacity-60" />
            </Link>
          </div>

          <dl className="mt-12 sm:mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-paper/15 bg-paper/[0.08] sm:grid-cols-4 backdrop-blur">
            {[
              { k: "指導分野", v: "物理のみ", c: "text-brand" },
              { k: "授業形式", v: "1対1", c: "text-gold" },
              { k: "対応地域", v: "全国", c: "text-paper" },
              { k: "入塾金", v: "0円", c: "text-warm" },
            ].map((item) => (
              <div
                key={item.k}
                className="bg-ink-950/55 px-5 py-6 sm:py-5 backdrop-blur"
              >
                <dt className="text-[11px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.22em] uppercase text-paper/60">
                  {item.k}
                </dt>
                <dd className={`mt-2.5 font-serif text-[1.3rem] sm:text-[1.15rem] tracking-[-0.01em] ${item.c}`}>
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 max-w-xl font-serif text-[1.1rem] sm:text-[1.2rem] leading-[1.7] tracking-[-0.005em] text-paper/85">
            <span className="text-gold">わからない</span>が、
            <span className="text-warm">わかる</span>に変わる瞬間を。
          </p>
          <p className="mt-2 text-[11px] sm:text-[10.5px] tracking-[0.32em] uppercase text-gold/80">
            構造で理解する高校物理専門塾 / Physics Forest
          </p>
        </div>
      </Container>
    </section>
  );
}
