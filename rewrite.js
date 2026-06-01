const fs = require('fs');

const code = `import Image from "next/image";
import Link from "next/link";
import { getBookBySlug, books } from "@/data/books";
import { cn } from "@/lib/utils";

export function HeroBooksVisual({ className }: { className?: string }) {
  // 中央に「電磁気学」、左右に「高校物理I」「高校物理II」を配置
  const centerBook = getBookBySlug("electromagnetism") || books[0];
  const leftBook = getBookBySlug("physics-1") || books[4];
  const rightBook = getBookBySlug("physics-2") || books[5];

  return (
    <div className={cn("relative mx-auto w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] perspective-[1200px]", className)}>
      {/* Dramatic halo glow for EM (Deep Blue/Brand) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 lg:-inset-24"
        style={{
          background:
            "radial-gradient(closest-side, rgba(31,90,166,0.30), transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 hidden lg:block"
        style={{
          background:
            "radial-gradient(closest-side at 50% 80%, rgba(226,128,64,0.15), transparent 70%)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4" style={{ transformStyle: "preserve-3d" }}>
        {/* Left Book: Physics I (Scaled down slightly to make room) */}
        <div className="absolute left-[3%] top-[14%] w-[45%] -rotate-[12deg] -translate-x-2 rounded shadow-elevate transition-all duration-700 ease-out hover:-translate-y-4 hover:-rotate-[8deg] hover:z-40 opacity-[0.85] hover:opacity-100 origin-bottom-right">
          <BookCover book={leftBook} />
        </div>

        {/* Right Book: Physics II */}
        <div className="absolute right-[3%] top-[18%] w-[45%] rotate-[15deg] translate-x-2 rounded shadow-elevate transition-all duration-700 ease-out hover:-translate-y-4 hover:rotate-[10deg] hover:z-40 opacity-[0.85] hover:opacity-100 origin-bottom-left">
          <BookCover book={rightBook} />
        </div>

        {/* Center Book: Electromagnetism (Scaled down from 76% to 65% to free up space) */}
        <div className="absolute left-[17.5%] top-[8%] w-[65%] z-30 rounded-md shadow-[0_32px_80px_-16px_rgba(10,21,40,0.55)] transition-all duration-700 ease-out hover:-translate-y-5 hover:scale-[1.03]">
          <BookCover book={centerBook} />
        </div>
      </div>

      {/* Floating EM Equation Chip (Academic / Technical Style) */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[0%] lg:-right-[10%] top-[-2%] z-40 hidden sm:inline-flex flex-col gap-1.5 bg-white/70 px-4 py-3 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.15)] backdrop-blur-xl border border-white/60 rounded-xl transition-transform duration-700 hover:scale-105"
        style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block" />
          <span className="text-[8.5px] tracking-[0.25em] text-ink-600 font-bold uppercase">
            Electromagnetism
          </span>
        </div>
        <span className="text-[14px] text-ink-900 font-medium tracking-tight border-t border-ink-900/10 pt-1.5">
          <span className="italic mr-1">∮</span> <span className="font-bold">E</span> · d<span className="font-bold">A</span> = <span className="text-brand-deep">Q / ε₀</span>
        </span>
      </div>

      {/* Floating Physics Series Chip (Textbook style annotation) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[0%] lg:-left-[12%] bottom-[15%] z-40 inline-flex flex-col bg-white/80 px-4 py-2.5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.15)] backdrop-blur-xl border-l-[3px] border-l-gold-deep/80 rounded-r-xl transition-transform duration-700 hover:scale-105"
        style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
      >
        <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-ink-900 leading-none">
          SERIES VOL. 1 - 6
        </span>
        <span className="text-[11px] sm:text-[12px] font-bold tracking-widest text-ink-600 mt-2">
          全5分野 体系化
        </span>
      </div>

      {/* Availability Badge (Sleek Dark Mode Edition) */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[5%] lg:-right-[5%] -bottom-[2%] lg:bottom-[4%] z-40 inline-flex items-center gap-2 bg-ink-900 text-white px-4 py-2.5 text-[10px] sm:text-[10.5px] tracking-[0.2em] font-medium rounded-full shadow-2xl transition-transform duration-700 hover:scale-105"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-deep opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
        </span>
        Amazon KDP 出版中
      </div>
    </div>
  );
}

function BookCover({ book }: { book: (typeof books)[number] }) {
  return (
    <Link href="/teacher#books" className="block w-full h-full relative" aria-label={book.title}>
      <div className="relative w-full overflow-hidden rounded-[4px] sm:rounded-[6px] ring-1 ring-ink-900/20 group bg-white">
        <Image
          src={book.coverImage}
          alt={book.title}
          width={book.coverWidth}
          height={book.coverHeight}
          unoptimized={book.coverImage.endsWith(".svg")}
          priority
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 300px"
          className="w-full h-auto object-cover"
        />
        {/* Book spine stronger shading manually overlaid */}
        <div className="absolute inset-y-0 left-0 w-[4%] bg-gradient-to-r from-black/35 via-black/10 to-transparent pointer-events-none mix-blend-multiply" />
        <div className="absolute inset-y-0 left-[4%] w-[1.5%] bg-white/20 pointer-events-none mix-blend-screen" />
        
        {/* Dynamic Gloss reflection overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 translate-x-[-150%] bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,0.45)_50%,transparent_60%)] transition-transform duration-[1.2s] ease-out group-hover:translate-x-[150%]"
        />
        
        {/* Dark edge border inside to give thickness */}
        <div className="pointer-events-none absolute inset-0 rounded-[4px] sm:rounded-[6px] ring-1 ring-inset ring-black/10" />
      </div>
    </Link>
  );
}
`;

fs.writeFileSync('src/components/hero-books-visual.tsx', code);
