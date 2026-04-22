import Link from "next/link";
import { ArrowRight, Atom, Monitor, Wifi } from "lucide-react";
import { BackgroundGrid } from "@/components/background-grid";
import { Container } from "@/components/container";
import {
  PhysicsFormula,
  PhysicsOrbital,
  PhysicsWave,
} from "@/components/physics-visual";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-paper/5 bg-ink-950">
      <BackgroundGrid variant="hero" />
      <PhysicsFormula className="absolute top-20 left-[-2%] hidden text-[7rem] lg:block" />
      <PhysicsFormula className="absolute bottom-20 right-[-2%] hidden text-[5rem] lg:block" />

      <Container className="relative py-20 sm:py-28 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs tracking-[0.2em] text-accent">
                <Atom className="h-3 w-3" aria-hidden />
                PHYSICS ONLY
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs tracking-[0.2em] text-gold">
                <Wifi className="h-3 w-3" aria-hidden />
                全国オンライン対応
              </span>
            </div>

            <h1 className="mt-8 font-serif text-display-lg text-paper">
              物理を、<span className="text-accent">暗記</span>ではなく
              <br className="hidden sm:block" />
              <span className="relative inline-block">
                <span className="text-gold">理解</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-2 h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0"
                />
              </span>
              へ。
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-paper/75 sm:text-lg">
              {siteConfig.name} は、<strong className="text-paper">高校物理だけ</strong>を扱う完全オンライン専門塾です。
              <strong className="text-paper">物理が初めての人も、難関大を目指す人も</strong>。
              名古屋大学 工学部所属の主宰講師が、あなたのレベルに合わせて物理を一から組み立て直します。
            </p>

            <p className="mt-4 text-xs tracking-[0.2em] uppercase text-paper/40">
              初学者 / 中堅大 / 難関大 / 医学部 / 独学者 — すべて歓迎
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/trial"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-ink-950 shadow-[0_10px_40px_-10px_rgba(110,168,255,0.6)] transition hover:bg-accent-soft"
              >
                無料体験授業を申し込む
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-6 py-3.5 text-sm text-paper hover:border-accent hover:text-accent transition"
              >
                講座を見る
              </Link>
            </div>

            <dl className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { k: "指導分野", v: "物理のみ" },
                { k: "授業形式", v: "1対1" },
                { k: "対応地域", v: "全国" },
                { k: "入塾金", v: "0円" },
              ].map((item) => (
                <div
                  key={item.k}
                  className="rounded-xl border border-paper/10 bg-ink-900/60 px-4 py-4 backdrop-blur"
                >
                  <dt className="text-[10px] tracking-[0.28em] uppercase text-paper/50">
                    {item.k}
                  </dt>
                  <dd className="mt-1.5 font-serif text-lg text-paper">
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto hidden aspect-square w-full max-w-[520px] lg:block">
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-navy-800/80 via-ink-900 to-ink-950 ring-1 ring-paper/10" />
            <PhysicsOrbital className="absolute inset-0" />

            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-paper/10 bg-ink-950/70 px-3 py-1.5 text-[10px] tracking-[0.28em] text-paper/70 backdrop-blur">
              <Monitor className="h-3 w-3 text-accent" aria-hidden />
              ZOOM LIVE LESSON
            </div>

            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-paper/10 bg-ink-950/75 p-5 backdrop-blur">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold">
                NOW STREAMING
              </p>
              <p className="mt-2 font-serif text-paper">
                電磁気 #03:電場とガウスの法則
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-paper/60">
                <span className="flex h-2 w-2">
                  <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-red-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                Live · 現象の言語化 → 立式 → 演習
              </div>
            </div>
          </div>
        </div>
      </Container>

      <PhysicsWave className="absolute bottom-0 left-0 right-0 h-24 opacity-60" />
    </section>
  );
}
