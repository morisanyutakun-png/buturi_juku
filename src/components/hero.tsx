import Link from "next/link";
import { ArrowRight, Atom, Sparkles, Wifi } from "lucide-react";
import { Container } from "@/components/container";
import {
  PhysicsOrbital,
  PhysicsWave,
} from "@/components/physics-visual";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-ink-900/5 bg-paper">
      {/* soft gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[-10%] top-[-20%] h-[32rem] w-[32rem] rounded-full bg-brand/15 blur-[100px]" />
        <div className="absolute right-[-10%] top-[20%] h-[28rem] w-[28rem] rounded-full bg-warm/20 blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[30%] h-[24rem] w-[24rem] rounded-full bg-forest/15 blur-[100px]" />
      </div>

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-bg px-3 py-1 text-xs tracking-[0.18em] text-brand-deep">
                <Atom className="h-3 w-3" aria-hidden />
                物理専門
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-warm/40 bg-warm-bg px-3 py-1 text-xs tracking-[0.18em] text-warm-deep">
                <Wifi className="h-3 w-3" aria-hidden />
                全国オンライン対応
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-forest/30 bg-forest-bg px-3 py-1 text-xs tracking-[0.18em] text-forest-deep">
                <Sparkles className="h-3 w-3" aria-hidden />
                初学者 〜 難関大
              </span>
            </div>

            <h1 className="mt-8 font-serif text-display-lg text-ink-900">
              物理を、<span className="text-brand">暗記</span>ではなく<br className="hidden sm:block" />
              <span className="relative inline-block">
                <span className="text-warm">理解</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-1 h-[6px] -z-10 bg-warm/25 rounded-full"
                />
              </span>
              へ。
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-700 sm:text-lg">
              <strong className="text-ink-900">「{siteConfig.name}」</strong>は、森祐太(名古屋大学 工学部 電気電子情報工学科)が主宰するオンライン物理専門塾です。
              <strong className="text-ink-900">物理が初めての人も、難関大を目指す人も</strong>。あなたのレベルに合わせて、物理を一から丁寧に組み立て直します。
            </p>

            <p className="mt-3 text-xs tracking-[0.2em] text-ink-500">
              初学者 / 中堅大 / 難関大 / 医学部 / 独学者 — みんなウェルカム
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/trial"
                className="group inline-flex items-center gap-2 rounded-full bg-warm px-6 py-3.5 text-sm font-medium text-white shadow-warm transition hover:bg-warm-deep"
              >
                無料体験授業を申し込む
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-white px-6 py-3.5 text-sm text-ink-800 hover:border-brand hover:text-brand transition"
              >
                講座を見る
              </Link>
            </div>

            <dl className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { k: "指導分野", v: "物理のみ", c: "text-brand" },
                { k: "授業形式", v: "1対1", c: "text-forest-deep" },
                { k: "対応地域", v: "全国", c: "text-brand" },
                { k: "入塾金", v: "0円", c: "text-warm-deep" },
              ].map((item) => (
                <div
                  key={item.k}
                  className="rounded-xl border border-ink-900/10 bg-white px-4 py-4 shadow-soft"
                >
                  <dt className="text-[10px] tracking-[0.25em] uppercase text-ink-500">
                    {item.k}
                  </dt>
                  <dd className={`mt-1.5 font-serif text-lg ${item.c}`}>
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto hidden aspect-square w-full max-w-[480px] lg:block">
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white via-brand-bg to-paper-soft ring-1 ring-ink-900/10 shadow-card" />
            <PhysicsOrbital className="absolute inset-0" />

            <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-ink-900/10 bg-white/90 px-3 py-1.5 text-[10px] tracking-[0.26em] text-ink-700 backdrop-blur">
              <span
                className="relative inline-flex h-2 w-2"
                aria-hidden
              >
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-warm/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-warm" />
              </span>
              ZOOM LIVE LESSON
            </div>

            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-ink-900/10 bg-white/95 p-5 shadow-soft backdrop-blur">
              <p className="text-[10px] tracking-[0.28em] uppercase text-warm-deep">
                NOW STREAMING
              </p>
              <p className="mt-2 font-serif text-ink-900">
                電磁気 #03:電場とガウスの法則
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-ink-600">
                <span className="h-1.5 w-1.5 rounded-full bg-forest" />
                現象の言語化 → 立式 → 演習
              </div>
            </div>
          </div>
        </div>
      </Container>

      <PhysicsWave className="absolute bottom-0 left-0 right-0 h-20 opacity-50" />
    </section>
  );
}
