import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { books } from "@/data/books";

/**
 * 6 冊の表紙を一気に見せる「コンパクト book strip」。
 *
 * 設計意図:
 *   - 「自作教材で授業する」が他塾との最大の差別化ポイント。
 *     スクロール下層に隠さず、実績ストリップ直下で**前面に**出す。
 *   - 詳細（subtitle / description / 引用 / Amazon リンク等）は
 *     既存の `BookShowcase` に委譲し、本コンポーネントは「6冊の表紙」だけに集中。
 *   - モバイル: 3×2 グリッド / デスクトップ: 1×6 横並び。
 */
export function BookCoversStrip() {
  return (
    <section
      id="books"
      aria-labelledby="books-strip-heading"
      className="relative border-b border-ink-900/[0.06] bg-gradient-to-b from-cream/70 via-cream to-cream-muted/80"
    >
      <Container className="py-10 sm:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div>
            <p className="text-[10px] sm:text-[10px] font-medium tracking-[0.18em] sm:tracking-[0.32em] uppercase text-gold-deep">
              OUR TEACHING MATERIALS
            </p>
            <h2
              id="books-strip-heading"
              className="mt-3 sm:mt-4 max-w-3xl font-serif text-[1.4rem] sm:text-[2rem] leading-[1.4] sm:leading-[1.3] tracking-[-0.012em] text-ink-900"
            >
              講師作の物理教材<span className="text-gold-deep"> 6冊</span>で、<br className="sm:hidden" />
              構造から授業します。
            </h2>
            <p className="mt-3 sm:mt-4 max-w-2xl text-[13.5px] sm:text-[14.5px] leading-[1.85] text-ink-700">
              森祐太自身が書いた『考える力を育てる』シリーズ全 6 冊。市販教材ではなく、講師自身の枠組みで一貫して教えます。
            </p>
          </div>
          <Link
            href="/teacher#books"
            className="self-start inline-flex items-center gap-1.5 rounded-full border border-ink-900/15 bg-white/80 px-4 py-2.5 text-[12.5px] sm:text-[13px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white sm:self-end"
          >
            6 冊の中身を見る
            <ArrowRight className="h-3.5 w-3.5 opacity-60" />
          </Link>
        </div>

        <ul className="mt-6 sm:mt-10 grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
          {books.map((book) => (
            <li key={book.slug}>
              <a
                href={book.amazonUrl ?? "/teacher#books"}
                target={book.amazonUrl ? "_blank" : undefined}
                rel={book.amazonUrl ? "noopener noreferrer" : undefined}
                className="group block"
                aria-label={book.title}
              >
                <div className="relative overflow-hidden rounded-[4px] sm:rounded-[6px] shadow-[0_18px_40px_-22px_rgba(10,21,40,0.4)] ring-1 ring-ink-900/15 transition duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_22px_50px_-22px_rgba(10,21,40,0.5)]">
                  <Image
                    src={book.coverImage}
                    alt={`${book.title} の表紙`}
                    width={book.coverWidth}
                    height={book.coverHeight}
                    unoptimized={book.coverImage.endsWith(".svg")}
                    loading="lazy"
                    sizes="(max-width: 640px) 30vw, 160px"
                    className="block h-auto w-full"
                  />
                  {/* spine highlight */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 w-2 sm:w-3 bg-gradient-to-r from-black/25 to-transparent"
                  />
                </div>
                <p className="mt-2 sm:mt-2.5 text-center font-serif text-[10.5px] sm:text-[12px] leading-[1.45] tracking-[-0.005em] text-ink-800">
                  {book.field}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
