import { Section } from "@/components/section";
import { principles } from "@/data/philosophy";

export function PhilosophySection() {
  return (
    <Section
      eyebrow="LEARNING PHILOSOPHY"
      title="学習理念 — 物理が伸びる5つの原則"
      description="私たちが授業で一貫して守っている、5つの原則です。テクニックではなく、学びの姿勢そのものを書き換えることが、物理を伸ばす近道だと考えています。"
      className="relative overflow-hidden bg-gradient-to-b from-ink-950 to-navy-900/40"
    >
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {principles.map((p) => (
          <li
            key={p.number}
            className="group relative overflow-hidden rounded-2xl border border-paper/10 bg-ink-900/70 p-8 transition hover:border-gold/40"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 select-none font-serif text-[8rem] leading-none text-gold/10 transition group-hover:text-gold/20"
            >
              {p.kanji}
            </div>
            <p className="relative font-mono text-xs tracking-[0.3em] text-gold">
              PRINCIPLE {p.number}
            </p>
            <h3 className="relative mt-4 font-serif text-xl leading-snug text-paper">
              {p.title}
            </h3>
            <p className="relative mt-4 text-sm leading-relaxed text-paper/70">
              {p.description}
            </p>
          </li>
        ))}

        <li className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/15 via-ink-900/80 to-ink-900 p-8">
          <p className="font-mono text-xs tracking-[0.3em] text-gold">
            OUR BELIEF
          </p>
          <p className="mt-5 font-serif text-xl leading-relaxed text-paper">
            物理の伸び悩みは、<br />
            才能ではなく、<br />
            <span className="text-gold">学び方</span>の問題です。
          </p>
          <p className="mt-5 text-xs text-paper/60 leading-relaxed">
            正しい順序で、正しい姿勢で学べば、物理は必ず伸びます。
            私たちは、そのための伴走者です。
          </p>
        </li>
      </ol>
    </Section>
  );
}
