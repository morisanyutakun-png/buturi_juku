import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * Bright pastel illustrated hero card.
 * Vivid central orbital + glow halo + floating equation chips + vertical 森 watermark.
 * Designed as a focal-point image, not a backdrop.
 */
export function HeroVisual({ className }: Props) {
  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-[2.25rem] ring-1 ring-ink-900/[0.10] shadow-elevate",
        className,
      )}
    >
      {/* layered pastel base */}
      <div className="absolute inset-0 bg-[linear-gradient(150deg,#ffffff_0%,#f3e9ff_22%,#fde0c5_55%,#fff5e0_82%,#fbf5e6_100%)]" />

      {/* big brand wash */}
      <div
        className="absolute -left-[20%] -top-[20%] h-[70%] w-[80%]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(155,188,255,0.85), rgba(59,124,217,0.25) 50%, transparent 78%)",
        }}
      />
      {/* warm wash */}
      <div
        className="absolute right-[-15%] top-[15%] h-[65%] w-[70%]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,200,148,0.9), rgba(226,128,64,0.25) 50%, transparent 80%)",
        }}
      />
      {/* gold halo */}
      <div
        className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,229,168,0.7), rgba(202,163,75,0.18) 55%, transparent 80%)",
        }}
      />

      {/* huge watermark kanji */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-12 -bottom-16 select-none font-serif text-[28rem] leading-[0.8] tracking-tighter text-warm-deep/[0.10]"
        style={{ writingMode: "vertical-rl" }}
      >
        森
      </span>

      {/* central orbital atom */}
      <svg
        viewBox="0 0 400 500"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <radialGradient id="hv-core" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#fff5d6" stopOpacity="1" />
            <stop offset="60%" stopColor="#e8b864" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#caa34b" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hv-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#fbecc4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fbecc4" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hv-orbit-1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b7cd9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3b7cd9" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="hv-orbit-2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e28040" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#e28040" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="hv-orbit-3" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#597a5b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#597a5b" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* central glow */}
        <circle cx="200" cy="250" r="180" fill="url(#hv-glow)" />

        {/* orbital ellipses + nucleus, centered at (200,250) */}
        <g transform="translate(200 250)">
          <ellipse rx="170" ry="62" fill="none" stroke="url(#hv-orbit-1)" strokeWidth="1.6" transform="rotate(20)" />
          <ellipse rx="155" ry="58" fill="none" stroke="url(#hv-orbit-2)" strokeWidth="1.6" transform="rotate(-30)" />
          <ellipse rx="140" ry="78" fill="none" stroke="url(#hv-orbit-3)" strokeWidth="1.6" transform="rotate(80)" />

          {/* nucleus */}
          <circle r="42" fill="url(#hv-core)" />
          <circle r="6" fill="#caa34b" />
        </g>

        {/* electrons — separated so CSS transform-origin: 200px 250px works in viewBox coords */}
        <g className="orbit-22">
          <circle cx="370" cy="250" r="6" fill="#3b7cd9" />
        </g>
        <g className="orbit-18">
          <circle cx="355" cy="250" r="5" fill="#e28040" />
        </g>
        <g className="orbit-28">
          <circle cx="340" cy="250" r="5" fill="#597a5b" />
        </g>
      </svg>

      {/* floating equation chips */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-5 top-10 rounded-2xl border border-ink-900/[0.10] bg-white/90 px-4 py-3 shadow-soft"
          style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}
        >
          <p className="text-[10px] tracking-[0.24em] uppercase text-brand-deep">Mechanics</p>
          <p className="mt-1.5 text-[16px] text-ink-900">F = ma</p>
        </div>

        <div
          className="absolute right-5 top-[34%] rounded-2xl border border-ink-900/[0.10] bg-white/90 px-4 py-3 shadow-soft"
          style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}
        >
          <p className="text-[10px] tracking-[0.24em] uppercase text-warm-deep">EM</p>
          <p className="mt-1.5 text-[15px] text-ink-900">∮ E · dA = Q / ε₀</p>
        </div>

        <div
          className="absolute left-6 bottom-10 rounded-2xl border border-ink-900/[0.10] bg-white/90 px-4 py-3 shadow-soft"
          style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}
        >
          <p className="text-[10px] tracking-[0.24em] uppercase text-forest-deep">Wave</p>
          <p className="mt-1.5 text-[16px] text-ink-900">v = f λ</p>
        </div>

        <div className="absolute right-7 bottom-12 inline-flex items-center gap-2 rounded-full border border-ink-900/[0.10] bg-white/90 px-3.5 py-1.5 text-[10.5px] tracking-[0.26em] text-ink-700 shadow-soft">
          <span className="relative inline-flex h-1.5 w-1.5" aria-hidden>
            <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-warm/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-warm" />
          </span>
          LIVE LESSON
        </div>
      </div>

      {/* diagonal light beam */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 -top-1/4 h-[150%] w-[60%] rotate-[28deg] opacity-40"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)",
        }}
      />

      {/* hairline frame highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] ring-1 ring-inset ring-white/55" />
    </div>
  );
}
