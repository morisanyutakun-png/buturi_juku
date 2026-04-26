import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * Full-bleed atmospheric backdrop for the hero.
 * Dark forest at dusk + open book emitting light + floating physics formulas.
 * No internal tagline — the hero text overlays this.
 */
export function HeroBackdrop({ className }: Props) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="hb-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#070d1c" />
            <stop offset="55%" stopColor="#0d1832" />
            <stop offset="100%" stopColor="#13243f" />
          </linearGradient>
          <linearGradient id="hb-forest" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a3a26" stopOpacity="0.0" />
            <stop offset="40%" stopColor="#1a3a26" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0d2014" stopOpacity="0.95" />
          </linearGradient>
          <radialGradient id="hb-lamp" cx="0.12" cy="0.28" r="0.45">
            <stop offset="0%" stopColor="#ffd49a" stopOpacity="0.55" />
            <stop offset="35%" stopColor="#e8b864" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hb-book-glow" cx="0.5" cy="0.85" r="0.5">
            <stop offset="0%" stopColor="#ffe9b8" stopOpacity="0.55" />
            <stop offset="40%" stopColor="#9bbcff" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#000022" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hb-forest-light" cx="0.92" cy="0.32" r="0.42">
            <stop offset="0%" stopColor="#dcefcf" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#5a8a4a" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hb-stream" x1="0.5" y1="1" x2="0.5" y2="0">
            <stop offset="0%" stopColor="#fff5d6" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#7eb1ff" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#7eb1ff" stopOpacity="0" />
          </linearGradient>
          <filter id="hb-blur-md" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <radialGradient id="hb-vignette" cx="0.5" cy="0.5" r="0.85">
            <stop offset="55%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
          </radialGradient>
        </defs>

        {/* sky / room base */}
        <rect width="1600" height="1000" fill="url(#hb-sky)" />

        {/* forest light on the right */}
        <rect width="1600" height="1000" fill="url(#hb-forest-light)" />

        {/* tree silhouettes on the right */}
        <g fill="#0c1f15" opacity="0.85">
          <path d="M1140,1000 L1140,560 C1180,540 1210,500 1230,460 C1250,500 1280,540 1320,560 L1320,1000 Z" />
          <path d="M1280,1000 L1280,500 C1320,478 1356,440 1378,395 C1400,440 1438,478 1478,500 L1478,1000 Z" />
          <path d="M1430,1000 L1430,470 C1470,450 1504,410 1524,366 C1544,410 1582,450 1600,468 L1600,1000 Z" />
        </g>

        {/* misty light shafts */}
        <g opacity="0.32">
          <path d="M1340,80 L1450,100 L1300,1000 L1180,1000 Z" fill="#dcefcf" filter="url(#hb-blur-md)" />
          <path d="M1500,60 L1580,70 L1500,1000 L1390,1000 Z" fill="#9bd17a" opacity="0.6" filter="url(#hb-blur-md)" />
        </g>
        <rect width="1600" height="1000" fill="url(#hb-forest)" />

        {/* lamp glow on the left */}
        <rect width="1600" height="1000" fill="url(#hb-lamp)" />

        {/* light pillar rising from below */}
        <g opacity="0.7">
          <path
            d="M740,1000 C720,720 660,560 700,360 C740,560 780,720 800,1000 Z"
            fill="url(#hb-stream)"
            filter="url(#hb-blur-md)"
          />
          <path
            d="M820,1000 C840,760 900,600 870,420 C840,600 860,760 880,1000 Z"
            fill="url(#hb-stream)"
            opacity="0.55"
            filter="url(#hb-blur-md)"
          />
        </g>
        <ellipse cx="800" cy="1000" rx="520" ry="340" fill="url(#hb-book-glow)" filter="url(#hb-blur-md)" />

        {/* starfield */}
        <g fill="#ffffff">
          {[
            [180, 160, 1.4], [240, 110, 1.1], [360, 220, 1.2], [520, 140, 1.4],
            [640, 90, 1.1], [780, 160, 1.3], [880, 130, 1.0], [1000, 220, 1.4],
            [1120, 180, 1.2], [1240, 240, 1.3], [180, 460, 1.1], [320, 500, 1.3],
            [600, 380, 1.2], [800, 320, 1.4], [980, 380, 1.1], [1140, 420, 1.3],
            [70, 660, 1.0], [220, 780, 1.2], [1340, 720, 1.2], [1480, 820, 1.1],
            [420, 70, 1.0], [60, 320, 1.1], [1380, 130, 1.2], [1240, 50, 1.0],
          ].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} opacity={0.4 + (i % 4) * 0.12} />
          ))}
        </g>

        {/* floating formulas — distributed thinly so the hero text breathes */}
        <g
          fontFamily="ui-monospace, 'SF Mono', Menlo, monospace"
          opacity="0.72"
        >
          <text x="60" y="160" fontSize="22" fill="#c5daf5">ΣF = 0</text>
          <text x="1180" y="180" fontSize="22" fill="#fbecc4">E = k Q / r²</text>
          <text x="1280" y="320" fontSize="20" fill="#c5daf5">ε = − dΦ / dt</text>
          <text x="60" y="540" fontSize="20" fill="#fbecc4">v = f λ</text>
          <text x="60" y="780" fontSize="20" fill="#c5daf5">E₁ = E₂</text>
          <text x="1240" y="540" fontSize="22" fill="#fbecc4">ma = F − μmg cosθ</text>
          <text x="1180" y="780" fontSize="20" fill="#c5daf5">y(x, t) = A sin(kx − ωt)</text>
          <text x="1300" y="900" fontSize="18" fill="#fbecc4">v = √(GM / r)</text>
          <text x="60" y="900" fontSize="18" fill="#c5daf5">pV = nRT</text>
        </g>

        {/* subtle vignette */}
        <rect width="1600" height="1000" fill="url(#hb-vignette)" />
      </svg>

      {/* readability scrim — keeps the dark hero text legible by darkening center bottom */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/15 to-ink-950/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/55 via-ink-950/20 to-transparent" />
    </div>
  );
}
