import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * REM 復習プリント風モックアップ。
 *
 * 添付画像の雰囲気を SVG / HTML で再現。実画像は使用しない。
 * Hero の右側ビジュアルとして「成果物が想像できる」役割を持つ。
 *
 * - REM ヘッダ + 二重赤線（プリント定番のセパレータ）
 * - 「問題」見出し + 二重赤線
 * - 問題1：ばね質点（弾性力・F = -kx）の問題本文
 * - SVG のばね-質点-壁-床-x 軸の図
 * - 1〜3 の小問
 * - [20点] 配点ラベル
 * - 紙の縁ハイライト・微小な傾き・浮遊感のあるシャドウ
 */
export function RemPrintCard({ className }: Props) {
  return (
    <div
      className={cn(
        "relative w-full",
        // 紙の傾き（PC のみ）。モバイルでは正立して読みやすく。
        "lg:rotate-[2.2deg]",
        className,
      )}
    >
      {/* paper backdrop layer — adds depth like stacked sheets */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-4 -inset-y-3 hidden rounded-[1.6rem] bg-paper-muted/55 lg:block"
        style={{ transform: "rotate(-3deg)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-2 -inset-y-1.5 hidden rounded-[1.5rem] bg-paper-soft/85 lg:block"
        style={{ transform: "rotate(-1.2deg)" }}
      />

      {/* the print itself */}
      <article
        aria-label="REM 復習プリントの見本"
        className="relative aspect-[1/1.32] w-full overflow-hidden rounded-[1.25rem] bg-[#fdfaf2] ring-1 ring-ink-900/[0.10] shadow-elevate"
      >
        {/* faint paper grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(1200px 600px at 20% -10%, rgba(202,163,75,0.08), transparent 60%), radial-gradient(900px 500px at 110% 110%, rgba(59,124,217,0.05), transparent 55%)",
          }}
        />

        {/* very subtle ruled paper feel */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(20,35,65,1) 1px, transparent 1px)",
            backgroundSize: "100% 28px",
          }}
        />

        {/* content */}
        <div className="relative h-full px-5 py-4 sm:px-7 sm:py-6">
          {/* HEADER: REM | page no. */}
          <header className="flex items-baseline justify-between">
            <span
              className="font-mono text-[11px] sm:text-[12px] font-semibold tracking-[0.22em] text-ink-900"
            >
              REM
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] text-ink-500">
              1
            </span>
          </header>
          {/* double red line */}
          <div className="mt-1.5 h-[3px] w-full bg-warm-deep/85" />
          <div className="mt-[2px] h-[1px] w-full bg-warm-deep/70" />

          {/* 問題 heading */}
          <h3
            className="mt-5 sm:mt-6 font-serif text-[1rem] sm:text-[1.15rem] tracking-[-0.01em] text-warm-deep"
          >
            問題
          </h3>
          <div className="mt-1 h-[1.5px] w-full bg-warm-deep/80" />
          <div className="mt-[2px] h-[1px] w-full bg-warm-deep/50" />

          {/* 問題1 sub-title */}
          <p className="mt-4 sm:mt-5 font-serif text-[12px] sm:text-[13px] font-medium text-warm-deep">
            問題 1
          </p>

          {/* problem body — 漢字 + ばね問題 */}
          <div
            className="mt-2 space-y-1.5 font-serif text-[10.5px] leading-[1.7] text-ink-900 sm:text-[11.5px] sm:leading-[1.78]"
            style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
          >
            <p>
              なめらかな水平面上に、質量 <Math>m</Math> の小物体が置かれている。
              小物体は、ばね定数 <Math>k</Math> の軽いばねにつながれており、
              ばねの他端は左側の壁に固定されている。
            </p>
            <p>
              小物体の中心が <Math>O</Math> にあるとき、ばねは自然長である。
              いま、小物体を <Math>O</Math> から右向きに距離 <Math>x</Math> だけ
              引きのばして静かに手を離す。
            </p>
          </div>

          {/* the spring–mass figure */}
          <SpringFigure className="mt-3 sm:mt-4" />

          {/* numbered sub-questions */}
          <ol className="mt-3 sm:mt-4 list-decimal space-y-1 pl-[1.15em] font-serif text-[10px] leading-[1.7] text-ink-900 sm:text-[11px] sm:leading-[1.75]">
            <li>
              このとき、小物体にはたらくばねの力を、向きを含めて文字式で答えよ。
            </li>
            <li>
              小物体の加速度を、向きを含めて文字式で答えよ。
            </li>
            <li>
              小物体を <Math>O</Math> から右向きに距離 <Math>A</Math> だけ
              引きのばして静かに手を離す。小物体が初めて <Math>O</Math> を
              通過するときの速さを、文字式で答えよ。
            </li>
          </ol>

          {/* footer: 配点 */}
          <p className="absolute bottom-3 left-5 sm:bottom-4 sm:left-7 font-serif text-[10.5px] sm:text-[11.5px] text-warm-deep">
            [20 点]
          </p>
        </div>

        {/* subtle inner highlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] ring-1 ring-inset ring-white/60"
        />
      </article>
    </div>
  );
}

function Math({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-serif italic"
      style={{ fontFamily: "'Times New Roman', 'Hiragino Mincho ProN', serif" }}
    >
      {" "}
      {children}{" "}
    </span>
  );
}

function SpringFigure({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 110"
      className={cn("h-auto w-full", className)}
      aria-hidden
    >
      <defs>
        <pattern
          id="rem-hatch"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="6" stroke="#142341" strokeWidth="0.9" />
        </pattern>
      </defs>

      {/* left wall (hatched) */}
      <rect x="14" y="20" width="10" height="68" fill="url(#rem-hatch)" />
      <line x1="24" y1="18" x2="24" y2="90" stroke="#142341" strokeWidth="1.2" />

      {/* floor */}
      <line x1="14" y1="88" x2="306" y2="88" stroke="#142341" strokeWidth="1.2" />
      <g stroke="#142341" strokeWidth="0.8">
        {Array.from({ length: 24 }).map((_, i) => (
          <line key={i} x1={20 + i * 12} y1="88" x2={14 + i * 12} y2="98" />
        ))}
      </g>

      {/* spring (zigzag) */}
      <SpringCoil x1={24} x2={188} y={62} />

      {/* equilibrium guide (vertical dashed at O) */}
      <line
        x1="148"
        y1="20"
        x2="148"
        y2="88"
        stroke="#142341"
        strokeWidth="0.9"
        strokeDasharray="3 3"
        opacity="0.55"
      />
      {/* O label */}
      <text
        x="148"
        y="16"
        textAnchor="middle"
        fontSize="10"
        fontFamily="'Times New Roman', serif"
        fontStyle="italic"
        fill="#142341"
      >
        O
      </text>

      {/* k label above spring */}
      <text
        x="92"
        y="50"
        textAnchor="middle"
        fontSize="10"
        fontFamily="'Times New Roman', serif"
        fontStyle="italic"
        fill="#142341"
      >
        k
      </text>

      {/* mass block (warm red) — pulled right by x */}
      <g transform="translate(188 44)">
        <rect
          width="36"
          height="34"
          rx="2"
          fill="#e28040"
          stroke="#b35f27"
          strokeWidth="1"
        />
        <text
          x="18"
          y="22"
          textAnchor="middle"
          fontSize="13"
          fontFamily="'Times New Roman', serif"
          fontStyle="italic"
          fontWeight="500"
          fill="#fdfaf2"
        >
          m
        </text>
      </g>

      {/* F arrow on the left face of the block */}
      <g stroke="#142341" strokeWidth="1.1" fill="#142341">
        <line x1="200" y1="62" x2="180" y2="62" />
        <polygon points="180,62 184,60 184,64" />
      </g>
      <text
        x="184"
        y="56"
        fontSize="10"
        fontFamily="'Times New Roman', serif"
        fontStyle="italic"
        fill="#142341"
      >
        F
      </text>

      {/* x bracket below floor — from O (148) to block-left (188) */}
      <g stroke="#142341" strokeWidth="1" fill="none">
        <line x1="148" y1="100" x2="188" y2="100" />
        <polygon points="148,100 152,98 152,102" fill="#142341" stroke="none" />
        <polygon points="188,100 184,98 184,102" fill="#142341" stroke="none" />
      </g>
      <text
        x="168"
        y="109"
        textAnchor="middle"
        fontSize="10"
        fontFamily="'Times New Roman', serif"
        fontStyle="italic"
        fill="#142341"
      >
        x
      </text>

      {/* x-axis arrow on the right */}
      <g stroke="#142341" strokeWidth="1.1" fill="#142341">
        <line x1="252" y1="34" x2="298" y2="34" />
        <polygon points="298,34 292,31 292,37" />
      </g>
      <text
        x="304"
        y="37"
        fontSize="10"
        fontFamily="'Times New Roman', serif"
        fontStyle="italic"
        fill="#142341"
      >
        x
      </text>
    </svg>
  );
}

/**
 * ばねの zigzag コイル。x1→x2 を 14 セグメントで上下に振る。
 */
function SpringCoil({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  const segments = 14;
  const amplitude = 8;
  const dx = (x2 - x1) / segments;
  const points: string[] = [];
  points.push(`${x1},${y}`);
  for (let i = 1; i <= segments; i += 1) {
    const x = x1 + dx * i - dx / 2;
    const offset = i % 2 === 0 ? -amplitude : amplitude;
    points.push(`${x},${y + offset}`);
  }
  points.push(`${x2},${y}`);
  return (
    <polyline
      points={points.join(" ")}
      fill="none"
      stroke="#142341"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  );
}
