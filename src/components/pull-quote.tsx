import { Quote } from "lucide-react";
import { Container } from "@/components/container";

export function PullQuote() {
  return (
    <section
      aria-label="高校物理専門塾の信念"
      className="relative isolate overflow-hidden border-y border-ink-900/[0.08] bg-paper-soft"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_20%_30%,rgba(202,163,75,0.18),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(226,128,64,0.12),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 top-4 select-none font-serif text-[18rem] leading-none text-warm/[0.10] sm:-left-6 sm:top-2 sm:text-[28rem]"
      >
        &ldquo;
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-0 select-none font-serif text-[18rem] leading-none text-brand/[0.08] sm:-right-6 sm:text-[28rem]"
      >
        &rdquo;
      </div>

      <Container className="relative py-28 sm:py-36">
        <div className="mx-auto max-w-4xl">
          <Quote className="h-7 w-7 text-warm-deep" aria-hidden />
          <blockquote className="mt-7 font-serif text-[2rem] leading-[1.45] tracking-[-0.012em] text-ink-900 sm:text-[3rem] sm:leading-[1.3] lg:text-[3.6rem] lg:leading-[1.25]">
            『わかったふり』を、
            <br />
            <span className="text-warm-deep">許さない。</span>
            <br />
            あなたの手が、
            <br />
            勝手に動くまで。
          </blockquote>
          <figcaption className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] sm:text-[12.5px] tracking-[0.2em] uppercase text-ink-500">
            <span className="h-px w-10 bg-ink-900/30" aria-hidden />
            <span>高校物理専門塾「物理の森」</span>
            <span className="text-ink-400">/</span>
            <span>主宰講師 森祐太</span>
          </figcaption>
        </div>
      </Container>
    </section>
  );
}
