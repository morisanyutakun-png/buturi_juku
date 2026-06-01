import Image from "next/image";
import Link from "next/link";
import { books } from "@/data/books";
import { cn } from "@/lib/utils";

export function HeroBooksVisual({ className }: { className?: string }) {
  // Use mechanics (力学), electromagnetism (電磁気), thermodynamics (熱力学) as representative 3 books
  const leftBook = books[1];
  const rightBook = books[2];
  const centerBook = books[0];

  return (
    <div className={cn("relative mx-auto w-full aspect-[4/5] perspective-1000", className)}>
      {/* Halo glow behind books */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 lg:-inset-10"
        style={{
          background:
            "radial-gradient(closest-side, rgba(226,128,64,0.35), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 hidden lg:block"
        style={{
          background:
            "radial-gradient(closest-side at 30% 80%, rgba(59,124,217,0.3), transparent 70%)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        {/* Left Book: Force (Mechanics) */}
        <div className="absolute left-[2%] top-[15%] w-[48%] -rotate-[8deg] rounded-md shadow-elevate transition-transform duration-500 ease-out hover:-translate-y-3 hover:translate-x-[-1%] hover:rotate-[-6deg] hover:z-20">
          <BookCover book={leftBook} />
        </div>

        {/* Right Book: Thermo */}
        <div className="absolute right-[2%] top-[22%] w-[48%] rotate-[10deg] rounded-md shadow-elevate transition-transform duration-500 ease-out hover:-translate-y-3 hover:translate-x-[1%] hover:rotate-[8deg] hover:z-20">
          <BookCover book={rightBook} />
        </div>

        {/* Center Book: Electromagnetism */}
        <div className="absolute left-[15%] top-[5%] w-[70%] z-10 rounded-md shadow-[0_32px_64px_-24px_rgba(10,21,40,0.4)] transition-transform duration-500 ease-out hover:-translate-y-4">
          <BookCover book={centerBook} />
        </div>
      </div>

      {/* Floating features chips */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-2 top-[35%] z-30 inline-flex flex-col gap-1 rounded-2xl border border-ink-900/[0.10] bg-white/95 px-3 py-2.5 shadow-soft lg:-left-6"
        style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
      >
        <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-ink-900 leading-none">
          VOL.1 - 6
        </span>
        <span className="text-[9px] sm:text-[9.5px] font-medium tracking-[0.05em] text-ink-600 leading-none">
          Amazon KDP
        </span>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -right-2 -bottom-3 z-30 inline-flex items-center gap-2 rounded-full border border-warm/40 bg-warm-bg/95 px-3.5 py-1.5 sm:py-2 text-[10.5px] sm:text-[11px] font-medium tracking-[0.16em] sm:tracking-[0.22em] text-warm-deep shadow-soft lg:-right-4"
      >
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-warm/80" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-warm" />
        </span>
        全5分野 体系化
      </div>
    </div>
  );
}

function BookCover({ book }: { book: (typeof books)[number] }) {
  return (
    <Link href="/teacher#books" className="block w-full h-full relative" aria-label={book.title}>
      <div className="relative w-full overflow-hidden rounded-[2px] sm:rounded-[3px] ring-1 ring-ink-900/15 group">
        <Image
          src={book.coverImage}
          alt={book.title}
          width={book.coverWidth}
          height={book.coverHeight}
          unoptimized={book.coverImage.endsWith(".svg")}
          priority
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 250px"
          className="w-full h-auto object-cover"
        />
        {/* Book spine shading */}
        <div className="absolute inset-y-0 left-0 w-[4%] bg-gradient-to-r from-black/25 to-transparent pointer-events-none" />
        {/* Gloss reflection overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 translate-x-[-150%] bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,0.4)_50%,transparent_60%)] transition-transform duration-[1.2s] ease-out group-hover:translate-x-[150%]"
        />
      </div>
    </Link>
  );
}
