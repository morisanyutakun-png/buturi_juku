import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { books } from "@/data/books";

/**
 * 6 冊の表紙を一気に見せる「コンパクト book strip」。
 *
 * 設計意図:
 *   - 「自作教材で全分野を読み通せる」が他塾との最大の差別化ポイント。
 *     プリントの直後で前面に出す。
 *   - 詳細（subtitle / description / 引用 / Amazon リンク等）は `BookShowcase` に
 *     委譲し、本コンポーネントは「6 冊の表紙」だけに集中。
 *   - レイアウト:
 *     - モバイル: 横スクロール（snap）で、片手で 1 冊ずつスワイプして眺められる。
 *       3 冊 × 2 列のグリッドより重要そうに見え、本棚を眺める所作に近い。
 *     - sm 以上: 1 × 6 横並びグリッド。
 */
export function BookCoversStrip() {
  return (
    <section
      id="books"
      aria-labelledby="books-strip-heading"
      className="relative border-b border-ink-900/[0.06] bg-gradient-to-b from-cream/70 via-cream to-cream-muted/80"
    >
      <Container className="py-11 sm:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div>
            <p className="text-[10px] sm:text-[10px] font-medium tracking-[0.22em] sm:tracking-[0.32em] uppercase text-gold-deep">
              OUR BOOKS — 著者執筆の参考書 6 冊
            </p>
            <h2
              id="books-strip-heading"
              className="mt-3 sm:mt-4 max-w-3xl font-serif text-[1.4rem] sm:text-[2rem] leading-[1.4] sm:leading-[1.3] tracking-[-0.012em] text-ink-900"
            >
              全分野を 1 冊で読み通したいなら、<br className="sm:hidden" />
              <span className="text-gold-deep">KDP 参考書 6 冊</span>。
            </h2>
            <p className="mt-3 sm:mt-4 max-w-2xl text-[13.5px] sm:text-[14.5px] leading-[1.85] text-ink-700">
              『考える力を育てる』シリーズ全 6 冊。プリントと同じ「現象 → 立式 → 演習」の順序で書かれています。
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

        {/* モバイル: 横スクロール（snap）。1 列に表紙が並ぶ "本棚を眺める" 触感に。 */}
        <ul
          className="mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 -mx-[1.15rem] px-[1.15rem] no-scrollbar sm:hidden"
          role="list"
          aria-label="参考書 6 冊"
        >
          {books.map((book) => (
            <li
              key={book.slug}
              className="snap-start shrink-0 w-[40%] max-w-[170px] first:pl-0 last:pr-2"
            >
              <BookTile book={book} />
            </li>
          ))}
        </ul>

        {/* sm+: 横並び 6 グリッド */}
        <ul className="mt-10 hidden grid-cols-6 gap-4 sm:grid">
          {books.map((book) => (
            <li key={book.slug}>
              <BookTile book={book} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function BookTile({ book }: { book: (typeof books)[number] }) {
  return (
    <a
      href={book.amazonUrl ?? "/teacher#books"}
      target={book.amazonUrl ? "_blank" : undefined}
      rel={book.amazonUrl ? "noopener noreferrer" : undefined}
      className="lift group block"
      aria-label={book.title}
    >
      <div className="relative overflow-hidden rounded-[4px] sm:rounded-[6px] shadow-[0_18px_40px_-22px_rgba(10,21,40,0.4)] ring-1 ring-ink-900/15 transition duration-500 group-hover:shadow-[0_24px_56px_-22px_rgba(10,21,40,0.55)]">
        <Image
          src={book.coverImage}
          alt={`${book.title} の表紙`}
          width={book.coverWidth}
          height={book.coverHeight}
          unoptimized={book.coverImage.endsWith(".svg")}
          loading="lazy"
          sizes="(max-width: 640px) 40vw, 160px"
          className="block h-auto w-full"
        />
        {/* spine highlight — 製本ぽさを出す細い暗グラデ */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-2 sm:w-3 bg-gradient-to-r from-black/25 to-transparent"
        />
        {/* subtle sheen — group-hover で右に流れる紙の艶 */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,0.35)_50%,transparent_60%)] transition-transform duration-1000 ease-out group-hover:translate-x-[120%]"
        />
      </div>
      <p className="mt-2 sm:mt-2.5 text-center font-serif text-[10.5px] sm:text-[12px] leading-[1.45] tracking-[-0.005em] text-ink-800">
        {book.field}
      </p>
    </a>
  );
}
