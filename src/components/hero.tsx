import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { BackgroundGrid } from "@/components/background-grid";
import { Container } from "@/components/container";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-paper/5 bg-ink-950">
      <BackgroundGrid variant="hero" />

      <Container className="relative py-24 sm:py-32 lg:py-40">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs tracking-[0.2em] text-accent">
            <Sparkles className="h-3 w-3" aria-hidden />
            PHYSICS ONLY. FOR UNIVERSITY EXAMS.
          </div>

          <h1 className="mt-8 font-serif text-display-lg text-paper">
            物理を、<span className="text-accent">暗記</span>ではなく<br className="hidden sm:block" />
            <span className="text-accent">理解</span>へ。
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-paper/70 sm:text-lg">
            {siteConfig.name} は、高校物理だけを扱う専門塾です。<br className="hidden sm:block" />
            力学・電磁気・波動・熱・原子まで、体系的な現象理解から学び直し、<br className="hidden sm:block" />
            入試本番で安定して得点できる物理を、あなたに。
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/trial"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink-950 transition hover:bg-accent-soft"
            >
              無料体験授業を申し込む
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-6 py-3 text-sm text-paper hover:border-accent hover:text-accent transition"
            >
              講座を見る
            </Link>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { k: "指導分野", v: "物理のみ" },
              { k: "授業形式", v: "完全1対1" },
              { k: "対応地域", v: "全国オンライン" },
              { k: "入塾金", v: "0円" },
            ].map((item) => (
              <div
                key={item.k}
                className="rounded-xl border border-paper/10 bg-ink-900/60 px-4 py-5 backdrop-blur"
              >
                <dt className="text-[10px] tracking-[0.28em] uppercase text-paper/50">
                  {item.k}
                </dt>
                <dd className="mt-2 font-serif text-xl text-paper">{item.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
