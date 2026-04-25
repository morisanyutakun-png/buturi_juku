import Link from "next/link";
import { ArrowRight, Atom, Sparkles, Wifi } from "lucide-react";
import { Container } from "@/components/container";
import { PhysicsOrbital, PhysicsWave } from "@/components/physics-visual";
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

      <Container className="relative py-24 sm:py-32 lg:py-40">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/[0.08] bg-white/70 px-3 py-1 text-[11px] tracking-[0.18em] text-ink-700 backdrop-blur">
                <Atom className="h-3 w-3 text-brand" aria-hidden />
                高校物理専門塾
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/[0.08] bg-white/70 px-3 py-1 text-[11px] tracking-[0.18em] text-ink-700 backdrop-blur">
                <Wifi className="h-3 w-3 text-warm-deep" aria-hidden />
                全国オンライン対応
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/[0.08] bg-white/70 px-3 py-1 text-[11px] tracking-[0.18em] text-ink-700 backdrop-blur">
                <Sparkles className="h-3 w-3 text-forest-deep" aria-hidden />
                初学者 〜 難関大
              </span>
            </div>

            <p className="mt-10 text-[12px] font-medium tracking-[0.32em] uppercase text-brand-deep">
              高校物理専門塾「物理の森」
            </p>
            <h1 className="mt-3 font-serif text-display-xl text-ink-900">
              高校物理を、<span className="text-brand">暗記</span>ではなく<br className="hidden sm:block" />
              <span className="relative inline-block">
                <span className="text-warm">理解</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-1 h-[7px] -z-10 rounded-full bg-warm/20"
                />
              </span>
              へ。
            </h1>

            <p className="mt-9 max-w-xl text-[17px] leading-[1.75] text-ink-700">
              <strong className="text-ink-900 font-medium">高校物理専門塾「{siteConfig.name}」</strong>は、森祐太(名古屋大学 工学部 電気電子情報工学科)が主宰する、全国オンライン対応の高校物理専門塾です。<strong className="text-ink-900 font-medium">高校物理が初めての人も、難関大の大学受験物理を目指す人も</strong>。あなたのレベルに合わせて、高校物理を一から丁寧に組み立て直します。
            </p>

            <p className="mt-4 text-[11px] tracking-[0.22em] text-ink-500">
              初学者 / 中堅大 / 難関大 / 医学部 / 独学者 — みんなウェルカム
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-3">
              <Link
                href="/trial"
                className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-7 py-4 text-[14px] font-medium text-paper transition duration-300 ease-out hover:bg-ink-800"
              >
                無料体験授業を申し込む
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-full border border-ink-900/[0.12] bg-white/70 px-7 py-4 text-[14px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white"
              >
                講座を見る
                <ArrowRight className="h-3.5 w-3.5 opacity-50" />
              </Link>
            </div>

            <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-900/[0.08] bg-ink-900/[0.06] sm:grid-cols-4">
              {[
                { k: "指導分野", v: "物理のみ", c: "text-brand-deep" },
                { k: "授業形式", v: "1対1", c: "text-forest-deep" },
                { k: "対応地域", v: "全国", c: "text-brand-deep" },
                { k: "入塾金", v: "0円", c: "text-warm-deep" },
              ].map((item) => (
                <div
                  key={item.k}
                  className="bg-white/85 px-5 py-5 backdrop-blur"
                >
                  <dt className="text-[10px] tracking-[0.22em] uppercase text-ink-500">
                    {item.k}
                  </dt>
                  <dd className={`mt-2 font-serif text-[1.15rem] tracking-[-0.01em] ${item.c}`}>
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto hidden aspect-square w-full max-w-[520px] lg:block">
            <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-white via-brand-bg/60 to-paper-soft ring-1 ring-ink-900/[0.08] shadow-elevate" />
            <PhysicsOrbital className="absolute inset-0" />

            <div className="absolute left-7 top-7 inline-flex items-center gap-2 rounded-full border border-ink-900/[0.08] bg-white/85 px-3 py-1.5 text-[10px] tracking-[0.26em] text-ink-700 shadow-soft backdrop-blur-md">
              <span className="relative inline-flex h-1.5 w-1.5" aria-hidden>
                <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-warm/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-warm" />
              </span>
              LIVE LESSON
            </div>

            <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-ink-900/[0.08] bg-white/90 p-6 shadow-soft backdrop-blur-md">
              <p className="text-[10px] tracking-[0.28em] uppercase text-warm-deep">
                FIRST 30 MIN
              </p>
              <p className="mt-2.5 font-serif text-[1.05rem] tracking-[-0.005em] text-ink-900">
                現状ヒアリングから始まる、体験授業
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-ink-600">
                <span className="h-1 w-1 rounded-full bg-forest" />
                模試 / 志望校 / 教材 / つまずき
              </div>
            </div>
          </div>
        </div>
      </Container>

      <PhysicsWave className="absolute bottom-0 left-0 right-0 h-20 opacity-40" />
    </section>
  );
}
