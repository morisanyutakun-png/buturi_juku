import { Container } from "@/components/container";

export function WhiteboardFlow() {
  return (
    <section
      aria-labelledby="whiteboard-heading"
      className="relative overflow-hidden border-y border-ink-900/[0.06] bg-paper"
    >
      {/* notebook ruling */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0, transparent 39px, #142341 39px, #142341 40px)",
        }}
      />

      <Container className="relative py-24 sm:py-32">
        <p className="inline-flex items-center gap-2 text-[11px] sm:text-[10px] font-medium uppercase tracking-[0.32em] text-brand-deep before:inline-block before:h-px before:w-6 before:bg-current before:opacity-50">
          WHITEBOARD — 高校物理専門塾の授業設計図
        </p>
        <h2
          id="whiteboard-heading"
          className="mt-6 max-w-3xl font-serif text-display-md tracking-[-0.012em] text-ink-900"
        >
          高校物理専門塾の授業は、
          <br className="hidden sm:block" />
          こうやって組み立てます。
        </h2>
        <p className="mt-5 max-w-2xl text-[16px] sm:text-[15px] leading-[2] sm:leading-[1.85] text-ink-700">
          ホワイトボードに描く、授業の設計図です。問題を解く前に現象を語り、語れたら立式し、立式できたら型を固める。高校物理専門塾の授業は、すべてこの順序で組み立てます。
        </p>

        {/* The whiteboard diagram */}
        <div className="relative mt-16 overflow-hidden rounded-[2rem] border border-ink-900/10 bg-white shadow-elevate">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_85%_15%,rgba(226,128,64,0.10),transparent_55%),radial-gradient(circle_at_10%_85%,rgba(59,124,217,0.10),transparent_55%)]"
          />

          <svg
            viewBox="0 0 1200 480"
            className="relative block h-auto w-full"
            aria-hidden
          >
            <defs>
              <marker
                id="wb-arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="9"
                markerHeight="9"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="#142341" opacity="0.55" />
              </marker>
              <marker
                id="wb-arrow-warm"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="9"
                markerHeight="9"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="#b35f27" />
              </marker>
            </defs>

            {/* phenomenon (left bubble) */}
            <g transform="translate(120 240)">
              <ellipse rx="120" ry="78" fill="#e9f0fb" stroke="#3b7cd9" strokeWidth="1.5" />
              <text
                textAnchor="middle"
                y="-14"
                fontFamily="serif"
                fontSize="22"
                fill="#1f5aa6"
                fontWeight="500"
              >
                現象
              </text>
              <text
                textAnchor="middle"
                y="14"
                fontFamily="serif"
                fontSize="13"
                fill="#36456a"
              >
                ばね・電場・波・気体
              </text>
              <text
                textAnchor="middle"
                y="34"
                fontFamily="serif"
                fontSize="13"
                fill="#36456a"
              >
                日本語で記述する
              </text>
            </g>

            {/* arrow 1 */}
            <path
              d="M260,240 C340,200 380,200 460,240"
              stroke="#142341"
              strokeOpacity="0.55"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#wb-arrow)"
            />
            <text
              x="360"
              y="200"
              fontFamily="serif"
              fontSize="14"
              fill="#b35f27"
              textAnchor="middle"
              fontStyle="italic"
            >
              言語化
            </text>

            {/* equation (center bubble) */}
            <g transform="translate(600 240)">
              <rect
                x="-150"
                y="-100"
                rx="20"
                ry="20"
                width="300"
                height="200"
                fill="#fef4eb"
                stroke="#e28040"
                strokeWidth="1.5"
              />
              <text
                textAnchor="middle"
                y="-58"
                fontFamily="serif"
                fontSize="22"
                fill="#b35f27"
                fontWeight="500"
              >
                立式
              </text>
              <text
                textAnchor="middle"
                y="-22"
                fontFamily="ui-monospace, 'SF Mono', Menlo, monospace"
                fontSize="19"
                fill="#142341"
              >
                F = ma
              </text>
              <text
                textAnchor="middle"
                y="6"
                fontFamily="ui-monospace, 'SF Mono', Menlo, monospace"
                fontSize="19"
                fill="#142341"
              >
                ∮ E · dA = Q / ε₀
              </text>
              <text
                textAnchor="middle"
                y="34"
                fontFamily="ui-monospace, 'SF Mono', Menlo, monospace"
                fontSize="19"
                fill="#142341"
              >
                v = f λ
              </text>
              <text
                textAnchor="middle"
                y="74"
                fontFamily="serif"
                fontSize="13"
                fill="#36456a"
              >
                — 機械的に式を立てる手順を再現可能に
              </text>
            </g>

            {/* arrow 2 */}
            <path
              d="M740,240 C820,280 870,280 940,240"
              stroke="#142341"
              strokeOpacity="0.55"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#wb-arrow)"
            />
            <text
              x="840"
              y="300"
              fontFamily="serif"
              fontSize="14"
              fill="#b35f27"
              textAnchor="middle"
              fontStyle="italic"
            >
              演習
            </text>

            {/* result (right bubble) */}
            <g transform="translate(1060 240)">
              <ellipse rx="118" ry="76" fill="#eff4ef" stroke="#597a5b" strokeWidth="1.5" />
              <text
                textAnchor="middle"
                y="-14"
                fontFamily="serif"
                fontSize="22"
                fill="#2f4b31"
                fontWeight="500"
              >
                得点
              </text>
              <text
                textAnchor="middle"
                y="14"
                fontFamily="serif"
                fontSize="13"
                fill="#36456a"
              >
                共通テスト 満点
              </text>
              <text
                textAnchor="middle"
                y="34"
                fontFamily="serif"
                fontSize="13"
                fill="#36456a"
              >
                二次試験 9割
              </text>
            </g>

            {/* coach annotation */}
            <g transform="translate(600 78)">
              <path
                d="M-160,12 C-120,-8 -60,-12 0,0 C60,12 120,18 160,8"
                stroke="#b35f27"
                strokeWidth="2"
                strokeDasharray="6 5"
                fill="none"
                markerEnd="url(#wb-arrow-warm)"
              />
              <text
                textAnchor="middle"
                y="-22"
                fontFamily="serif"
                fontSize="15"
                fill="#b35f27"
                fontWeight="500"
              >
                ✱ ここを高校物理専門塾が伴走します
              </text>
            </g>

            {/* hand-drawn underline near "立式" */}
            <path
              d="M540,360 C580,374 620,374 660,362"
              stroke="#caa34b"
              strokeWidth="2.5"
              fill="none"
              opacity="0.7"
            />
            <text
              x="600"
              y="394"
              textAnchor="middle"
              fontFamily="serif"
              fontSize="13"
              fill="#8e6c2a"
              fontStyle="italic"
            >
              一番つまずく場所
            </text>
          </svg>
        </div>

        {/* legend chips */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {[
            { label: "言語化 — 現象を語る", chip: "border-brand/40 bg-brand-bg text-brand-deep" },
            { label: "立式 — 数式に翻訳", chip: "border-warm/40 bg-warm-bg text-warm-deep" },
            { label: "演習 — 型を固める", chip: "border-forest/40 bg-forest-bg text-forest-deep" },
          ].map((c) => (
            <span
              key={c.label}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] sm:text-[12.5px] ${c.chip}`}
            >
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
              {c.label}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
