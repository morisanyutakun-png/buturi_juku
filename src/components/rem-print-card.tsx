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
  // viewBox（ラベル用に上下に余白を確保）
  const W = 380;
  const H = 170;

  // X 座標
  const wallX = 26; // 壁の右面（ばねの固定端）
  const O = 206; // 自然長位置（小物体の中心）
  const blockW = 44;
  const blockH = 44;
  const stretch = 52; // O から右に引きのばした距離（x の表示）
  const blockCenterX = O + stretch;
  const blockLeftX = blockCenterX - blockW / 2;

  // Y 座標
  const floorY = 124;
  const blockTopY = floorY - blockH; // 80
  const blockMidY = blockTopY + blockH / 2; // 102（ばねが接続する高さ）

  // ラベル衝突を避けるため、ばね振幅・最高点を変数化
  const springAmp = 10;
  const springTopY = blockMidY - springAmp; // ばねが取り得る最高点

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn("h-auto w-full", className)}
      aria-hidden
    >
      <defs>
        <pattern
          id="rem-hatch"
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="5" stroke="#142341" strokeWidth="0.7" />
        </pattern>
        <linearGradient id="rem-block" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3a86c" />
          <stop offset="55%" stopColor="#e28040" />
          <stop offset="100%" stopColor="#b35f27" />
        </linearGradient>
        {/* ばね線材のメタリックなグラデ（上が明るく下が暗い） */}
        <linearGradient id="rem-wire" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5b6885" />
          <stop offset="50%" stopColor="#1e3056" />
          <stop offset="100%" stopColor="#0a1528" />
        </linearGradient>
        {/* コイル前面の細いハイライト */}
        <linearGradient id="rem-wire-hi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dfe7f5" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#dfe7f5" stopOpacity="0" />
        </linearGradient>
        <marker
          id="rem-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="#142341" />
        </marker>
      </defs>

      {/* 左壁（ハッチング） */}
      <rect x="14" y="20" width="12" height={floorY - 20} fill="url(#rem-hatch)" />
      <line x1={wallX} y1="16" x2={wallX} y2={floorY} stroke="#142341" strokeWidth="1.4" />

      {/* 床（実線 + ハッチング） */}
      <line x1="10" y1={floorY} x2={W - 6} y2={floorY} stroke="#142341" strokeWidth="1.4" />
      <g stroke="#142341" strokeWidth="0.7" opacity="0.95">
        {Array.from({ length: Math.floor((W - 16) / 9) }).map((_, i) => (
          <line key={i} x1={16 + i * 9} y1={floorY} x2={10 + i * 9} y2={floorY + 8} />
        ))}
      </g>

      {/* O の鉛直点線（ばね・床のレイヤーに先に描いて背面に） */}
      <line
        x1={O}
        y1={blockTopY - 20}
        x2={O}
        y2={floorY}
        stroke="#142341"
        strokeWidth="0.9"
        strokeDasharray="3 3"
        opacity="0.5"
      />

      {/* ばね */}
      <Spring x1={wallX} x2={blockLeftX} y={blockMidY} coils={14} amplitude={springAmp} />

      {/* k ラベル（ばね上、最高点より十分上 / O 点線とは x 方向で 30px 以上離す） */}
      <text
        x={Math.min((wallX + O) / 2, O - 32)}
        y={springTopY - 10}
        textAnchor="middle"
        fontSize="13"
        fontFamily="'Times New Roman', serif"
        fontStyle="italic"
        fill="#142341"
      >
        k
      </text>

      {/* O ラベル（点線の上、十分な余白） */}
      <text
        x={O}
        y={blockTopY - 26}
        textAnchor="middle"
        fontSize="13"
        fontFamily="'Times New Roman', serif"
        fontStyle="italic"
        fill="#142341"
      >
        O
      </text>

      {/* 小物体 m（グラデ + 微シャドウ） */}
      <g>
        {/* 影 */}
        <ellipse
          cx={blockCenterX}
          cy={floorY + 1}
          rx={blockW / 2 - 2}
          ry="1.6"
          fill="#142341"
          opacity="0.18"
        />
        {/* 本体 */}
        <rect
          x={blockLeftX}
          y={blockTopY}
          width={blockW}
          height={blockH}
          rx="3"
          fill="url(#rem-block)"
          stroke="#8e4a1c"
          strokeWidth="1.1"
        />
        {/* 上面ハイライト */}
        <rect
          x={blockLeftX + 1.5}
          y={blockTopY + 1.5}
          width={blockW - 3}
          height="2.5"
          rx="1"
          fill="#fff5e8"
          opacity="0.55"
        />
        {/* m ラベル（中央） */}
        <text
          x={blockCenterX}
          y={blockMidY + 6}
          textAnchor="middle"
          fontSize="17"
          fontFamily="'Times New Roman', serif"
          fontStyle="italic"
          fontWeight="500"
          fill="#fdfaf2"
        >
          m
        </text>
      </g>

      {/* F 矢印（ばね最高点より上、ブロック左面から左へ）。ラベルは紙色のピル背景で
          どの背景の上でも確実に読める形にする。 */}
      {(() => {
        const fY = springTopY - 4; // 88：ブロック上部 80 と ばね頂点 92 の間
        const fTail = blockLeftX + 10;
        const fHead = blockLeftX - 18;
        const labelX = fHead + 4; // 矢印の頭付近
        const labelY = fY - 12;
        return (
          <g>
            {/* 矢印（やや太め） */}
            <line
              x1={fTail}
              y1={fY}
              x2={fHead}
              y2={fY}
              stroke="#142341"
              strokeWidth="1.7"
              markerEnd="url(#rem-arrow)"
              strokeLinecap="round"
            />
            {/* ラベル背景の紙色ピル（視認性確保） */}
            <rect
              x={labelX - 7}
              y={labelY - 11}
              width="14"
              height="14"
              rx="3"
              fill="#fdfaf2"
              stroke="#142341"
              strokeWidth="0.6"
              opacity="0.96"
            />
            {/* F ラベル */}
            <text
              x={labelX}
              y={labelY}
              textAnchor="middle"
              fontSize="14"
              fontFamily="'Times New Roman', serif"
              fontStyle="italic"
              fontWeight="600"
              fill="#142341"
            >
              F
            </text>
          </g>
        );
      })()}

      {/* x ブラケット（床の下、O→ブロック左面） */}
      <g stroke="#142341" fill="none" strokeWidth="1">
        <line x1={O} y1={floorY + 14} x2={blockLeftX} y2={floorY + 14} />
        <line x1={O} y1={floorY + 10} x2={O} y2={floorY + 18} />
        <line x1={blockLeftX} y1={floorY + 10} x2={blockLeftX} y2={floorY + 18} />
      </g>
      <text
        x={(O + blockLeftX) / 2}
        y={floorY + 28}
        textAnchor="middle"
        fontSize="13"
        fontFamily="'Times New Roman', serif"
        fontStyle="italic"
        fill="#142341"
      >
        x
      </text>

      {/* x 軸（右上、正の向き） */}
      <line
        x1={W - 78}
        y1="34"
        x2={W - 20}
        y2="34"
        stroke="#142341"
        strokeWidth="1.4"
        markerEnd="url(#rem-arrow)"
        strokeLinecap="round"
      />
      <text
        x={W - 12}
        y="38"
        fontSize="13"
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
 * 真横から見たヘリックスを「微傾斜した楕円のチェイン」として描く。
 * 各コイルは縦長の楕円（rx < ry）で、わずかに傾けて並べることで
 * 3D 投影らしさを出す。隣接楕円は適度にオーバーラップさせ、
 * 一本のばねが連続して巻かれているように見せる。
 *
 *   コイル数 N、ピッチ p = (x2 - x1) / N
 *   楕円 rx = p · OVERLAP_RATIO （p/2 より大きく → 隣接と重なる）
 *   楕円 ry = amplitude
 *
 * さらに、上下振幅の中央高さに薄い水平ガイドを 1 本入れて、ばね全体の
 * 「軸」を視覚的に固定。両端は壁・ブロックの面に垂直に接続させる。
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
  const totalWidth = x2 - x1;
  const pitch = totalWidth / coils;

  // 楕円 rx：縦長 (rx < ry) になるよう pitch の 0.52 倍。傾けが視認できる比率にする。
  const rx = pitch * 0.52;
  const ry = amplitude;
  // 引き伸ばされたばねの「コイルが奥側に倒れる」感じを微傾斜で表現（CCW = 上が左）
  const tilt = -12;

  return (
    <g>
      {/* 軸線（ばね全体のガイド）— ごく薄く */}
      <line
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        stroke="#142341"
        strokeOpacity="0.10"
        strokeWidth="0.8"
      />

      {/* 1. 影：右下にわずかにオフセット */}
      <g opacity="0.18">
        {Array.from({ length: coils }, (_, i) => {
          const cx = x1 + (i + 0.5) * pitch;
          return (
            <ellipse
              key={i}
              cx={cx + 0.7}
              cy={y + 1.1}
              rx={rx}
              ry={ry}
              fill="none"
              stroke="#0a1528"
              strokeWidth="1.6"
              transform={`rotate(${tilt} ${cx + 0.7} ${y + 1.1})`}
            />
          );
        })}
      </g>

      {/* 2. 本線：縦グラデでメタリック */}
      {Array.from({ length: coils }, (_, i) => {
        const cx = x1 + (i + 0.5) * pitch;
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={y}
            rx={rx}
            ry={ry}
            fill="none"
            stroke="url(#rem-wire)"
            strokeWidth="1.55"
            strokeLinecap="round"
            transform={`rotate(${tilt} ${cx} ${y})`}
          />
        );
      })}

      {/* 3. 上半分のハイライト（sweep=0 で上回り） */}
      {Array.from({ length: coils }, (_, i) => {
        const cx = x1 + (i + 0.5) * pitch;
        return (
          <path
            key={i}
            d={`M ${-rx} 0 A ${rx} ${ry} 0 0 0 ${rx} 0`}
            fill="none"
            stroke="url(#rem-wire-hi)"
            strokeWidth="0.9"
            strokeLinecap="round"
            transform={`translate(${cx} ${y}) rotate(${tilt})`}
          />
        );
      })}

      {/* 端のコネクタ（壁面・ブロック面に垂直接続） */}
      <line x1={x1 - 0.5} y1={y} x2={x1 + 2.5} y2={y} stroke="#142341" strokeWidth="1.5" />
      <line x1={x2 - 2.5} y1={y} x2={x2 + 0.5} y2={y} stroke="#142341" strokeWidth="1.5" />
    </g>
  );
}
