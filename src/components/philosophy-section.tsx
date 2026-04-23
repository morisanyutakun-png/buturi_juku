import { Section } from "@/components/section";
import { principles } from "@/data/philosophy";

export function PhilosophySection() {
  return (
    <Section
      eyebrow="LEARNING PHILOSOPHY"
      title="学習理念 — 物理が伸びる5つの原則"
      description="私たちが授業で一貫して守っている、5つの原則です。テクニックではなく、学びの姿勢そのものを書き換えることが、物理を伸ばす近道だと考えています。"
      className="bg-paper-soft"
    >
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {principles.map((p) => (
          <li
            key={p.number}
            className="group relative overflow-hidden rounded-2xl border border-ink-900/10 bg-white p-8 shadow-soft transition hover:-translate-y-0.5 hover:border-warm/40 hover:shadow-card"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 select-none font-serif text-[8rem] leading-none text-warm/10 transition group-hover:text-warm/20"
            >
              {p.kanji}
            </div>
            <p className="relative font-mono text-xs tracking-[0.3em] text-warm-deep">
              PRINCIPLE {p.number}
            </p>
            <h3 className="relative mt-4 font-serif text-xl leading-snug text-ink-900">
              {p.title}
            </h3>
            <p className="relative mt-4 text-sm leading-relaxed text-ink-700">
              {p.description}
            </p>
          </li>
        ))}

        <li className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-warm/30 bg-gradient-to-br from-warm-bg via-paper to-brand-bg p-8 shadow-soft">
          <p className="font-mono text-xs tracking-[0.3em] text-warm-deep">
            OUR BELIEF
          </p>
          <p className="mt-5 font-serif text-xl leading-relaxed text-ink-900">
            物理の伸び悩みは、<br />
            才能ではなく、<br />
            <span className="text-warm-deep">学び方</span>の問題です。
          </p>
          <p className="mt-5 text-xs text-ink-700 leading-relaxed">
            正しい順序で、正しい姿勢で学べば、物理は必ず伸びます。
            私たちは、そのための伴走者です。
          </p>
        </li>
      </ol>
    </Section>
  );
}
