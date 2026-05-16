import { Container } from "@/components/container";

export function ManifestoBand() {
  return (
    <section
      aria-labelledby="manifesto-heading"
      className="relative isolate overflow-hidden border-y border-ink-900/[0.2] bg-ink-950 text-paper"
    >
      {/* ambient gradients — heavy blurs are desktop-only on mobile to save paint cost */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden sm:block"
      >
        <div className="absolute -left-32 -top-32 h-[36rem] w-[36rem] rounded-full bg-brand/25 blur-[140px]" />
        <div className="absolute -right-24 bottom-[-12rem] h-[34rem] w-[34rem] rounded-full bg-warm/22 blur-[140px]" />
        <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />
      </div>
      {/* lightweight mobile gradient — single radial, no blur filter */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 sm:hidden"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(59,124,217,0.25), transparent 55%), radial-gradient(circle at 50% 90%, rgba(226,128,64,0.18), transparent 55%)",
        }}
      />

      {/* background formula constellation — desktop only (3 absolute monospace nodes
          are noise on small screens and add layout cost) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden select-none text-paper/[0.07] leading-none sm:block"
        style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}
      >
        <p className="absolute left-[2%] top-[8%] text-[6rem] sm:text-[10rem]">F = ma</p>
        <p className="absolute right-[3%] bottom-[10%] text-[5rem] sm:text-[8rem]">∮ E · dA</p>
        <p className="absolute left-[8%] bottom-[14%] text-[5rem] sm:text-[8rem]">E = mc²</p>
      </div>

      {/* grid texture — desktop only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden opacity-[0.07] sm:block"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <Container className="relative py-14 sm:py-36">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] sm:text-[10px] font-medium uppercase tracking-[0.22em] sm:tracking-[0.4em] text-gold before:inline-block before:h-px before:w-5 sm:before:w-8 before:bg-gold/70">
          MANIFESTO — Solvora Learning Lab
        </p>
        <h2
          id="manifesto-heading"
          className="mt-5 sm:mt-7 font-serif text-[1.85rem] leading-[1.25] tracking-[-0.018em] sm:text-[4.2rem] sm:leading-[1.05] lg:text-[5.4rem]"
        >
          解けなかった問題は、
          <br />
          <span className="text-warm">放置</span>するのではなく、
          <br />
          <span className="relative inline-block">
            <span className="text-brand">復習プリント</span>
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-1 h-[8px] sm:h-[10px] -z-10 rounded-full bg-brand/30"
            />
          </span>
          に変える。
        </h2>

        <div className="mt-8 grid gap-8 sm:mt-14 sm:gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <p className="max-w-2xl text-[14px] leading-[1.9] text-paper/85 sm:text-[16.5px] sm:leading-[1.95]">
            公式の暗記ではなく、<strong className="font-medium text-paper">現象を式に翻訳する技術</strong>を教えます。理解は才能ではなく学び方の問題。正しい順序で組み直せば、物理は着実に伸びていきます。
          </p>

          <ol className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-paper/15 bg-paper/10">
            {[
              { k: "言語化", v: "現象を語る" },
              { k: "立式", v: "数式に翻訳" },
              { k: "演習", v: "型を固める" },
            ].map((x, i) => (
              <li key={x.k} className="bg-ink-950/85 px-3 py-4 sm:px-4 sm:py-6 text-center">
                <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] sm:tracking-[0.32em] text-gold/90">
                  STEP 0{i + 1}
                </p>
                <p className="mt-2 sm:mt-3 font-serif text-[0.85rem] sm:text-[1.2rem] tracking-[-0.008em] text-paper">
                  {x.k}
                </p>
                <p className="mt-1 sm:mt-1.5 text-[10.5px] sm:text-[12px] leading-tight sm:leading-relaxed text-paper/75">
                  {x.v}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
