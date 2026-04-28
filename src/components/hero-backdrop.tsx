import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const formulas = [
  { x: "5%", y: "16%", t: "ΣF = 0" },
  { x: "78%", y: "10%", t: "E = k Q / r²" },
  { x: "6%", y: "44%", t: "v = f λ" },
  { x: "70%", y: "60%", t: "ma = F − μmg cosθ" },
  { x: "72%", y: "82%", t: "y(x,t) = A sin(kx − ωt)" },
];

const dots: Array<[string, string, number, number]> = [
  ["18%", "12%", 1.6, 0.18], ["38%", "16%", 1.4, 0.18],
  ["58%", "10%", 1.4, 0.18], ["76%", "22%", 1.4, 0.2],
  ["94%", "24%", 1.4, 0.18], ["24%", "50%", 1.4, 0.18],
  ["62%", "32%", 1.4, 0.18], ["88%", "42%", 1.4, 0.18],
  ["18%", "78%", 1.3, 0.16], ["84%", "72%", 1.3, 0.16],
  ["46%", "38%", 1.3, 0.16], ["8%", "62%", 1.2, 0.14],
];

/**
 * Light pastel atmospheric backdrop for the hero.
 * Cream paper base with soft brand/warm/forest washes — airy, not dark.
 */
export function HeroBackdrop({ className }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 overflow-hidden",
        // base — warm paper, slightly lifted at the top
        "bg-[linear-gradient(180deg,#fefcf6_0%,#fbf5e6_55%,#f7f0de_100%)]",
        className,
      )}
    >
      {/* brand wash — top-left */}
      <div
        className="absolute -left-[18%] -top-[22%] h-[80%] w-[70%] opacity-90"
        style={{
          background:
            "radial-gradient(closest-side, rgba(155,188,255,0.55), rgba(59,124,217,0.18) 50%, transparent 78%)",
        }}
      />
      {/* warm wash — top-right */}
      <div
        className="absolute right-[-15%] top-[-15%] h-[75%] w-[65%] opacity-90"
        style={{
          background:
            "radial-gradient(closest-side, rgba(251,221,196,0.7), rgba(226,128,64,0.18) 50%, transparent 80%)",
        }}
      />
      {/* gold halo — center */}
      <div
        className="absolute left-1/2 top-1/3 h-[55%] w-[55%] -translate-x-1/2 opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, rgba(243,228,182,0.5), rgba(202,163,75,0.10) 55%, transparent 80%)",
        }}
      />
      {/* forest mist — bottom-left */}
      <div
        className="absolute -left-[10%] bottom-[-20%] h-[65%] w-[55%] opacity-80"
        style={{
          background:
            "radial-gradient(closest-side, rgba(216,228,217,0.6), rgba(89,122,91,0.12) 55%, transparent 82%)",
        }}
      />
      {/* very subtle paper grain via tiny noise gradient — desktop only.
          On mobile it's invisibly small but still costs paint time. */}
      <div
        className="absolute inset-0 hidden opacity-[0.05] mix-blend-multiply sm:block"
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgba(20,35,65,0.06) 1px, transparent 1px), linear-gradient(-45deg, rgba(20,35,65,0.04) 1px, transparent 1px)",
          backgroundSize: "26px 26px, 26px 26px",
        }}
      />

      {/* gentle physics wave near the bottom — desktop only */}
      <svg
        viewBox="0 0 1600 200"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 hidden h-[18%] w-full opacity-50 sm:block"
      >
        <defs>
          <linearGradient id="hb-wave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b7cd9" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b7cd9" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#e28040" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,110 C200,40 380,180 600,110 C820,40 1000,180 1200,110 C1380,50 1500,150 1600,110"
          stroke="url(#hb-wave)"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M0,130 C200,60 380,200 600,130 C820,60 1000,200 1200,130 C1380,70 1500,170 1600,130"
          stroke="url(#hb-wave)"
          strokeWidth="0.9"
          fill="none"
          opacity="0.55"
        />
      </svg>

      {/* constellation dots — hidden on mobile (12 absolute spans we don't need) */}
      <div className="absolute inset-0 hidden sm:block">
        {dots.map(([x, y, r, o], i) => (
          <span
            key={i}
            className="absolute rounded-full bg-ink-900"
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

      {/* floating formulas — soft ink, kept inside the safe gutters */}
      <div
        className="absolute inset-0 hidden lg:block text-ink-900"
        style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}
      >
        {formulas.map((f) => (
          <span
            key={f.t}
            className="absolute whitespace-nowrap text-[clamp(13px,1.15vw,19px)] tracking-tight opacity-[0.18]"
            style={{ left: f.x, top: f.y }}
          >
            {f.t}
          </span>
        ))}
      </div>

      {/* very subtle vignette to keep edges grounded */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(20,35,65,0.07) 100%)",
        }}
      />
    </div>
  );
}
