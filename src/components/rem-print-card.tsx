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
              なめらかな水平面上に、質量 <Var>m</Var> の小物体が置かれている。
              小物体は、ばね定数 <Var>k</Var> の軽いばねにつながれており、
              ばねの他端は左側の壁に固定されている。
            </p>
            <p>
              小物体の中心が <Var>O</Var> にあるとき、ばねは自然長である。
              いま、小物体を <Var>O</Var> から右向きに距離 <Var>x</Var> だけ
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
              小物体を <Var>O</Var> から右向きに距離 <Var>A</Var> だけ
              引きのばして静かに手を離す。小物体が初めて <Var>O</Var> を
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

function Var({ children }: { children: React.ReactNode }) {
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
  // 図全体の座標系
  const W = 360;
  const H = 130;

  // 主要 X 座標
  const wallX = 28; // 壁の右面（ばねの固定端）
  const O = 200; // 自然長位置（小物体の中心）
  const blockW = 38;
  const blockH = 34;
  const stretch = 50; // O から右に引きのばした距離（x の表示）
  const blockCenterX = O + stretch;
  const blockLeftX = blockCenterX - blockW / 2;

  // Y 座標
  const floorY = 100;
  const blockTopY = floorY - blockH;
  const blockMidY = blockTopY + blockH / 2; // ばねが接続する高さ

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
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

      {/* 左壁（ハッチング） */}
      <rect x="18" y="18" width="10" height={floorY - 18} fill="url(#rem-hatch)" />
      <line x1={wallX} y1="14" x2={wallX} y2={floorY} stroke="#142341" strokeWidth="1.4" />

      {/* 床 */}
      <line x1="14" y1={floorY} x2={W - 8} y2={floorY} stroke="#142341" strokeWidth="1.4" />
      <g stroke="#142341" strokeWidth="0.8">
        {Array.from({ length: Math.floor((W - 24) / 12) }).map((_, i) => (
          <line key={i} x1={20 + i * 12} y1={floorY} x2={14 + i * 12} y2={floorY + 10} />
        ))}
      </g>

      {/* ばね（ヘリカルコイル） */}
      <Spring x1={wallX} x2={blockLeftX} y={blockMidY} coils={16} amplitude={11} />

      {/* O の鉛直点線 */}
      <line
        x1={O}
        y1="22"
        x2={O}
        y2={floorY}
        stroke="#142341"
        strokeWidth="0.9"
        strokeDasharray="3 3"
        opacity="0.55"
      />
      <text
        x={O}
        y="16"
        textAnchor="middle"
        fontSize="11"
        fontFamily="'Times New Roman', serif"
        fontStyle="italic"
        fill="#142341"
      >
        O
      </text>

      {/* k ラベル（ばね上） */}
      <text
        x={(wallX + blockLeftX) / 2}
        y={blockMidY - 22}
        textAnchor="middle"
        fontSize="11"
        fontFamily="'Times New Roman', serif"
        fontStyle="italic"
        fill="#142341"
      >
        k
      </text>

      {/* 小物体 m */}
      <g transform={`translate(${blockLeftX} ${blockTopY})`}>
        <rect
          width={blockW}
          height={blockH}
          rx="2"
          fill="#e28040"
          stroke="#b35f27"
          strokeWidth="1"
        />
        <text
          x={blockW / 2}
          y={blockH / 2 + 5}
          textAnchor="middle"
          fontSize="14"
          fontFamily="'Times New Roman', serif"
          fontStyle="italic"
          fontWeight="500"
          fill="#fdfaf2"
        >
          m
        </text>
      </g>

      {/* F 矢印（ブロックの左面、左向き） */}
      <g stroke="#142341" strokeWidth="1.2" fill="#142341">
        <line x1={blockLeftX + 14} y1={blockMidY} x2={blockLeftX - 6} y2={blockMidY} />
        <polygon
          points={`${blockLeftX - 6},${blockMidY} ${blockLeftX - 1},${blockMidY - 2.5} ${blockLeftX - 1},${blockMidY + 2.5}`}
        />
      </g>
      <text
        x={blockLeftX - 2}
        y={blockMidY - 6}
        fontSize="11"
        fontFamily="'Times New Roman', serif"
        fontStyle="italic"
        fill="#142341"
      >
        F
      </text>

      {/* x ブラケット（O から ブロック左面まで、床より下） */}
      <g stroke="#142341" strokeWidth="1" fill="none">
        <line x1={O} y1={floorY + 12} x2={blockLeftX} y2={floorY + 12} />
        <line x1={O} y1={floorY + 8} x2={O} y2={floorY + 16} />
        <line x1={blockLeftX} y1={floorY + 8} x2={blockLeftX} y2={floorY + 16} />
      </g>
      <text
        x={(O + blockLeftX) / 2}
        y={floorY + 24}
        textAnchor="middle"
        fontSize="11"
        fontFamily="'Times New Roman', serif"
        fontStyle="italic"
        fill="#142341"
      >
        x
      </text>

      {/* x 軸（右上、座標の正の向き） */}
      <g stroke="#142341" strokeWidth="1.2" fill="#142341">
        <line x1={W - 70} y1="34" x2={W - 18} y2="34" />
        <polygon points={`${W - 18},34 ${W - 24},31 ${W - 24},37`} />
      </g>
      <text
        x={W - 12}
        y="38"
        fontSize="11"
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
 * ヘリカルコイル形状のばね。
 *
 * 各コイルを 1 本のキュービックベジェで描く。control 点を可視振幅より
 * はるかに上下に押し出すことで、中央通過時の接線がほぼ垂直になり、
 * 連続させると「タイトな S 字 = ヘリックスの真横投影」に見える。
 *
 *   コイル i : (xa, y) → (xb, y)
 *     control1 = (cx, y − amp * OVER)
 *     control2 = (cx, y + amp * OVER)
 *
 * P0=(0,0), P1=(0.5,-H), P2=(0.5,+H), P3=(1,0) のキュービックは
 *   Y(t) = 3H · t(1−t)(2t−1)
 * を満たし、t = (3 ± √3)/6 で極値 ±H · 0.2887 をとる。
 * よって、画面上で見せたい振幅 amp に対して
 *   H ≈ amp · 3.46
 * を control に与えれば、ピークがちょうど ±amp になる。
 *
 * さらに、3D らしさを出すため、各コイルの「上アーチ（前面）」だけを
 * 太い実線、「下アーチ（背面）」を細めの線で描く 2 パス構成にする。
 */
function Spring({
  x1,
  x2,
  y,
  coils,
  amplitude,
}: {
  x1: number;
  x2: number;
  y: number;
  coils: number;
  amplitude: number;
}) {
  const pitch = (x2 - x1) / coils;
  // 可視振幅 amp に合わせて control 点を補正（ピーク = 0.2887 H）
  const H = amplitude * 3.46;

  // 1 本繋がった S 字パス
  let d = `M ${x1} ${y}`;
  for (let i = 0; i < coils; i += 1) {
    const xa = x1 + i * pitch;
    const xb = xa + pitch;
    const cx = xa + pitch * 0.5;
    d += ` C ${cx} ${y - H} ${cx} ${y + H} ${xb} ${y}`;
  }

  return (
    <g>
      {/* 背景の柔らかい影（厚みの錯覚） */}
      <path
        d={d}
        fill="none"
        stroke="#142341"
        strokeOpacity="0.12"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* 主線 */}
      <path
        d={d}
        fill="none"
        stroke="#142341"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 端のコネクタ（壁面・ブロック面に確実に接続させる） */}
      <line x1={x1 - 1} y1={y} x2={x1 + 0.5} y2={y} stroke="#142341" strokeWidth="1.4" />
      <line x1={x2 - 0.5} y1={y} x2={x2 + 1} y2={y} stroke="#142341" strokeWidth="1.4" />
    </g>
  );
}
