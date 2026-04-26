import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * Atmospheric brand visual — a dark "forest of physics" scene.
 * An open book emits a column of light that scatters into floating formulas
 * and starlight, with a green tree-line on the right and an amber desk lamp
 * on the left. Pure SVG.
 */
export function BrandVision({ className }: Props) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] ring-1 ring-ink-900/[0.12] shadow-elevate",
        className,
      )}
    >
      <svg
        viewBox="0 0 1600 1000"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="高校物理専門塾「物理の森」のブランドビジュアル — 開いた本から現象と数式が立ち上がる、夜の森の書斎"
      >
        <defs>
          <linearGradient id="bv-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#070d1c" />
            <stop offset="55%" stopColor="#0d1832" />
            <stop offset="100%" stopColor="#13243f" />
          </linearGradient>
          <linearGradient id="bv-forest" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a3a26" stopOpacity="0.0" />
            <stop offset="40%" stopColor="#1a3a26" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0d2014" stopOpacity="0.95" />
          </linearGradient>
          <radialGradient id="bv-lamp" cx="0.18" cy="0.32" r="0.42">
            <stop offset="0%" stopColor="#ffd49a" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#e8b864" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bv-book-glow" cx="0.5" cy="0.55" r="0.38">
            <stop offset="0%" stopColor="#ffe9b8" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#9bbcff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#000022" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bv-forest-light" cx="0.92" cy="0.32" r="0.4">
            <stop offset="0%" stopColor="#dcefcf" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#5a8a4a" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bv-stream" x1="0.5" y1="1" x2="0.5" y2="0">
            <stop offset="0%" stopColor="#fff5d6" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#7eb1ff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#7eb1ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bv-page" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbecc4" />
            <stop offset="100%" stopColor="#d6b67a" />
          </linearGradient>
          <filter id="bv-blur-sm" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="bv-blur-md" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        {/* sky / room base */}
        <rect width="1600" height="1000" fill="url(#bv-sky)" />

        {/* forest light on the right */}
        <rect width="1600" height="1000" fill="url(#bv-forest-light)" />

        {/* faint tree silhouettes on the right */}
        <g fill="#0c1f15" opacity="0.85">
          <path d="M1140,1000 L1140,560 C1180,540 1210,500 1230,460 C1250,500 1280,540 1320,560 L1320,1000 Z" />
          <path d="M1280,1000 L1280,500 C1320,478 1356,440 1378,395 C1400,440 1438,478 1478,500 L1478,1000 Z" />
          <path d="M1430,1000 L1430,470 C1470,450 1504,410 1524,366 C1544,410 1582,450 1600,468 L1600,1000 Z" />
        </g>

        {/* misty light shafts through the forest */}
        <g opacity="0.32">
          <path d="M1340,80 L1450,100 L1300,1000 L1180,1000 Z" fill="#dcefcf" filter="url(#bv-blur-md)" />
          <path d="M1500,60 L1580,70 L1500,1000 L1390,1000 Z" fill="#9bd17a" opacity="0.6" filter="url(#bv-blur-md)" />
        </g>
        <rect width="1600" height="1000" fill="url(#bv-forest)" />

        {/* ambient lamp glow on the left */}
        <rect width="1600" height="1000" fill="url(#bv-lamp)" />

        {/* particle / starfield */}
        <g fill="#ffffff">
          {[
            [180, 160, 1.8], [240, 110, 1.2], [360, 220, 1.4], [520, 140, 1.6],
            [640, 90, 1.3], [780, 160, 1.5], [880, 130, 1.2], [1000, 220, 1.6],
            [1120, 180, 1.4], [1240, 240, 1.5], [180, 460, 1.3], [320, 500, 1.5],
            [600, 380, 1.4], [800, 320, 1.6], [980, 380, 1.3], [1140, 420, 1.5],
            [70, 660, 1.2], [220, 780, 1.4], [1340, 720, 1.4], [1480, 820, 1.3],
          ].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} opacity={0.55 + (i % 3) * 0.15} />
          ))}
        </g>

        {/* light stream rising from the book */}
        <g opacity="0.85">
          <path
            d="M740,720 C720,500 660,360 700,140 C740,360 780,500 800,720 Z"
            fill="url(#bv-stream)"
            filter="url(#bv-blur-sm)"
          />
          <path
            d="M820,720 C840,540 900,400 870,200 C840,400 860,540 880,720 Z"
            fill="url(#bv-stream)"
            opacity="0.55"
            filter="url(#bv-blur-sm)"
          />
        </g>

        {/* main glow centered on the book */}
        <circle cx="800" cy="720" r="380" fill="url(#bv-book-glow)" filter="url(#bv-blur-sm)" />

        {/* desk plane */}
        <path d="M0,820 L1600,820 L1600,1000 L0,1000 Z" fill="#1a1208" opacity="0.92" />
        <path d="M0,820 L1600,820 L1600,830 L0,830 Z" fill="#3a2a14" opacity="0.6" />

        {/* book — left page */}
        <g transform="translate(800 870) rotate(-3)">
          <path d="M-300,-160 L-10,-160 L-10,40 L-310,30 Z" fill="url(#bv-page)" />
          <path d="M-300,-160 L-10,-160 L-10,40 L-310,30 Z" fill="#000" opacity="0.04" />
          {/* lines */}
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={i}
              x1="-280"
              y1={-130 + i * 22}
              x2="-40"
              y2={-130 + i * 22}
              stroke="#7a5a25"
              strokeWidth="1.5"
              opacity="0.35"
            />
          ))}
          {/* small diagram */}
          <g stroke="#5a3a14" strokeWidth="1.6" fill="none" opacity="0.6">
            <ellipse cx="-180" cy="-30" rx="55" ry="22" />
            <line x1="-180" y1="-30" x2="-150" y2="-50" />
            <circle cx="-150" cy="-50" r="3" fill="#5a3a14" />
          </g>
        </g>

        {/* book — right page */}
        <g transform="translate(800 870) rotate(3)">
          <path d="M10,-160 L300,-160 L310,30 L10,40 Z" fill="url(#bv-page)" />
          <path d="M10,-160 L300,-160 L310,30 L10,40 Z" fill="#000" opacity="0.05" />
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={i}
              x1="40"
              y1={-130 + i * 22}
              x2="280"
              y2={-130 + i * 22}
              stroke="#7a5a25"
              strokeWidth="1.5"
              opacity="0.35"
            />
          ))}
          <g fill="#5a3a14" opacity="0.55" fontFamily="serif" fontSize="13">
            <text x="40" y="-90">問題</text>
            <text x="40" y="-22">解説</text>
          </g>
        </g>

        {/* spine */}
        <rect x="795" y="710" width="10" height="160" fill="#3a2a14" opacity="0.5" />

        {/* coffee mug — far left */}
        <g transform="translate(110 880)">
          <rect x="-46" y="-72" width="92" height="92" rx="8" fill="#0d0d10" />
          <rect x="46" y="-58" width="22" height="50" rx="6" fill="none" stroke="#0d0d10" strokeWidth="6" />
          <text x="0" y="0" fontFamily="serif" fontSize="9" fill="#caa34b" textAnchor="middle" opacity="0.85">
            Physics
          </text>
        </g>

        {/* tablet — far right */}
        <g transform="translate(1430 870) rotate(-4)">
          <rect x="-95" y="-65" width="190" height="130" rx="8" fill="#101a2a" stroke="#3b7cd9" strokeWidth="1" strokeOpacity="0.6" />
          <text x="0" y="-38" fontFamily="serif" fontSize="11" fill="#c5daf5" textAnchor="middle">
            言語化 → 立式 → 演習
          </text>
          {/* mini diagram */}
          <g stroke="#9bbcff" strokeWidth="1.2" fill="none" opacity="0.85">
            <path d="M-70,10 L-30,-15 L10,15 L50,-10 L80,15" />
            <circle cx="-70" cy="10" r="2" fill="#9bbcff" />
            <circle cx="-30" cy="-15" r="2" fill="#9bbcff" />
            <circle cx="10" cy="15" r="2" fill="#9bbcff" />
            <circle cx="50" cy="-10" r="2" fill="#9bbcff" />
            <circle cx="80" cy="15" r="2" fill="#9bbcff" />
          </g>
        </g>

        {/* desk lamp — far left top */}
        <g transform="translate(80 230)">
          <circle cx="0" cy="0" r="44" fill="#0d0d10" />
          <circle cx="-8" cy="-4" r="20" fill="#ffd49a" opacity="0.85" />
          <line x1="20" y1="20" x2="60" y2="120" stroke="#0d0d10" strokeWidth="6" />
        </g>

        {/* floating formulas — labels */}
        <g fill="#dcefcf" fontFamily="serif" opacity="0.92">
          <text x="170" y="320" fontSize="26" fill="#c5daf5">∑F⃗ = 0</text>
          <text x="120" y="358" fontSize="13" fill="#9bbcff" opacity="0.85">力のつり合い</text>

          <text x="320" y="430" fontSize="22" fill="#dbe7ff">ma = F − μmg cosθ</text>

          <text x="440" y="295" fontSize="22" fill="#fbecc4">v = √(GM/r)</text>
          <text x="440" y="328" fontSize="14" fill="#caa34b" opacity="0.85">円運動 / 万有引力</text>

          <text x="700" y="240" fontSize="26" fill="#fff5d6">E⃗ = k Q/r² r̂</text>

          <text x="700" y="500" fontSize="22" fill="#c5daf5">y = x tanθ − g/(2v₀² cos²θ) x²</text>
          <text x="700" y="528" fontSize="13" fill="#9bbcff" opacity="0.85">放物運動</text>

          <text x="980" y="290" fontSize="22" fill="#fbecc4">y(x,t) = A sin(kx − ωt)</text>
          <text x="980" y="318" fontSize="13" fill="#caa34b" opacity="0.85">波の重ね合わせ</text>

          <text x="1080" y="430" fontSize="22" fill="#dbe7ff">ε = − dΦ/dt</text>
          <text x="1080" y="458" fontSize="13" fill="#9bbcff" opacity="0.85">電磁誘導</text>

          <text x="320" y="560" fontSize="22" fill="#fbecc4">E₁ = E₂</text>
          <text x="320" y="588" fontSize="13" fill="#caa34b" opacity="0.85">エネルギー保存</text>

          <text x="1240" y="540" fontSize="22" fill="#dbe7ff">1/f = 1/u + 1/v</text>

          <text x="1300" y="350" fontSize="20" fill="#fbecc4">等加速度運動</text>
        </g>

        {/* tagline overlay */}
        <g transform="translate(1130 580)" fill="#fbecc4" fontFamily="serif">
          <text fontSize="44" letterSpacing="-1.5">わからないが、</text>
          <text y="56" fontSize="44" letterSpacing="-1.5">わかるに変わる瞬間を。</text>
          <text y="100" fontSize="14" fill="#caa34b" letterSpacing="3">構造で理解する高校物理専門塾</text>
          <text y="124" fontSize="18" fill="#fff5d6" letterSpacing="1.5">物理の森 / Physics Forest</text>
        </g>

        {/* very subtle vignette */}
        <radialGradient id="bv-vignette" cx="0.5" cy="0.5" r="0.85">
          <stop offset="60%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
        </radialGradient>
        <rect width="1600" height="1000" fill="url(#bv-vignette)" />
      </svg>
    </div>
  );
}
