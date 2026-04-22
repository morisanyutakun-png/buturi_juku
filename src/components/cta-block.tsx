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
  eyebrow = "BOOK A TRIAL SESSION",
  title = "まずは60分の体験授業で、現在地を見に行きませんか。",
  description = "残り時間と志望校から逆算した学習戦略を、その場でお渡しします。無理な勧誘は行いません。",
  primary = { label: "無料体験授業を申し込む", href: "/trial" },
  secondary = { label: "お問い合わせ", href: "/contact" },
}: Props) {
  return (
    <section className="relative overflow-hidden border-y border-paper/10 bg-navy-900">
      <div
        aria-hidden
        className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_20%_0%,rgba(110,168,255,0.2),transparent_50%),radial-gradient(circle_at_80%_100%,rgba(19,32,68,0.8),transparent_60%)]"
      />
      <Container className="relative py-20 sm:py-24">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-accent">{eyebrow}</p>
            <h2 className="mt-6 font-serif text-display-md text-paper">{title}</h2>
            <p className="mt-6 max-w-xl text-paper/70 leading-relaxed">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              href={primary.href}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink-950 transition hover:bg-accent-soft"
            >
              {primary.label}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={secondary.href}
              className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-6 py-3 text-sm text-paper hover:border-accent hover:text-accent transition"
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
