import { Container } from "@/components/container";

export function ManifestoBand() {
  return (
    <section
      aria-labelledby="manifesto-heading"
      className="relative isolate overflow-hidden border-y border-ink-900/[0.2] bg-ink-950 text-paper"
    >
      {/* ambient gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-32 -top-32 h-[36rem] w-[36rem] rounded-full bg-brand/25 blur-[140px]" />
        <div className="absolute -right-24 bottom-[-12rem] h-[34rem] w-[34rem] rounded-full bg-warm/22 blur-[140px]" />
        <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />
      </div>

      {/* big background formula constellation */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none text-paper/[0.07] leading-none"
        style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}
      >
        <p className="absolute left-[2%] top-[8%] text-[6rem] sm:text-[10rem]">F = ma</p>
        <p className="absolute right-[3%] top-[18%] text-[5rem] sm:text-[8rem]">∮ E · dA</p>
        <p className="absolute left-[8%] bottom-[12%] text-[5.5rem] sm:text-[9rem]">λ = h / p</p>
        <p className="absolute right-[6%] bottom-[6%] text-[4.5rem] sm:text-[7rem]">∇ × B = μ₀ J</p>
        <p className="absolute left-1/2 top-[45%] -translate-x-1/2 text-[4rem] sm:text-[6rem]">E = mc²</p>
      </div>

      {/* grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <Container className="relative py-24 sm:py-36">
        <p className="inline-flex items-center gap-3 text-[11px] sm:text-[10px] font-medium uppercase tracking-[0.4em] text-gold before:inline-block before:h-px before:w-8 before:bg-gold/70">
          MANIFESTO — 高校物理専門塾
        </p>
        <h2
          id="manifesto-heading"
          className="mt-7 font-serif text-[2.6rem] leading-[1.18] tracking-[-0.022em] sm:text-[4.2rem] sm:leading-[1.05] lg:text-[5.4rem]"
        >
          高校物理は、
          <br />
          <span className="text-warm">暗記</span>では伸びない。
          <br />
          <span className="relative inline-block">
            <span className="text-brand">構造</span>
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-1 h-[10px] -z-10 rounded-full bg-brand/30"
            />
          </span>
          で、伸ばす。
        </h2>

        <div className="mt-12 grid gap-10 sm:mt-16 md:grid-cols-[1.4fr_1fr] md:items-end">
          <p className="max-w-2xl text-[16.5px] leading-[2.05] sm:text-[17px] sm:leading-[1.95] text-paper/85">
            高校物理専門塾「物理の森」は、<strong className="font-medium text-paper">公式の暗記</strong>ではなく、
            <strong className="font-medium text-paper">現象を式に翻訳する技術</strong>を教える塾です。
            『なぜそう立式するのか』を語れる状態まで、最後の一歩まで伴走します。物理は才能ではなく、学び方の問題。正しい順序で組み直せば、必ず伸びます。
          </p>

          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-paper/15 bg-paper/10">
            {[
              { k: "言語化", v: "現象を語る" },
              { k: "立式", v: "数式に翻訳" },
              { k: "演習", v: "型を固める" },
            ].map((x, i) => (
              <div key={x.k} className="bg-ink-950/85 px-4 py-6 text-center">
                <p className="font-mono text-[10px] tracking-[0.32em] text-gold/90">
                  STEP 0{i + 1}
                </p>
                <p className="mt-3 font-serif text-[1.1rem] sm:text-[1.25rem] tracking-[-0.008em] text-paper">
                  {x.k}
                </p>
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-paper/60">
                  {x.v}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
