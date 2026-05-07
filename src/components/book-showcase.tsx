import Image from "next/image";
import { BookOpen, ExternalLink, Quote } from "lucide-react";
import { Section } from "@/components/section";
import { books, type Book } from "@/data/books";

export function BookShowcase() {
  return (
    <Section
      eyebrow="OUR TEACHING MATERIALS — 講師制作の物理教材で授業します"
      title={<>森祐太が作成した物理教材を使って、<br className="sm:hidden" />構造から学ぶ。</>}
      description="授業では、森祐太が作成した高校物理教材・KDP教材・PDF教材を活用します。力学、電磁気、波動、熱力学、原子などを、公式暗記ではなく『なぜその式を立てるのか』から整理。授業で扱った内容と、解けなかった問題から作る AI 復習プリントが、自然につながる構成です。"
      className="relative overflow-hidden bg-gradient-to-b from-cream via-cream to-cream-muted text-ink-900 border-y border-ink-900/10"
    >
      <ul className="grid gap-3 sm:gap-4 mb-12 sm:mb-16 sm:grid-cols-2">
        {[
          "市販教材だけに依存しない",
          "講師自身が作成した教材で一貫指導",
          "授業内容と AI復習プリントがつながる",
          "物理のつまずきを教材側からも補強できる",
        ].map((b) => (
          <li
            key={b}
            className="flex items-start gap-3 rounded-2xl border border-ink-900/10 bg-paper/60 p-4 text-[14px] sm:text-[13.5px] leading-[1.7] text-ink-900"
          >
            <span
              aria-hidden
              className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full border border-gold-deep/50 bg-gold/40"
            />
            {b}
          </li>
        ))}
      </ul>

      <div className="space-y-16 sm:space-y-24">
        {books.map((book, idx) => (
          <BookEntry key={book.slug} book={book} flipped={idx % 2 === 1} />
        ))}
      </div>
    </Section>
  );
}

function BookEntry({ book, flipped }: { book: Book; flipped: boolean }) {
  return (
    <article
      className={`grid items-center gap-10 sm:gap-14 lg:gap-16 ${
        flipped
          ? "lg:grid-cols-[1fr_0.85fr]"
          : "lg:grid-cols-[0.85fr_1fr]"
      }`}
    >
      <div className={`relative ${flipped ? "lg:order-2" : ""}`}>
        <div
          aria-hidden
          className="absolute -left-10 -top-10 hidden h-56 w-56 rounded-full bg-gold/40 blur-3xl sm:block"
        />
        <div
          aria-hidden
          className="absolute -right-10 bottom-10 hidden h-48 w-48 rounded-full bg-ink-900/10 blur-3xl sm:block"
        />

        <figure className="relative mx-auto w-full max-w-[280px] sm:max-w-[380px]">
          <div className="group relative overflow-hidden rounded-[6px] shadow-[0_50px_90px_-30px_rgba(0,0,0,0.5)] ring-1 ring-ink-900/20 transition duration-500 hover:-translate-y-1 hover:shadow-[0_60px_110px_-30px_rgba(0,0,0,0.55)]">
            <Image
              src={book.coverImage}
              alt={`${book.title} の表紙`}
              width={book.coverWidth}
              height={book.coverHeight}
              unoptimized
              priority={false}
              loading="lazy"
              sizes="(max-width: 640px) 280px, 380px"
              className="block h-auto w-full"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/30 to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-white/10 to-transparent"
            />
          </div>

          <figcaption className="mt-4 sm:mt-5 flex flex-wrap items-center justify-between gap-2 text-[11.5px] sm:text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-paper/50 px-3 py-1 text-ink-700">
              <BookOpen className="h-3 w-3" aria-hidden />
              {book.field} / {book.publishedYear}
            </span>
            <span className="font-mono tracking-[0.18em] sm:tracking-[0.22em] text-ink-700/60">
              NAGOYA UNIV. EEI
            </span>
          </figcaption>
        </figure>
      </div>

      <div className={flipped ? "lg:order-1" : ""}>
        <div className="inline-flex items-center gap-2 rounded-full border border-gold-deep/30 bg-ink-900/5 px-3 py-1 text-xs tracking-[0.2em] text-gold-deep">
          <BookOpen className="h-3 w-3" aria-hidden />
          {book.badge ?? "著者による執筆書籍"}
        </div>

        {book.tagline && (
          <p className="mt-6 font-serif text-sm tracking-wider text-red-700">
            {book.tagline}
          </p>
        )}

        <h3 className="mt-2 font-serif text-display-md text-ink-900">
          {book.title}
        </h3>
        <p className="mt-4 font-serif text-[15px] sm:text-base text-ink-700">
          <span className="text-gold-deep">—</span> {book.subtitle}
        </p>

        <p className="mt-7 sm:mt-8 text-[15px] sm:text-base text-ink-700 leading-[1.95] sm:leading-[1.9]">
          {book.description}
        </p>

        <ul className="mt-7 sm:mt-8 grid gap-2.5 sm:gap-3 sm:grid-cols-2">
          {book.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-3 rounded-xl border border-ink-900/10 bg-paper/60 p-3.5 sm:p-4 text-[13.5px] sm:text-sm leading-[1.7] text-ink-900"
            >
              <span
                aria-hidden
                className="mt-1 h-4 w-4 shrink-0 rounded-full border border-gold-deep/50 bg-gold/40"
              />
              {h}
            </li>
          ))}
        </ul>

        {book.pullQuote && (
          <figure className="mt-8 sm:mt-10 rounded-2xl border border-ink-900/10 bg-paper/60 p-5 sm:p-6">
            <Quote className="h-5 w-5 text-gold-deep" aria-hidden />
            <blockquote className="mt-3 font-serif text-[1.05rem] sm:text-lg leading-[1.7] sm:leading-relaxed text-ink-900">
              「{book.pullQuote.body}
              {book.pullQuote.emphasis && (
                <span className="text-gold-deep">{book.pullQuote.emphasis}</span>
              )}
              」
            </blockquote>
            <figcaption className="mt-3 text-[11px] sm:text-xs tracking-widest uppercase text-ink-700/60">
              — 本書より
            </figcaption>
          </figure>
        )}

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3">
          {book.amazonUrl ? (
            <a
              href={book.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-[14.5px] sm:text-sm font-medium text-white transition hover:bg-ink-800 min-h-[48px] sm:min-h-0"
            >
              Amazonで書籍を見る
              <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
          ) : (
            <span className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-ink-900/20 bg-paper/40 px-6 py-3.5 text-[14.5px] sm:text-sm text-ink-700 min-h-[48px] sm:min-h-0">
              {book.publishedYear} 刊行予定
            </span>
          )}
          <a
            href="/teacher"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-ink-900/20 px-6 py-3.5 text-[14.5px] sm:text-sm text-ink-900 hover:border-ink-900/50 transition min-h-[48px] sm:min-h-0"
          >
            講師プロフィールを見る
          </a>
        </div>
      </div>
    </article>
  );
}
