import Image from "next/image";
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
            "radial-gradient(closest-side, rgba(31,90,166,0.35), transparent 75%)",
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

      <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
        {/* Left Book: Physics I */}
        <div className="absolute left-[0%] top-[12%] w-[50%] -rotate-[14deg] -translate-x-3 rounded-md shadow-elevate transition-all duration-700 ease-out hover:-translate-y-5 hover:rotate-[-8deg] hover:z-40 opacity-[0.92] hover:opacity-100 origin-bottom-right">
          <BookCover book={leftBook} />
        </div>

        {/* Right Book: Physics II */}
        <div className="absolute right-[0%] top-[15%] w-[50%] rotate-[16deg] translate-x-3 rounded-md shadow-elevate transition-all duration-700 ease-out hover:-translate-y-5 hover:rotate-[10deg] hover:z-40 opacity-[0.92] hover:opacity-100 origin-bottom-left">
          <BookCover book={rightBook} />
        </div>

        {/* Center Book: Electromagnetism */}
        <div className="absolute left-[12%] top-[4%] w-[76%] z-30 rounded-md shadow-[0_32px_80px_-16px_rgba(10,21,40,0.55)] transition-all duration-700 ease-out hover:-translate-y-6 hover:scale-[1.03]">
          <BookCover book={centerBook} />
        </div>
      </div>

      {/* Floating EM Equation Chip (Cool technical detail) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 top-[28%] z-40 hidden lg:inline-flex flex-col gap-1 rounded-2xl border border-ink-900/[0.08] bg-white/95 px-4 py-3 shadow-soft backdrop-blur-md transition-transform duration-700 hover:scale-105"
        style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}
      >
        <span className="text-[9.5px] tracking-[0.24em] uppercase text-brand-deep">
          Electromagnetism
        </span>
        <span className="mt-1 text-[14.5px] text-ink-900 font-medium">
          ∮ <span className="font-bold">E</span> · d<span className="font-bold">A</span> = Q / ε₀
        </span>
      </div>

      {/* Floating Physics Series Chip */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-4 bottom-[20%] z-40 inline-flex flex-col gap-0.5 rounded-xl border border-ink-900/[0.08] bg-white/95 px-3.5 py-2.5 shadow-soft backdrop-blur-md lg:-left-8 transition-transform duration-700 hover:scale-105"
        style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
      >
        <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-ink-900 leading-none">
          PHYSICS I・II
        </span>
        <span className="text-[9px] sm:text-[9.5px] font-medium tracking-[0.05em] text-ink-600 mt-1">
          力学・電磁気・熱・波動・原子
        </span>
      </div>

      {/* Availability Badge */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-2 -bottom-2 z-40 inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-white/95 px-4 py-2 text-[10.5px] sm:text-[11px] tracking-[0.2em] font-bold text-ink-900 shadow-soft lg:-right-4 backdrop-blur-md"
      >
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-gold-deep/80" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-deep" />
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
