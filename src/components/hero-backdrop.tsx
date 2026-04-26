import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const formulas = [
  { x: "8%", y: "18%", t: "ΣF = 0", c: "#c5daf5" },
  { x: "78%", y: "12%", t: "E = k Q / r²", c: "#fbecc4" },
  { x: "82%", y: "32%", t: "ε = − dΦ / dt", c: "#c5daf5" },
  { x: "10%", y: "44%", t: "v = f λ", c: "#fbecc4" },
  { x: "12%", y: "72%", t: "E₁ = E₂", c: "#c5daf5" },
  { x: "74%", y: "60%", t: "ma = F − μmg cosθ", c: "#fbecc4" },
  { x: "78%", y: "78%", t: "y(x,t) = A sin(kx − ωt)", c: "#c5daf5" },
];

const stars: Array<[string, string, number, number]> = [
  ["12%", "16%", 1.4, 0.55], ["18%", "10%", 1.1, 0.45], ["28%", "22%", 1.2, 0.6],
  ["38%", "14%", 1.4, 0.55], ["48%", "9%", 1.1, 0.45], ["58%", "16%", 1.3, 0.55],
  ["66%", "12%", 1, 0.5], ["76%", "22%", 1.4, 0.65], ["86%", "18%", 1.2, 0.5],
  ["94%", "24%", 1.3, 0.55], ["12%", "46%", 1.1, 0.5], ["24%", "50%", 1.3, 0.55],
  ["46%", "38%", 1.2, 0.6], ["62%", "32%", 1.4, 0.55], ["76%", "38%", 1.1, 0.5],
  ["88%", "42%", 1.3, 0.55], ["6%", "66%", 1, 0.5], ["18%", "78%", 1.2, 0.55],
  ["84%", "72%", 1.2, 0.55], ["92%", "82%", 1.1, 0.5], ["32%", "8%", 1, 0.5],
  ["6%", "32%", 1.1, 0.5], ["86%", "13%", 1.2, 0.55], ["78%", "5%", 1, 0.5],
];

/**
 * Full-bleed atmospheric backdrop for the hero.
 * CSS-first: layered radial gradients render in one paint pass with no SVG filters.
 * Only the tree silhouette + stars + formulas are real DOM/SVG. Much faster than
 * the previous all-SVG version with feGaussianBlur layers.
 */
export function HeroBackdrop({ className }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 overflow-hidden",
        // base sky
        "bg-[linear-gradient(180deg,#070d1c_0%,#0d1832_55%,#13243f_100%)]",
        className,
      )}
    >
      {/* lamp glow — top-left */}
      <div
        className="absolute -left-[12%] -top-[18%] h-[60%] w-[60%] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,212,154,0.55), rgba(232,184,100,0.18) 45%, transparent 75%)",
        }}
      />
      {/* forest light — right */}
      <div
        className="absolute right-[-8%] top-[-6%] h-[80%] w-[55%] opacity-80"
        style={{
          background:
            "radial-gradient(closest-side, rgba(220,239,207,0.5), rgba(90,138,74,0.25) 50%, transparent 78%)",
        }}
      />
      {/* book light pillar — bottom center */}
      <div
        className="absolute left-1/2 bottom-[-30%] h-[110%] w-[70%] -translate-x-1/2 opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,233,184,0.55), rgba(155,188,255,0.30) 45%, transparent 78%)",
        }}
      />
      {/* warm ambient floor */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0d2014]/95 via-[#0d2014]/55 to-transparent" />

      {/* tree silhouettes — small inline SVG */}
      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYEnd slice"
        className="absolute inset-x-0 bottom-0 h-[55%] w-full"
      >
        <g fill="#0c1f15" opacity="0.85">
          <path d="M1140,1000 L1140,560 C1180,540 1210,500 1230,460 C1250,500 1280,540 1320,560 L1320,1000 Z" />
          <path d="M1280,1000 L1280,500 C1320,478 1356,440 1378,395 C1400,440 1438,478 1478,500 L1478,1000 Z" />
          <path d="M1430,1000 L1430,470 C1470,450 1504,410 1524,366 C1544,410 1582,450 1600,468 L1600,1000 Z" />
        </g>
      </svg>

      {/* starfield */}
      <div className="absolute inset-0">
        {stars.map(([x, y, r, o], i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: x,
              top: y,
              width: `${r * 2}px`,
              height: `${r * 2}px`,
              opacity: o,
            }}
          />
        ))}
      </div>

      {/* floating formulas — HTML overlay so they never overflow the container */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}
      >
        {formulas.map((f) => (
          <span
            key={f.t}
            className="absolute whitespace-nowrap text-[clamp(13px,1.2vw,20px)] tracking-tight"
            style={{ left: f.x, top: f.y, color: f.c, opacity: 0.6 }}
          >
            {f.t}
          </span>
        ))}
      </div>

      {/* readability scrim */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/65 via-ink-950/15 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </div>
  );
}
