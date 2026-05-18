import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";

type Props = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CtaBlock({
  eyebrow = "OPEN THE SHELF — 教材棚から始める",
  title = "まずは演習プリントを開いて、棚の中を覗いてみてください。",
  description = "登録も申込も不要、すべて無料。力学・電磁気・波動・熱・原子の典型問題と解説を Web で読めます。一人で詰まる単元だけ、学習サポートを使ってください。",
  primary = { label: "演習プリントを開く", href: "/prints" },
  secondary = { label: "学習サポートを見る", href: "/courses" },
}: Props) {
  return (
    <section className="relative isolate overflow-hidden border-y border-ink-900/[0.06]">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-paper via-brand-bg/40 to-warm-bg/60"
      />
      <div
        aria-hidden
        className="absolute inset-0 [background-image:radial-gradient(circle_at_15%_10%,rgba(59,124,217,0.18),transparent_50%),radial-gradient(circle_at_85%_90%,rgba(226,128,64,0.18),transparent_50%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-hairline-x"
      />
      <Container className="relative py-12 sm:py-28">
        <div className="grid gap-6 sm:gap-12 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-[10px] font-medium uppercase tracking-[0.18em] sm:tracking-[0.32em] text-brand-deep before:inline-block before:h-px before:w-5 before:bg-current before:opacity-50">
              {eyebrow}
            </p>
            <h2 className="mt-4 sm:mt-7 font-serif text-display-md tracking-[-0.012em] text-ink-900">
              {title}
            </h2>
            <p className="mt-4 sm:mt-6 max-w-xl text-[14px] sm:text-[15px] leading-[1.85] sm:leading-[1.8] text-ink-700 sm:text-ink-600">
              {description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 md:justify-end">
            <Link
              href={primary.href}
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-ink-900 px-7 py-4 text-[15px] sm:text-[14px] font-medium text-paper transition duration-300 hover:bg-ink-800 min-h-[52px] sm:min-h-0"
            >
              {primary.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={secondary.href}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-ink-900/[0.12] bg-white/80 px-7 py-4 text-[15px] sm:text-[14px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white min-h-[52px] sm:min-h-0"
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
