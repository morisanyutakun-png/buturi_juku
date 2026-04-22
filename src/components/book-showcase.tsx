import Image from "next/image";
import { BookOpen, ExternalLink, Quote } from "lucide-react";
import { Section } from "@/components/section";
import { featuredBook } from "@/data/books";

export function BookShowcase() {
  return (
    <Section
      eyebrow="PUBLISHED WORK"
      title={<>書籍を執筆した講師が、<br className="sm:hidden" />授業をそのまま担当します。</>}
      description="主宰講師 森祐太(名古屋大学 工学部 電気電子情報工学科)が手がけた電磁気の書籍。書籍で体系化した指導観を、そのままオンライン授業に持ち込みます。"
      className="relative overflow-hidden bg-gradient-to-b from-cream via-cream to-cream-muted text-ink-900"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div className="relative">
          <div
            aria-hidden
            className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-gold/40 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-orange-400/30 blur-3xl"
          />

          <figure className="relative">
            <div className="relative overflow-hidden rounded-[6px] shadow-[0_50px_90px_-30px_rgba(0,0,0,0.4)] ring-1 ring-ink-900/10 transition duration-500 hover:-translate-y-1 hover:shadow-[0_60px_110px_-30px_rgba(0,0,0,0.45)]">
              <Image
                src={featuredBook.coverImage}
                alt={`${featuredBook.title} の表紙`}
                width={1135}
                height={870}
                priority={false}
                className="block h-auto w-full"
              />
              {/* subtle reflection edge */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/10 to-transparent"
              />
            </div>

            <figcaption className="mt-5 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-paper/50 px-3 py-1 text-ink-700">
                <BookOpen className="h-3 w-3" aria-hidden />
                {featuredBook.field} / {featuredBook.publishedYear}
              </span>
              <span className="font-mono tracking-[0.22em] text-ink-700/60">
                NAGOYA UNIV. EEI ENG.
              </span>
            </figcaption>
          </figure>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-deep/30 bg-ink-900/5 px-3 py-1 text-xs tracking-[0.2em] text-gold-deep">
            <BookOpen className="h-3 w-3" aria-hidden />
            {featuredBook.badge ?? "著者による執筆書籍"}
          </div>

          {featuredBook.tagline && (
            <p className="mt-6 font-serif text-sm tracking-wider text-red-700">
              {featuredBook.tagline}
            </p>
          )}

          <h3 className="mt-2 font-serif text-display-md text-ink-900">
            {featuredBook.title}
          </h3>
          <p className="mt-4 font-serif text-ink-700">
            <span className="text-gold-deep">—</span> {featuredBook.subtitle}
          </p>

          <p className="mt-8 text-ink-700 leading-[1.9]">
            {featuredBook.description}
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {featuredBook.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-3 rounded-xl border border-ink-900/10 bg-paper/60 p-4 text-sm text-ink-900"
              >
                <span
                  aria-hidden
                  className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-gold-deep/50 bg-gold/40"
                />
                {h}
              </li>
            ))}
          </ul>

          <figure className="mt-10 rounded-2xl border border-ink-900/10 bg-paper/60 p-6">
            <Quote className="h-5 w-5 text-gold-deep" aria-hidden />
            <blockquote className="mt-3 font-serif text-lg leading-relaxed text-ink-900">
              「電磁気で失点する本当の理由は、公式の暗記量ではなく、
              <span className="text-gold-deep">場のイメージの欠如</span>
              にある。」
            </blockquote>
            <figcaption className="mt-3 text-xs tracking-widest uppercase text-ink-700/60">
              — 本書より
            </figcaption>
          </figure>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={featuredBook.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-sm font-medium text-paper transition hover:bg-navy-900"
            >
              Amazonで書籍を見る
              <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="/teacher"
              className="inline-flex items-center gap-2 rounded-full border border-ink-900/20 px-6 py-3.5 text-sm text-ink-900 hover:border-ink-900/50 transition"
            >
              講師プロフィールを見る
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
