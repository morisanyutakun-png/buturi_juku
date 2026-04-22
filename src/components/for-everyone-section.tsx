import { Section } from "@/components/section";
import { audiences } from "@/data/audiences";

const toneClasses: Record<string, string> = {
  beginner: "border-accent/30 bg-gradient-to-br from-accent/10 via-ink-900/70 to-ink-900",
  mid: "border-paper/10 bg-ink-900/60",
  advanced: "border-gold/30 bg-gradient-to-br from-gold/10 via-ink-900/80 to-ink-900",
  independent: "border-paper/10 bg-gradient-to-br from-navy-900/40 via-ink-900/80 to-ink-900",
};

export function ForEveryoneSection() {
  return (
    <Section
      eyebrow="FOR EVERY LEARNER"
      title={<>物理を高めたい人、<br className="sm:hidden" />すべてが対象です。</>}
      description="初学者から難関大志望まで、物理を伸ばしたい全ての方のための塾です。『苦手だから無理かも』『自分のレベルでは申し込めない』ということは、一切ありません。あなたに合ったルートを、体験授業で一緒に設計します。"
      className="relative overflow-hidden"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {audiences.map((a) => (
          <article
            key={a.level}
            className={`group relative overflow-hidden rounded-2xl border p-7 transition hover:-translate-y-0.5 ${toneClasses[a.tone]}`}
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-paper/50">
              {a.level}
            </p>
            <h3 className="mt-4 font-serif text-lg leading-snug text-paper">
              {a.label}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-paper/70">
              {a.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/10 via-ink-900/80 to-ink-900 p-8 text-center md:p-10">
        <p className="font-mono text-xs tracking-[0.3em] text-gold">
          OUR STANCE
        </p>
        <p className="mt-4 font-serif text-xl leading-relaxed text-paper sm:text-2xl">
          『<span className="text-gold">あなたのレベルに合うルート</span>』は、必ず存在します。
        </p>
        <p className="mt-4 text-sm text-paper/70 leading-relaxed">
          体験授業では、今のあなたの現在地を丁寧にヒアリングしたうえで、
          <br className="hidden sm:block" />
          合うと感じられたときだけ、受講を選んでください。
        </p>
      </div>
    </Section>
  );
}
