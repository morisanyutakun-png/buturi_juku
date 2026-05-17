/**
 * 演習プリント アーカイブのデータ。
 *
 * - PDF は public/prints/<slug>.pdf に配置（一次ソース）
 * - PDF をページ画像に変換した WebP は public/prints/<slug>/page-N.webp に配置
 *   （`scripts/build-print-previews.sh` で再生成可能）。詳細ページの
 *   Web プレビューはこの WebP を縦に並べて表示する。
 *   - 旧 PNG ソースは WebP 化により撤去（PageSpeed の next-gen formats 指摘解消）。
 * - 各プリントの問題本文・解答解説 HTML はこのファイルが一次ソース
 *   → HTML として展開することで Google が中身を読めるようにし、
 *     SEO 上のロングテール（単元名 × 物理 × プリント / PDF）を拾う。
 * - 各プリントは note の有料プリント / Solvora 体験授業 への送客導線を強化するための
 *   コンバージョン文脈で運用する。本文末尾と中ほどに CTA を配置すること。
 *
 * 数式は HTML タグ（<sub>, <sup>, <span class="frac">, etc.）と Unicode（ω, π, √, ⋯）の
 * 組み合わせで表現。PDF が常に最終的な正答ビューであるという前提のもと、HTML 側は
 * 「読めばわかる」レベルを目指す（KaTeX/MathJax の依存は意図的に持たない）。
 */

export type PrintBlock =
  | { kind: "p"; html: string }
  | { kind: "eq"; html: string }
  | { kind: "list"; items: string[] }
  | { kind: "callout"; label: string; html: string };

export type PrintSection = {
  id: string;
  heading: string;
  blocks: PrintBlock[];
};

export type PrintSubject = "力学" | "電磁気" | "波動" | "熱力学" | "原子";
export type PrintDifficulty = "基礎" | "標準" | "応用";
/** プリントの公開区分。`free` は全ページ公開・直 DL 可能、`paid` は note などで購入。 */
export type PrintKind = "free" | "paid";

export type Print = {
  slug: string;
  title: string;
  /** SEO 用 description。検索結果のスニペットに出ることを意識して 110〜140 字程度。 */
  description: string;
  /** 詳細ページ冒頭のリード文。本文の入り口として一段降りる役割。 */
  lead: string;
  subject: PrintSubject;
  /** 単元名。例: 「コンデンサ」「単振動」「点電荷の電位と電界」 */
  topic: string;
  difficulty: PrintDifficulty;
  /** 配点（PDF 表紙の [XX 点] と一致させる）。 */
  points: number;
  /** 想定する学年帯。例: 「高校2年生 〜 高校3年生」「既卒生」 */
  gradeLevel: string;
  /** /public からの相対 URL。例: "/prints/capacitor-charge-conservation.pdf" */
  pdfPath: string;
  /** PDF の総ページ数。`scripts/build-print-previews.sh` 実行後の画像数と一致させる。 */
  pageCount: number;
  publishedAt: string;
  updatedAt?: string;
  /**
   * 公開区分。デフォルト `free`（全ページ Web 表示 + 直 DL 可）。
   * `paid` の場合は `previewMaxPage` 以降の画像にぼかし＋購入導線をかぶせる。
   */
  kind: PrintKind;
  /** 有料プリントの購入先 URL（note / Stripe など）。 */
  paidUrl?: string;
  /** 有料プリントで Web プレビューを開放する最大ページ番号（1-origin）。 */
  previewMaxPage?: number;
  /** SEO 用キーワードと一致させるタグ。 */
  tags: readonly string[];
  /**
   * 問題セットアップ。図の言語化、与えられた条件、ただし書きを含む段落。
   * 注意: HTML は dangerouslySetInnerHTML されるためデータ作成者が責任を持って書く。
   */
  problemSetup: PrintBlock[];
  /** 設問の小問。番号は自動採番。 */
  problemQuestions: string[];
  /** 解答・解説。複数の見出し付きセクションで分割。 */
  solution: PrintSection[];
  /** ポイント・考え方の整理（PDF 末尾の「ポイント」「まとめ」に対応）。 */
  pointNote?: PrintBlock[];
  /** 関連する塾サイト内の学習コラム slug。本文 CTA に並べて掲載。 */
  relatedArticleSlugs?: string[];
  /** 関連する他のプリント slug。詳細ページ末尾で関連プリントとして表示。 */
  relatedPrintSlugs?: string[];
};

/**
 * Web プレビュー用 WebP ページ画像のパスを返す。
 * 1-origin（先頭ページは page-1.webp）。
 */
export function printPageImagePaths(print: Print): string[] {
  return Array.from(
    { length: print.pageCount },
    (_, i) => `/prints/${print.slug}/page-${i + 1}.webp`,
  );
}

/** サムネイル（一覧カード・OG 画像など）として使う 1 ページ目の WebP パス。 */
export function printThumbPath(print: Print): string {
  return `/prints/${print.slug}/page-1.webp`;
}

/**
 * next/image の `blurDataURL` に渡す共通プレースホルダ。
 * A4 比率（8x11）の単色 SVG を base64 化したもの。色は paper-soft（#faf4e3）。
 * Image 配置先の bg-paper-soft と一致させ、読み込み中もチラつきを抑える。
 */
export const PRINT_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDExIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmFmNGUzIi8+PC9zdmc+";

export const prints: Print[] = [
  // ───────────────────────────────────────────────
  // 00. 電磁気 / ローレンツ力 - 磁場中の荷電粒子の円運動
  // ───────────────────────────────────────────────
  {
    slug: "lorentz-force-circular-motion",
    title: "ローレンツ力｜磁場中の荷電粒子と等速円運動",
    description:
      "一様磁場中に入射した荷電粒子が受けるローレンツ力の向き・軌道半径・角速度・周期・半円分の到達時間と距離までを一連で問う基礎〜標準問題。等速円運動と向心力の橋渡しを 1 問で押さえます。",
    lead: "ローレンツ力は常に速度に垂直に働くので、磁場中の荷電粒子は等速円運動します。向心力 = ローレンツ力 と置けば、半径も角速度も周期も一気に出ます。",
    subject: "電磁気",
    topic: "ローレンツ力・磁場中の運動",
    difficulty: "標準",
    points: 20,
    gradeLevel: "高校2年生 〜 高校3年生",
    pdfPath: "/prints/lorentz-force-circular-motion.pdf",
    pageCount: 3,
    publishedAt: "2026-05-18",
    kind: "free",
    tags: ["電磁気", "ローレンツ力", "磁場", "等速円運動", "高校物理"],
    problemSetup: [
      {
        kind: "p",
        html: "質量 <i>m</i>、電荷 <i>q</i>（<i>q</i> &gt; 0）をもつ粒子が、点 O から速さ <i>v</i> で <i>x</i> 軸正の向きに入射する。領域 <i>y</i> &gt; 0 には、紙面の裏向きに一様な磁束密度 <i>B</i> の磁場が存在している。",
      },
      {
        kind: "p",
        html: "重力および空気抵抗は無視できるものとする。粒子が次に <i>y</i> 軸上に到達する点を P とする。解答はすべて文字式で表せ。",
      },
    ],
    problemQuestions: [
      "入射直後に粒子が受けるローレンツ力の大きさと向きを答えよ。",
      "粒子の軌道半径 <i>r</i> を求めよ。",
      "粒子の角速度 ω と周期 <i>T</i> を求めよ。",
      "粒子が点 P に到達するまでの時間 <i>t</i> と、距離 OP を求めよ。",
    ],
    solution: [
      {
        id: "q1-lorentz",
        heading: "(1) ローレンツ力の大きさと向き",
        blocks: [
          {
            kind: "p",
            html: "ローレンツ力は <b>F</b> = <i>q</i><b>v</b> × <b>B</b>。速度 <b>v</b> は <i>x</i> 軸正の向き、磁場 <b>B</b> は紙面の裏向きなので、右ねじの規則より <b>v</b> × <b>B</b> は <i>y</i> 軸正の向き。<i>q</i> &gt; 0 なのでローレンツ力も <i>y</i> 軸正の向き。",
          },
          {
            kind: "p",
            html: "<b>v</b> と <b>B</b> は直交するので、大きさは",
          },
          { kind: "eq", html: "<i>F</i> = <i>qvB</i>&emsp;（向き：<i>y</i> 軸正の向き）" },
        ],
      },
      {
        id: "q2-radius",
        heading: "(2) 軌道半径 r",
        blocks: [
          {
            kind: "p",
            html: "ローレンツ力は常に速度に垂直なので、速さは一定で運動方向だけが変わる。よって粒子は等速円運動。ローレンツ力が向心力となるので、",
          },
          {
            kind: "eq",
            html: "<i>qvB</i> = <span class=\"frac\"><span class=\"num\"><i>mv</i><sup>2</sup></span><span class=\"den\"><i>r</i></span></span>",
          },
          {
            kind: "eq",
            html: "<i>r</i> = <span class=\"frac\"><span class=\"num\"><i>mv</i></span><span class=\"den\"><i>qB</i></span></span>",
          },
        ],
      },
      {
        id: "q3-omega-period",
        heading: "(3) 角速度 ω と周期 T",
        blocks: [
          {
            kind: "p",
            html: "等速円運動の関係 <i>v</i> = <i>r</i>ω より ω = <i>v</i>/<i>r</i>。(2) を代入して、",
          },
          {
            kind: "eq",
            html: "ω = <span class=\"frac\"><span class=\"num\"><i>qB</i></span><span class=\"den\"><i>m</i></span></span>,&emsp;<i>T</i> = <span class=\"frac\"><span class=\"num\">2π</span><span class=\"den\">ω</span></span> = <span class=\"frac\"><span class=\"num\">2π<i>m</i></span><span class=\"den\"><i>qB</i></span></span>",
          },
          {
            kind: "p",
            html: "ω・<i>T</i> は速さ <i>v</i> によらず、質量と電荷と磁場だけで決まる（サイクロトロン周波数）。",
          },
        ],
      },
      {
        id: "q4-half-circle",
        heading: "(4) 点 P までの時間 t と距離 OP",
        blocks: [
          {
            kind: "p",
            html: "入射直後の力は <i>y</i> 軸正の向きなので、円軌道の中心は O の真上。次に <i>y</i> 軸上に戻るのは半周後で、その点 P は中心を挟んだ反対側 = 円の直径分だけ離れた点。",
          },
          {
            kind: "eq",
            html: "<i>t</i> = <span class=\"frac\"><span class=\"num\"><i>T</i></span><span class=\"den\">2</span></span> = <span class=\"frac\"><span class=\"num\">π<i>m</i></span><span class=\"den\"><i>qB</i></span></span>,&emsp;OP = 2<i>r</i> = <span class=\"frac\"><span class=\"num\">2<i>mv</i></span><span class=\"den\"><i>qB</i></span></span>",
          },
        ],
      },
    ],
    pointNote: [
      {
        kind: "callout",
        label: "ポイント",
        html: "磁場中の荷電粒子は <strong>ローレンツ力 = 向心力</strong> で等速円運動。半径 <i>r</i> = <i>mv</i>/(<i>qB</i>) は速さに比例し、磁場に反比例。一方、<strong>角速度・周期は速さによらず</strong> ω = <i>qB</i>/<i>m</i>、<i>T</i> = 2π<i>m</i>/(<i>qB</i>) で決まる。これはサイクロトロンの動作原理そのもの。",
      },
    ],
    relatedArticleSlugs: ["high-school-physics-electromagnetism-systematic-textbook"],
    relatedPrintSlugs: [
      "ac-rlc-series-impedance-resonance",
      "point-charge-potential-and-field",
    ],
  },

  // ───────────────────────────────────────────────
  // 0. 力学 / 運動量 - 完全非弾性衝突
  // ───────────────────────────────────────────────
  {
    slug: "perfectly-inelastic-collision-energy-loss",
    title: "完全非弾性衝突｜運動量保存と失われる運動エネルギー",
    description:
      "なめらかな水平面上で 2 物体が一体化する完全非弾性衝突の典型問題。運動量保存則から共通速さを導き、失われる運動エネルギーを相対速度の 2 乗に整理する。問題本文・段階解説・印刷向け PDF を無料公開。",
    lead: "衝突の前後で外力による力積が無視できるとき、運動量は保存されます。一方、運動エネルギーは保存されず、その失われる量は相対速度の 2 乗のみに依存する形へ整理できます。",
    subject: "力学",
    topic: "運動量保存・非弾性衝突",
    difficulty: "標準",
    points: 20,
    gradeLevel: "高校2年生 〜 高校3年生",
    pdfPath: "/prints/perfectly-inelastic-collision-energy-loss.pdf",
    pageCount: 4,
    publishedAt: "2026-05-16",
    kind: "free",
    tags: ["力学", "運動量保存", "非弾性衝突", "相対速度", "高校物理"],
    problemSetup: [
      {
        kind: "p",
        html: "なめらかな水平面上を、質量 <i>m</i><sub>1</sub> の物体 A と質量 <i>m</i><sub>2</sub> の物体 B が同一直線上を運動している。物体 A は速さ <i>v</i><sub>1</sub>、物体 B は速さ <i>v</i><sub>2</sub> で同じ向きに進んでおり、<i>v</i><sub>1</sub> &gt; <i>v</i><sub>2</sub> とする。A が B に追いついて衝突した後、2 つの物体は一体となって速さ <i>V</i> で運動した。",
      },
      {
        kind: "p",
        html: "水平面からの摩擦は無視でき、衝突の前後で水平方向の外力による力積は無視できるものとする。",
      },
    ],
    problemQuestions: [
      "衝突後に一体となって進む速さ <i>V</i> を、<i>m</i><sub>1</sub>, <i>m</i><sub>2</sub>, <i>v</i><sub>1</sub>, <i>v</i><sub>2</sub> を用いて表せ。",
      "衝突前の運動エネルギーを <i>K</i><sub>before</sub>、衝突後の運動エネルギーを <i>K</i><sub>after</sub> とする。失われた運動エネルギー Δ<i>K</i> = <i>K</i><sub>before</sub> &minus; <i>K</i><sub>after</sub> を、<i>m</i><sub>1</sub>, <i>m</i><sub>2</sub>, <i>v</i><sub>1</sub>, <i>v</i><sub>2</sub> を用いて表せ。",
      "Δ<i>K</i> が <i>v</i><sub>1</sub> &minus; <i>v</i><sub>2</sub> のみに依存する形で表されることの物理的意味を説明せよ。",
    ],
    solution: [
      {
        id: "q1-common-velocity",
        heading: "(1) 衝突後の共通の速さ V",
        blocks: [
          {
            kind: "p",
            html: "水平方向には外力による力積が無視できるので、衝突の前後で運動量が保存される。衝突前の全運動量は <i>m</i><sub>1</sub><i>v</i><sub>1</sub> + <i>m</i><sub>2</sub><i>v</i><sub>2</sub>、衝突後は (<i>m</i><sub>1</sub> + <i>m</i><sub>2</sub>)<i>V</i>。",
          },
          {
            kind: "eq",
            html: "<i>m</i><sub>1</sub><i>v</i><sub>1</sub> + <i>m</i><sub>2</sub><i>v</i><sub>2</sub> = (<i>m</i><sub>1</sub> + <i>m</i><sub>2</sub>)<i>V</i>",
          },
          {
            kind: "eq",
            html: "<i>V</i> = <span class=\"frac\"><span class=\"num\"><i>m</i><sub>1</sub><i>v</i><sub>1</sub> + <i>m</i><sub>2</sub><i>v</i><sub>2</sub></span><span class=\"den\"><i>m</i><sub>1</sub> + <i>m</i><sub>2</sub></span></span>",
          },
          {
            kind: "p",
            html: "これは、衝突後の速さが <strong>2 物体の速さを質量で重みづけした平均</strong>になっていることを表す。",
          },
        ],
      },
      {
        id: "q2-energy-loss",
        heading: "(2) 失われた運動エネルギー ΔK",
        blocks: [
          { kind: "p", html: "衝突前後の運動エネルギーは" },
          {
            kind: "eq",
            html: "<i>K</i><sub>before</sub> = (1/2)<i>m</i><sub>1</sub><i>v</i><sub>1</sub><sup>2</sup> + (1/2)<i>m</i><sub>2</sub><i>v</i><sub>2</sub><sup>2</sup>",
          },
          {
            kind: "eq",
            html: "<i>K</i><sub>after</sub> = (1/2)(<i>m</i><sub>1</sub> + <i>m</i><sub>2</sub>)<i>V</i><sup>2</sup> = <span class=\"frac\"><span class=\"num\">(<i>m</i><sub>1</sub><i>v</i><sub>1</sub> + <i>m</i><sub>2</sub><i>v</i><sub>2</sub>)<sup>2</sup></span><span class=\"den\">2(<i>m</i><sub>1</sub> + <i>m</i><sub>2</sub>)</span></span>",
          },
          {
            kind: "p",
            html: "差を取り、分子を展開・整理すると、",
          },
          {
            kind: "eq",
            html: "Δ<i>K</i> = <span class=\"frac\"><span class=\"num\"><i>m</i><sub>1</sub><i>m</i><sub>2</sub></span><span class=\"den\">2(<i>m</i><sub>1</sub> + <i>m</i><sub>2</sub>)</span></span> (<i>v</i><sub>1</sub> &minus; <i>v</i><sub>2</sub>)<sup>2</sup>",
          },
        ],
      },
      {
        id: "q3-meaning",
        heading: "(3) 物理的意味",
        blocks: [
          {
            kind: "p",
            html: "Δ<i>K</i> は <strong>相対速度 <i>v</i><sub>1</sub> &minus; <i>v</i><sub>2</sub> の 2 乗</strong> のみに依存する。同じ速さで動いている場合 (<i>v</i><sub>1</sub> = <i>v</i><sub>2</sub>) は追突自体が起きず Δ<i>K</i> = 0、相対速度が大きいほど多くのエネルギーが熱・音・変形などに移る。",
          },
          {
            kind: "p",
            html: "完全非弾性衝突では <strong>運動量は保存されるが、運動エネルギーは一般には保存されない</strong>。失われるのは『重心系から見た相対運動』のぶんのエネルギーである。",
          },
        ],
      },
    ],
    pointNote: [
      {
        kind: "callout",
        label: "ポイント",
        html: "衝突問題は『運動量は保存、運動エネルギーは保存とは限らない』が基本姿勢。失われる運動エネルギーは <strong>換算質量 <i>m</i><sub>1</sub><i>m</i><sub>2</sub>/(<i>m</i><sub>1</sub>+<i>m</i><sub>2</sub>) × (相対速度)<sup>2</sup>/2</strong> という形に必ず整理できる。",
      },
    ],
    relatedArticleSlugs: ["mechanics-mastery-guide"],
    relatedPrintSlugs: ["cart-spring-collision-energy-transfer"],
  },

  // ───────────────────────────────────────────────
  // 0b. 力学 / 運動量 + 力学的エネルギー（応用）
  // ───────────────────────────────────────────────
  {
    slug: "cart-spring-collision-energy-transfer",
    title: "衝突と最大圧縮｜運動量保存とばねに蓄えられるエネルギー",
    description:
      "静止した台車に小物体が衝突して一体化し、その後ばねを最大圧縮する典型問題。運動量保存と力学的エネルギー保存を切り替え、最終的に『衝突前のエネルギーのうちばねに蓄えられる割合』を導く応用問題。",
    lead: "衝突は短時間 → 運動量保存。衝突後はばねが押されるだけ → 力学的エネルギー保存。同じ系でも、フェーズによって保存則が切り替わります。",
    subject: "力学",
    topic: "運動量保存・力学的エネルギー保存",
    difficulty: "応用",
    points: 25,
    gradeLevel: "高校2年生 〜 既卒生",
    pdfPath: "/prints/cart-spring-collision-energy-transfer.pdf",
    pageCount: 4,
    publishedAt: "2026-05-16",
    kind: "free",
    tags: ["力学", "運動量保存", "エネルギー保存", "ばね", "高校物理"],
    problemSetup: [
      {
        kind: "p",
        html: "なめらかな水平面上に、質量 <i>M</i> の台車 A と質量 <i>m</i> の小物体 B がある。台車 A ははじめ静止しており、小物体 B は水平右向きに速さ <i>v</i> で進んでいる。小物体 B は台車 A に衝突し、その後、台車 A と一体となって運動する。",
      },
      {
        kind: "p",
        html: "その後、一体となった物体は、水平面上に固定されたばね定数 <i>k</i> の軽いばねを縮め、最大圧縮時に一瞬静止した。水平面との摩擦、空気抵抗、ばねの質量は無視でき、衝突は十分短時間で起こるため衝突中の外力による力積は無視できるものとする。",
      },
    ],
    problemQuestions: [
      "衝突直後、台車 A と小物体 B が一体となって動く速さ <i>V</i> を、<i>m</i>, <i>M</i>, <i>v</i> を用いて表せ。",
      "ばねが最大に縮んだときの縮み <i>x</i> を、<i>m</i>, <i>M</i>, <i>v</i>, <i>k</i> を用いて表せ。",
      "はじめに小物体 B がもっていた運動エネルギーのうち、ばねの弾性エネルギーとして一時的に蓄えられる割合を求めよ。",
      "<i>M</i> が <i>m</i> に比べて非常に大きい場合、ばねに蓄えられるエネルギーが小さくなる理由を、運動量保存の観点から説明せよ。",
    ],
    solution: [
      {
        id: "q1-velocity",
        heading: "(1) 衝突直後の共通の速さ V",
        blocks: [
          {
            kind: "p",
            html: "衝突は短時間で、外力による力積は無視できる。よって水平方向の運動量が保存される。衝突前は B のみが運動しているので運動量は <i>mv</i>。衝突後は (<i>M</i> + <i>m</i>)<i>V</i>。",
          },
          {
            kind: "eq",
            html: "<i>V</i> = <span class=\"frac\"><span class=\"num\"><i>m</i></span><span class=\"den\"><i>M</i> + <i>m</i></span></span> <i>v</i>",
          },
        ],
      },
      {
        id: "q2-compression",
        heading: "(2) ばねの最大の縮み x",
        blocks: [
          {
            kind: "p",
            html: "衝突後はばね以外にエネルギーを失う要因がないので、力学的エネルギー保存則が使える。最大圧縮時には一瞬静止するので運動エネルギーは 0。",
          },
          {
            kind: "eq",
            html: "(1/2)(<i>M</i> + <i>m</i>)<i>V</i><sup>2</sup> = (1/2)<i>kx</i><sup>2</sup>",
          },
          {
            kind: "p",
            html: "(1) の結果を代入して整理すると、",
          },
          {
            kind: "eq",
            html: "<i>x</i> = <span class=\"frac\"><span class=\"num\"><i>mv</i></span><span class=\"den\">√(<i>k</i>(<i>M</i> + <i>m</i>))</span></span>",
          },
        ],
      },
      {
        id: "q3-ratio",
        heading: "(3) ばねに蓄えられるエネルギーの割合",
        blocks: [
          {
            kind: "p",
            html: "B の初期運動エネルギー <i>K</i><sub>0</sub> = (1/2)<i>mv</i><sup>2</sup>。ばねに蓄えられる最大エネルギー <i>U</i> = (1/2)<i>kx</i><sup>2</sup>。(2) を代入して、",
          },
          {
            kind: "eq",
            html: "<i>U</i> = <span class=\"frac\"><span class=\"num\"><i>m</i><sup>2</sup><i>v</i><sup>2</sup></span><span class=\"den\">2(<i>M</i> + <i>m</i>)</span></span>",
          },
          {
            kind: "eq",
            html: "<span class=\"frac\"><span class=\"num\"><i>U</i></span><span class=\"den\"><i>K</i><sub>0</sub></span></span> = <span class=\"frac\"><span class=\"num\"><i>m</i></span><span class=\"den\"><i>M</i> + <i>m</i></span></span>",
          },
        ],
      },
      {
        id: "q4-heavy-cart",
        heading: "(4) M ≫ m のときの解釈",
        blocks: [
          {
            kind: "p",
            html: "<i>M</i> ≫ <i>m</i> のとき <i>m</i>/(<i>M</i> + <i>m</i>) ≈ <i>m</i>/<i>M</i> となり、ばねに移るエネルギーの割合は非常に小さくなる。",
          },
          {
            kind: "p",
            html: "運動量保存より (<i>M</i> + <i>m</i>)<i>V</i> = <i>mv</i> なので、<i>M</i> が大きいほど衝突後の速さ <i>V</i> が小さくなる。ばねに移るエネルギーは <strong>(<i>M</i>+<i>m</i>)<i>V</i><sup>2</sup>/2</strong>。速さの 2 乗に比例するため、重い台車と一体化するほど、衝突後の系のエネルギーが大きく減ってしまうのである。",
          },
        ],
      },
    ],
    pointNote: [
      {
        kind: "callout",
        label: "考え方の整理",
        html: "<strong>衝突 → 運動量保存／衝突後の運動 → 力学的エネルギー保存</strong>。どこからどこまでをどの保存則で結ぶかを意識するのが応用問題のコツ。『運動量は同じ、でも速さは質量で割られる → 運動エネルギーは速さの 2 乗だから損する』という構造を持っている。",
      },
    ],
    relatedArticleSlugs: ["mechanics-mastery-guide"],
    relatedPrintSlugs: [
      "perfectly-inelastic-collision-energy-loss",
      "simple-harmonic-motion-energy-conservation",
    ],
  },

  // ───────────────────────────────────────────────
  // 0d. 電磁気 / 交流回路 - RLC 直列・インピーダンス・共振
  // ───────────────────────────────────────────────
  {
    slug: "ac-rlc-series-impedance-resonance",
    title: "交流回路｜RLC 直列の複素インピーダンスと共振",
    description:
      "抵抗 R・コイル L・コンデンサ C を直列につないだ交流回路で、複素インピーダンス、電流の最大値と位相、各素子の電圧、共振角周波数までを一連で扱う応用問題。物理 II・大学受験頻出のテーマを 1 問で押さえます。",
    lead: "RLC 直列回路は、コイルとコンデンサが互いに逆の位相効果を持ち、ある周波数で打ち消し合います。それが共振。複素インピーダンスを 1 本立てれば、電流・位相・共振が機械的に出ます。",
    subject: "電磁気",
    topic: "交流回路・RLC 共振",
    difficulty: "応用",
    points: 50,
    gradeLevel: "高校3年生 〜 既卒生",
    pdfPath: "/prints/ac-rlc-series-impedance-resonance.pdf",
    pageCount: 4,
    publishedAt: "2026-05-17",
    kind: "free",
    tags: ["電磁気", "交流回路", "インピーダンス", "共振", "高校物理"],
    problemSetup: [
      {
        kind: "p",
        html: "抵抗 <i>R</i>、自己インダクタンス <i>L</i> のコイル、静電容量 <i>C</i> のコンデンサを直列につなぎ、角周波数 ω の交流電圧 <i>e</i>(<i>t</i>) = <i>E</i><sub>0</sub> sin ω<i>t</i> を加える。ここで <i>E</i><sub>0</sub> は電圧の最大値である。",
      },
      {
        kind: "p",
        html: "定常状態において、次の問いに答えよ。ただし、素子はすべて理想的であり、抵抗以外でのエネルギー損失は無視できるものとする。",
      },
    ],
    problemQuestions: [
      "この直列回路全体の複素インピーダンス <i>Z</i> と、その大きさ |<i>Z</i>| を求めよ。",
      "回路を流れる電流の最大値 <i>I</i><sub>0</sub> と、電流 <i>i</i>(<i>t</i>) を <i>E</i><sub>0</sub>, <i>R</i>, <i>L</i>, <i>C</i>, ω を用いて表せ。",
      "抵抗・コイル・コンデンサにかかる電圧の最大値を、それぞれ <i>V</i><sub>R0</sub>, <i>V</i><sub>L0</sub>, <i>V</i><sub>C0</sub> として求めよ。",
      "電流が最大となる角周波数 ω<sub>0</sub> と、そのときの電流の最大値 <i>I</i><sub>0,max</sub> を求めよ。",
    ],
    solution: [
      {
        id: "q1-impedance",
        heading: "(1) 複素インピーダンス Z と |Z|",
        blocks: [
          {
            kind: "p",
            html: "各素子の複素インピーダンスは <i>Z</i><sub>R</sub> = <i>R</i>、<i>Z</i><sub>L</sub> = <i>j</i>ω<i>L</i>、<i>Z</i><sub>C</sub> = 1/(<i>j</i>ω<i>C</i>) = &minus;<i>j</i>/(ω<i>C</i>)。直列なので和を取って、",
          },
          {
            kind: "eq",
            html: "<i>Z</i> = <i>R</i> + <i>j</i>(ω<i>L</i> &minus; 1/(ω<i>C</i>))",
          },
          {
            kind: "eq",
            html: "|<i>Z</i>| = √( <i>R</i><sup>2</sup> + (ω<i>L</i> &minus; 1/(ω<i>C</i>))<sup>2</sup> )",
          },
          {
            kind: "p",
            html: "実部 <i>R</i> は抵抗成分、虚部 ω<i>L</i> &minus; 1/(ω<i>C</i>) はコイルとコンデンサの <strong>リアクタンス</strong> 成分。両者は逆符号で打ち消し合う関係にある。",
          },
        ],
      },
      {
        id: "q2-current",
        heading: "(2) 電流の最大値 I₀ と i(t)",
        blocks: [
          {
            kind: "p",
            html: "オームの法則を交流に拡張して <i>I</i><sub>0</sub> = <i>E</i><sub>0</sub>/|<i>Z</i>|。よって、",
          },
          {
            kind: "eq",
            html: "<i>I</i><sub>0</sub> = <span class=\"frac\"><span class=\"num\"><i>E</i><sub>0</sub></span><span class=\"den\">√(<i>R</i><sup>2</sup> + (ω<i>L</i> &minus; 1/(ω<i>C</i>))<sup>2</sup>)</span></span>",
          },
          {
            kind: "p",
            html: "インピーダンスの偏角を φ = arctan((ω<i>L</i> &minus; 1/(ω<i>C</i>)) / <i>R</i>) とすると、電圧を基準にして、",
          },
          {
            kind: "eq",
            html: "<i>i</i>(<i>t</i>) = <i>I</i><sub>0</sub> sin(ω<i>t</i> &minus; φ)",
          },
          {
            kind: "p",
            html: "ω<i>L</i> &gt; 1/(ω<i>C</i>) なら φ &gt; 0 で <strong>誘導性</strong>（電流は電圧より遅れる）、逆なら <strong>容量性</strong>（電流は電圧より進む）。",
          },
        ],
      },
      {
        id: "q3-voltages",
        heading: "(3) 各素子の電圧の最大値",
        blocks: [
          {
            kind: "p",
            html: "直列なので電流の最大値はどの素子も同じ <i>I</i><sub>0</sub>。よって、",
          },
          {
            kind: "eq",
            html: "<i>V</i><sub>R0</sub> = <i>RI</i><sub>0</sub>,&emsp;<i>V</i><sub>L0</sub> = ω<i>LI</i><sub>0</sub>,&emsp;<i>V</i><sub>C0</sub> = <i>I</i><sub>0</sub>/(ω<i>C</i>)",
          },
          {
            kind: "p",
            html: "(2) の <i>I</i><sub>0</sub> を代入すれば <i>E</i><sub>0</sub>, <i>R</i>, <i>L</i>, <i>C</i>, ω だけで表せる。なお交流では位相が異なるため、一般に <i>E</i><sub>0</sub> ≠ <i>V</i><sub>R0</sub> + <i>V</i><sub>L0</sub> + <i>V</i><sub>C0</sub>（単純な和にはならない）。",
          },
        ],
      },
      {
        id: "q4-resonance",
        heading: "(4) 共振角周波数 ω₀ と I₀,max",
        blocks: [
          {
            kind: "p",
            html: "<i>I</i><sub>0</sub> が最大になるのは |<i>Z</i>| が最小、つまり虚部 ω<i>L</i> &minus; 1/(ω<i>C</i>) = 0 のとき。ω<sup>2</sup><i>LC</i> = 1 より、",
          },
          {
            kind: "eq",
            html: "ω<sub>0</sub> = <span class=\"frac\"><span class=\"num\">1</span><span class=\"den\">√(<i>LC</i>)</span></span>",
          },
          {
            kind: "p",
            html: "このとき <i>Z</i> = <i>R</i>（虚数成分が消える）。よって、",
          },
          {
            kind: "eq",
            html: "<i>I</i><sub>0,max</sub> = <i>E</i><sub>0</sub>/<i>R</i>",
          },
          {
            kind: "p",
            html: "これが <strong>共振</strong>。ω<sub>0</sub><i>L</i> = 1/(ω<sub>0</sub><i>C</i>) でコイルとコンデンサのリアクタンスが等しくなり、互いの位相効果が打ち消し合う。電源から見た回路は純抵抗 <i>R</i> と同じになり、電流が最大になる。",
          },
        ],
      },
    ],
    pointNote: [
      {
        kind: "callout",
        label: "ポイント",
        html: "RLC 直列回路は <strong>複素インピーダンス <i>Z</i> = <i>R</i> + <i>j</i>(ω<i>L</i> &minus; 1/(ω<i>C</i>))</strong> を立てれば、電流・位相・共振がすべて機械的に出てくる。<strong>共振条件 ω<sub>0</sub> = 1/√(<i>LC</i>)</strong> はコイルとコンデンサのリアクタンスが釣り合う点であり、回路が純抵抗に見える瞬間。",
      },
    ],
    relatedArticleSlugs: ["high-school-physics-electromagnetism-systematic-textbook"],
    relatedPrintSlugs: [
      "dc-circuit-series-parallel-resistors",
      "capacitor-charge-conservation",
    ],
  },

  // ───────────────────────────────────────────────
  // 0c. 電磁気 / 直流回路 - 合成抵抗と分岐電流
  // ───────────────────────────────────────────────
  {
    slug: "dc-circuit-series-parallel-resistors",
    title: "直流回路｜直列・並列の合成抵抗と分岐電流",
    description:
      "起電力 E の電源に直列に R₁、その後 R₂ と R₃ を並列に接続した直流回路の典型問題。合成抵抗・全電流・並列部の電圧・分岐電流・消費電力までを一連で扱う標準演習。",
    lead: "直流回路の基本は『直列は抵抗を足す、並列は逆数を足す』。あとはオームの法則を順に適用していくだけで、分岐電流や消費電力まで一気通貫で求められます。",
    subject: "電磁気",
    topic: "直流回路・合成抵抗",
    difficulty: "標準",
    points: 25,
    gradeLevel: "高校2年生 〜 高校3年生",
    pdfPath: "/prints/dc-circuit-series-parallel-resistors.pdf",
    pageCount: 3,
    publishedAt: "2026-05-16",
    kind: "free",
    tags: ["電磁気", "直流回路", "オームの法則", "合成抵抗", "高校物理"],
    problemSetup: [
      {
        kind: "p",
        html: "起電力 <i>E</i> の直流電源に、抵抗 <i>R</i><sub>1</sub> が直列に接続され、その後に抵抗 <i>R</i><sub>2</sub> と <i>R</i><sub>3</sub> が並列に接続されている。電源の内部抵抗は無視できるものとする。回路全体を流れる電流の大きさを <i>I</i>、<i>R</i><sub>2</sub> を流れる電流の大きさを <i>I</i><sub>2</sub>、<i>R</i><sub>3</sub> を流れる電流の大きさを <i>I</i><sub>3</sub> とする。<i>R</i><sub>1</sub>, <i>R</i><sub>2</sub>, <i>R</i><sub>3</sub> はすべて正の定数である。",
      },
    ],
    problemQuestions: [
      "回路全体の合成抵抗 <i>R</i> を <i>R</i><sub>1</sub>, <i>R</i><sub>2</sub>, <i>R</i><sub>3</sub> を用いて表せ。",
      "回路全体を流れる電流の大きさ <i>I</i> を <i>E</i>, <i>R</i><sub>1</sub>, <i>R</i><sub>2</sub>, <i>R</i><sub>3</sub> を用いて表せ。",
      "並列部分にかかる電圧の大きさ <i>V</i> を <i>E</i>, <i>R</i><sub>1</sub>, <i>R</i><sub>2</sub>, <i>R</i><sub>3</sub> を用いて表せ。",
      "枝電流の大きさ <i>I</i><sub>2</sub>, <i>I</i><sub>3</sub> を <i>E</i>, <i>R</i><sub>1</sub>, <i>R</i><sub>2</sub>, <i>R</i><sub>3</sub> を用いて表せ。",
      "抵抗 <i>R</i><sub>2</sub> で消費される電力 <i>P</i><sub>2</sub> を <i>E</i>, <i>R</i><sub>1</sub>, <i>R</i><sub>2</sub>, <i>R</i><sub>3</sub> を用いて表せ。",
    ],
    solution: [
      {
        id: "q1-combined-resistance",
        heading: "(1) 合成抵抗 R",
        blocks: [
          {
            kind: "p",
            html: "並列部分の合成抵抗 <i>R</i><sub>23</sub> は逆数の和の逆数として求まる。",
          },
          {
            kind: "eq",
            html: "<i>R</i><sub>23</sub> = <span class=\"frac\"><span class=\"num\"><i>R</i><sub>2</sub><i>R</i><sub>3</sub></span><span class=\"den\"><i>R</i><sub>2</sub> + <i>R</i><sub>3</sub></span></span>",
          },
          {
            kind: "p",
            html: "これと <i>R</i><sub>1</sub> が直列なので、",
          },
          {
            kind: "eq",
            html: "<i>R</i> = <i>R</i><sub>1</sub> + <span class=\"frac\"><span class=\"num\"><i>R</i><sub>2</sub><i>R</i><sub>3</sub></span><span class=\"den\"><i>R</i><sub>2</sub> + <i>R</i><sub>3</sub></span></span> = <span class=\"frac\"><span class=\"num\"><i>R</i><sub>1</sub><i>R</i><sub>2</sub> + <i>R</i><sub>1</sub><i>R</i><sub>3</sub> + <i>R</i><sub>2</sub><i>R</i><sub>3</sub></span><span class=\"den\"><i>R</i><sub>2</sub> + <i>R</i><sub>3</sub></span></span>",
          },
        ],
      },
      {
        id: "q2-total-current",
        heading: "(2) 回路全体を流れる電流 I",
        blocks: [
          { kind: "p", html: "オームの法則 <i>I</i> = <i>E</i>/<i>R</i> より、" },
          {
            kind: "eq",
            html: "<i>I</i> = <span class=\"frac\"><span class=\"num\"><i>E</i>(<i>R</i><sub>2</sub> + <i>R</i><sub>3</sub>)</span><span class=\"den\"><i>R</i><sub>1</sub><i>R</i><sub>2</sub> + <i>R</i><sub>1</sub><i>R</i><sub>3</sub> + <i>R</i><sub>2</sub><i>R</i><sub>3</sub></span></span>",
          },
        ],
      },
      {
        id: "q3-parallel-voltage",
        heading: "(3) 並列部分の電圧 V",
        blocks: [
          {
            kind: "p",
            html: "<i>V</i> = <i>IR</i><sub>23</sub> に (1)(2) を代入して約分すると、",
          },
          {
            kind: "eq",
            html: "<i>V</i> = <span class=\"frac\"><span class=\"num\"><i>ER</i><sub>2</sub><i>R</i><sub>3</sub></span><span class=\"den\"><i>R</i><sub>1</sub><i>R</i><sub>2</sub> + <i>R</i><sub>1</sub><i>R</i><sub>3</sub> + <i>R</i><sub>2</sub><i>R</i><sub>3</sub></span></span>",
          },
        ],
      },
      {
        id: "q4-branch-currents",
        heading: "(4) 枝電流 I₂, I₃",
        blocks: [
          {
            kind: "p",
            html: "並列接続では <i>R</i><sub>2</sub>, <i>R</i><sub>3</sub> の両端電圧は等しく <i>V</i>。それぞれにオームの法則を適用して、",
          },
          {
            kind: "eq",
            html: "<i>I</i><sub>2</sub> = <span class=\"frac\"><span class=\"num\"><i>ER</i><sub>3</sub></span><span class=\"den\"><i>R</i><sub>1</sub><i>R</i><sub>2</sub> + <i>R</i><sub>1</sub><i>R</i><sub>3</sub> + <i>R</i><sub>2</sub><i>R</i><sub>3</sub></span></span>,&emsp;<i>I</i><sub>3</sub> = <span class=\"frac\"><span class=\"num\"><i>ER</i><sub>2</sub></span><span class=\"den\"><i>R</i><sub>1</sub><i>R</i><sub>2</sub> + <i>R</i><sub>1</sub><i>R</i><sub>3</sub> + <i>R</i><sub>2</sub><i>R</i><sub>3</sub></span></span>",
          },
        ],
      },
      {
        id: "q5-power",
        heading: "(5) R₂ で消費される電力 P₂",
        blocks: [
          {
            kind: "p",
            html: "<i>P</i><sub>2</sub> = <i>I</i><sub>2</sub><sup>2</sup><i>R</i><sub>2</sub>。(4) の結果を代入して、",
          },
          {
            kind: "eq",
            html: "<i>P</i><sub>2</sub> = <span class=\"frac\"><span class=\"num\"><i>E</i><sup>2</sup><i>R</i><sub>2</sub><i>R</i><sub>3</sub><sup>2</sup></span><span class=\"den\">(<i>R</i><sub>1</sub><i>R</i><sub>2</sub> + <i>R</i><sub>1</sub><i>R</i><sub>3</sub> + <i>R</i><sub>2</sub><i>R</i><sub>3</sub>)<sup>2</sup></span></span>",
          },
        ],
      },
    ],
    pointNote: [
      {
        kind: "callout",
        label: "ポイント",
        html: "直流回路の解法は <strong>『直列＝抵抗の和／並列＝逆数の和の逆数』→ 全体電流 → 部分電圧 → 分岐電流</strong> の順で機械的に書ける。電力は <i>P</i> = <i>I</i><sup>2</sup><i>R</i> または <i>V</i><sup>2</sup>/<i>R</i> のどちらでも出るので、求めやすい量から取りに行く。",
      },
    ],
    relatedArticleSlugs: ["high-school-physics-electromagnetism-systematic-textbook"],
    relatedPrintSlugs: ["capacitor-charge-conservation"],
  },

  // ───────────────────────────────────────────────
  // 1. 電磁気 / コンデンサ - 電荷保存則
  // ───────────────────────────────────────────────
  {
    slug: "capacitor-charge-conservation",
    title: "コンデンサ｜電荷保存則と並列接続後の共通電位差",
    description:
      "充電したコンデンサ C₁ と未充電のコンデンサ C₂ を接続したときの共通電位差と各電荷を、孤立系の電荷保存則から求める典型問題。問題本文・段階解説・印刷向け PDF を無料公開。",
    lead: "電池を取り外した後の回路では、保存されるのは電圧ではなく電荷です。孤立した導体系の電荷保存則と、並列接続では電位差が等しくなることを組み合わせて解きます。",
    subject: "電磁気",
    topic: "コンデンサ",
    difficulty: "標準",
    points: 20,
    gradeLevel: "高校2年生 〜 高校3年生",
    pdfPath: "/prints/capacitor-charge-conservation.pdf",
    pageCount: 3,
    publishedAt: "2026-05-15",
    kind: "free",
    tags: ["電磁気", "コンデンサ", "電荷保存", "並列接続", "高校物理"],
    problemSetup: [
      {
        kind: "p",
        html: "図のように、はじめコンデンサ <i>C</i><sub>1</sub> を電池の電圧 <i>V</i> で十分に充電した。その後、電池を取り外し、電荷をもたないコンデンサ <i>C</i><sub>2</sub> を接続して、スイッチ S を閉じた。",
      },
      {
        kind: "p",
        html: "十分時間がたった後、両コンデンサの両端の電位差を <i>V</i>&prime;、コンデンサ <i>C</i><sub>1</sub>, <i>C</i><sub>2</sub> に蓄えられた電荷をそれぞれ <i>Q</i>&prime;<sub>1</sub>, <i>Q</i>&prime;<sub>2</sub> とする。ただし、導線やスイッチには電荷は蓄えられず、外部への電荷の逃げはないものとする。",
      },
    ],
    problemQuestions: [
      "電池で十分に充電した直後、コンデンサ <i>C</i><sub>1</sub> に蓄えられていた電荷 <i>Q</i><sub>0</sub> を、<i>C</i><sub>1</sub>, <i>V</i> を用いて表せ。",
      "スイッチ S を閉じて十分時間がたった後の共通の電位差 <i>V</i>&prime; を、<i>C</i><sub>1</sub>, <i>C</i><sub>2</sub>, <i>V</i> を用いて表せ。",
      "十分時間がたった後の <i>Q</i>&prime;<sub>1</sub>, <i>Q</i>&prime;<sub>2</sub> を、<i>C</i><sub>1</sub>, <i>C</i><sub>2</sub>, <i>V</i> を用いて表せ。",
    ],
    solution: [
      {
        id: "q1-initial-charge",
        heading: "(1) 充電直後の C₁ の電荷",
        blocks: [
          {
            kind: "p",
            html: "コンデンサの電荷・電気容量・電位差の関係は <i>Q</i> = <i>CV</i> である。電圧 <i>V</i> で十分に充電された <i>C</i><sub>1</sub> に蓄えられていた電荷 <i>Q</i><sub>0</sub> は、",
          },
          { kind: "eq", html: "<i>Q</i><sub>0</sub> = <i>C</i><sub>1</sub><i>V</i>" },
          { kind: "p", html: "となる。" },
        ],
      },
      {
        id: "q2-common-voltage",
        heading: "(2) 十分時間後の共通電位差",
        blocks: [
          {
            kind: "p",
            html: "電池を取り外した後は、回路全体が外部から孤立している。最初に <i>C</i><sub>1</sub> に蓄えられていた電荷の総量がそのまま保存される（電荷保存則）。",
          },
          {
            kind: "p",
            html: "スイッチ S を閉じると <i>C</i><sub>1</sub> と <i>C</i><sub>2</sub> は同じ二つの導体の間に接続される。したがって、十分時間がたった後、両コンデンサの電位差は等しくなり、これを <i>V</i>&prime; とおく。このとき、それぞれの電荷は",
          },
          { kind: "eq", html: "<i>Q</i>&prime;<sub>1</sub> = <i>C</i><sub>1</sub><i>V</i>&prime;,&emsp; <i>Q</i>&prime;<sub>2</sub> = <i>C</i><sub>2</sub><i>V</i>&prime;" },
          {
            kind: "p",
            html: "電荷保存則 <i>Q</i><sub>0</sub> = <i>Q</i>&prime;<sub>1</sub> + <i>Q</i>&prime;<sub>2</sub> に代入すると、",
          },
          { kind: "eq", html: "<i>C</i><sub>1</sub><i>V</i> = (<i>C</i><sub>1</sub> + <i>C</i><sub>2</sub>)<i>V</i>&prime;" },
          { kind: "p", html: "したがって、" },
          {
            kind: "eq",
            html: "<i>V</i>&prime; = <span class=\"frac\"><span class=\"num\"><i>C</i><sub>1</sub></span><span class=\"den\"><i>C</i><sub>1</sub> + <i>C</i><sub>2</sub></span></span> <i>V</i>",
          },
        ],
      },
      {
        id: "q3-each-charge",
        heading: "(3) 各コンデンサの電荷",
        blocks: [
          {
            kind: "p",
            html: "<i>Q</i>&prime;<sub>1</sub> = <i>C</i><sub>1</sub><i>V</i>&prime; に (2) の結果を代入して、",
          },
          {
            kind: "eq",
            html: "<i>Q</i>&prime;<sub>1</sub> = <span class=\"frac\"><span class=\"num\"><i>C</i><sub>1</sub><sup>2</sup></span><span class=\"den\"><i>C</i><sub>1</sub> + <i>C</i><sub>2</sub></span></span> <i>V</i>",
          },
          { kind: "p", html: "同様に、" },
          {
            kind: "eq",
            html: "<i>Q</i>&prime;<sub>2</sub> = <span class=\"frac\"><span class=\"num\"><i>C</i><sub>1</sub><i>C</i><sub>2</sub></span><span class=\"den\"><i>C</i><sub>1</sub> + <i>C</i><sub>2</sub></span></span> <i>V</i>",
          },
        ],
      },
    ],
    pointNote: [
      {
        kind: "callout",
        label: "ポイント",
        html: "電池を取り外した後の回路では、保存されるのは <strong>電圧ではなく、孤立した導体系全体の電荷</strong> である。スイッチを閉じた後は『<strong>両コンデンサの電位差が等しい</strong>』ことと『<strong>全電荷が保存される</strong>』ことを組み合わせて連立すれば、共通電位差 <i>V</i>&prime; が一意に決まる。",
      },
    ],
    relatedArticleSlugs: [
      "high-school-physics-electromagnetism-systematic-textbook",
      "high-school-physics-electromagnetism-weak",
    ],
    relatedPrintSlugs: ["point-charge-potential-and-field"],
  },

  // ───────────────────────────────────────────────
  // 2. 電磁気 / 点電荷 - 電位 vs 電界
  // ───────────────────────────────────────────────
  {
    slug: "point-charge-potential-and-field",
    title: "点電荷｜電位と電界の違い（スカラーとベクトル）",
    description:
      "+Q と −Q の点電荷が作る場の中心点で、電位と電界を求めて両者の違いを言語化する典型問題。スカラー量とベクトル量の和の取り方の差を、計算と図で確認できる無料 PDF プリント。",
    lead: "電位はスカラー量、電界はベクトル量。同じ距離・反対符号の点電荷からの寄与は、電位なら打ち消し合うのに、電界なら打ち消されません。両者の本質的な違いを 1 問で押さえます。",
    subject: "電磁気",
    topic: "点電荷の電位と電界",
    difficulty: "基礎",
    points: 20,
    gradeLevel: "高校2年生 〜 高校3年生",
    pdfPath: "/prints/point-charge-potential-and-field.pdf",
    pageCount: 3,
    publishedAt: "2026-05-15",
    kind: "free",
    tags: ["電磁気", "点電荷", "電位", "電界", "高校物理"],
    problemSetup: [
      {
        kind: "p",
        html: "真空中の一直線上に、点電荷 +<i>Q</i> と &minus;<i>Q</i> が置かれている。点電荷 +<i>Q</i> は座標 <i>x</i> = &minus;<i>a</i>、点電荷 &minus;<i>Q</i> は座標 <i>x</i> = <i>a</i> にある。ただし、<i>Q</i> &gt; 0、<i>a</i> &gt; 0 とする。",
      },
      {
        kind: "p",
        html: "また、点 P は座標 <i>x</i> = 0 にある。静電気力定数を <i>k</i> とし、電位の基準は無限遠とする。",
      },
    ],
    problemQuestions: [
      "点 P における電位 <i>V</i><sub>P</sub> を求めよ。",
      "点 P における電界の向きと大きさ <i>E</i><sub>P</sub> を求めよ。",
      "この結果から、電位と電界の違いを簡潔に説明せよ。",
    ],
    solution: [
      {
        id: "q1-potential",
        heading: "(1) 点 P における電位 V_P",
        blocks: [
          {
            kind: "p",
            html: "電位はスカラー量であり、各点電荷による電位をそのまま代数的に足し合わせる。+<i>Q</i> から P までの距離は <i>a</i> なので、+<i>Q</i> による電位は",
          },
          { kind: "eq", html: "<i>V</i><sub>+</sub> = <i>k</i><span class=\"frac\"><span class=\"num\"><i>Q</i></span><span class=\"den\"><i>a</i></span></span>" },
          { kind: "p", html: "&minus;<i>Q</i> から P までの距離も <i>a</i> なので、" },
          { kind: "eq", html: "<i>V</i><sub>&minus;</sub> = <i>k</i><span class=\"frac\"><span class=\"num\">&minus;<i>Q</i></span><span class=\"den\"><i>a</i></span></span>" },
          { kind: "p", html: "両者の和を取ると、" },
          { kind: "eq", html: "<i>V</i><sub>P</sub> = <i>V</i><sub>+</sub> + <i>V</i><sub>&minus;</sub> = 0" },
        ],
      },
      {
        id: "q2-field",
        heading: "(2) 点 P における電界 E_P",
        blocks: [
          {
            kind: "p",
            html: "電界はベクトル量なので、向きを考えて足し合わせる。正の点電荷がつくる電界は『電荷から遠ざかる向き』。点 P は +<i>Q</i> の右側にあるので、+<i>Q</i> による電界は <i>x</i> 軸の正の向き、大きさは",
          },
          { kind: "eq", html: "<i>E</i><sub>+</sub> = <i>k</i><span class=\"frac\"><span class=\"num\"><i>Q</i></span><span class=\"den\"><i>a</i><sup>2</sup></span></span>" },
          {
            kind: "p",
            html: "負の点電荷がつくる電界は『電荷へ向かう向き』。点 P から見て &minus;<i>Q</i> は右側にあるので、&minus;<i>Q</i> による電界も <i>x</i> 軸の正の向き、大きさは <i>E</i><sub>&minus;</sub> = <i>kQ/a</i><sup>2</sup>。よって 2 つの電界は同じ向きに加わり、",
          },
          { kind: "eq", html: "<i>E</i><sub>P</sub> = <span class=\"frac\"><span class=\"num\">2<i>kQ</i></span><span class=\"den\"><i>a</i><sup>2</sup></span></span>&emsp;（<i>x</i> 軸の正の向き）" },
        ],
      },
      {
        id: "q3-difference",
        heading: "(3) 電位と電界の違い",
        blocks: [
          {
            kind: "p",
            html: "電位は <strong>スカラー量</strong> なので、+<i>Q</i> と &minus;<i>Q</i> の寄与は符号付きで足され、点 P では打ち消し合って 0 になる。一方、電界は <strong>ベクトル量</strong> で、点 P において +<i>Q</i> の電界も &minus;<i>Q</i> の電界も同じ向き（+<i>x</i>）を向くので、打ち消されずに足し合わさり 2<i>kQ/a</i><sup>2</sup> となる。",
          },
          {
            kind: "p",
            html: "電位は『位置がもつ単位電荷あたりの位置エネルギー』を表し、電界は『正の単位電荷にはたらく力の向きと大きさ』を表す。<strong>電位が 0 でも電界は 0 とは限らない</strong>。",
          },
        ],
      },
    ],
    pointNote: [
      {
        kind: "callout",
        label: "ポイント",
        html: "電位はスカラー、電界はベクトル。<strong>足し算の仕方が違う</strong>。中心点が 0 になりやすいのは電位（符号付きスカラー和）、打ち消されにくいのは電界（向きを保ったベクトル和）。同じ配置を見ても、どちらを問われているかで答えがまるで違ってくる。",
      },
    ],
    relatedArticleSlugs: [
      "high-school-physics-electromagnetism-weak",
      "high-school-physics-electromagnetism-systematic-textbook",
    ],
    relatedPrintSlugs: ["capacitor-charge-conservation"],
  },

  // ───────────────────────────────────────────────
  // 3. 力学 / 単振動 - エネルギー保存
  // ───────────────────────────────────────────────
  {
    slug: "simple-harmonic-motion-energy-conservation",
    title: "単振動｜力学的エネルギー保存で速度を求める",
    description:
      "ばねにつながれた小物体の単振動を、力学的エネルギー保存則のみで処理する典型問題。任意位置の速さ・速さの最大値・運動エネルギーと位置エネルギーが等しくなる位置までを 5 問で問います。",
    lead: "単振動は、ばねの弾性エネルギー (1/2)kx² と運動エネルギー (1/2)mv² の交換です。微分方程式を使わなくても、エネルギー保存だけで任意位置の速さまで一気に書けます。",
    subject: "力学",
    topic: "単振動",
    difficulty: "標準",
    points: 20,
    gradeLevel: "高校1年生 〜 高校3年生",
    pdfPath: "/prints/simple-harmonic-motion-energy-conservation.pdf",
    pageCount: 4,
    publishedAt: "2026-05-15",
    kind: "free",
    tags: ["力学", "単振動", "エネルギー保存", "ばね", "高校物理"],
    problemSetup: [
      {
        kind: "p",
        html: "なめらかな水平面上に質量 <i>m</i> の小物体を置き、ばね定数 <i>k</i> の軽いばねにつなぐ。ばねが自然長のときの小物体の位置を O とし、そこからの変位を <i>x</i> とする。",
      },
      {
        kind: "p",
        html: "小物体を右向きに <i>A</i> だけ引いて静かにはなすと、小物体は水平面上で単振動を行う。摩擦や空気抵抗は無視できるものとし、力学的エネルギー保存を用いて答えよ。",
      },
    ],
    problemQuestions: [
      "小物体が変位 <i>x</i> の位置にあるとき、ばねの弾性力による位置エネルギー <i>U</i> を <i>k</i>, <i>x</i> を用いて表せ。",
      "小物体を <i>x</i> = <i>A</i> の位置から静かにはなしたときの力学的エネルギー <i>E</i> を求めよ。",
      "小物体が変位 <i>x</i> の位置を通過するときの速さ <i>v</i> を、<i>m</i>, <i>k</i>, <i>A</i>, <i>x</i> を用いて表せ。",
      "小物体の速さが最大となる位置と、その最大値 <i>v</i><sub>max</sub> を求めよ。",
      "運動エネルギーと弾性力による位置エネルギーが等しくなる位置 <i>x</i> を求めよ。",
    ],
    solution: [
      {
        id: "q1-potential",
        heading: "(1) ばねの位置エネルギー",
        blocks: [
          { kind: "p", html: "自然長の位置を基準にすると、弾性力による位置エネルギーは、" },
          { kind: "eq", html: "<i>U</i> = <span class=\"frac\"><span class=\"num\">1</span><span class=\"den\">2</span></span><i>kx</i><sup>2</sup>" },
        ],
      },
      {
        id: "q2-energy",
        heading: "(2) 力学的エネルギー",
        blocks: [
          {
            kind: "p",
            html: "<i>x</i> = <i>A</i> の位置から静かにはなすので、はじめの速さは 0。したがって力学的エネルギーは弾性力による位置エネルギーだけで、",
          },
          { kind: "eq", html: "<i>E</i> = <span class=\"frac\"><span class=\"num\">1</span><span class=\"den\">2</span></span><i>kA</i><sup>2</sup>" },
        ],
      },
      {
        id: "q3-velocity",
        heading: "(3) 変位 x での速さ v",
        blocks: [
          { kind: "p", html: "力学的エネルギー保存より、" },
          {
            kind: "eq",
            html: "<span class=\"frac\"><span class=\"num\">1</span><span class=\"den\">2</span></span><i>mv</i><sup>2</sup> + <span class=\"frac\"><span class=\"num\">1</span><span class=\"den\">2</span></span><i>kx</i><sup>2</sup> = <span class=\"frac\"><span class=\"num\">1</span><span class=\"den\">2</span></span><i>kA</i><sup>2</sup>",
          },
          { kind: "p", html: "これを <i>v</i> について解くと、" },
          {
            kind: "eq",
            html: "<i>v</i> = √(<i>k</i>/<i>m</i>) · √(<i>A</i><sup>2</sup> &minus; <i>x</i><sup>2</sup>)",
          },
        ],
      },
      {
        id: "q4-max",
        heading: "(4) 速さの最大値",
        blocks: [
          {
            kind: "p",
            html: "速さが最大になるのは位置エネルギーが最小の位置、すなわち <i>x</i> = 0 のとき。(3) に代入すると、",
          },
          {
            kind: "eq",
            html: "<i>v</i><sub>max</sub> = <i>A</i> · √(<i>k</i>/<i>m</i>)&emsp;（位置は <i>x</i> = 0）",
          },
        ],
      },
      {
        id: "q5-equal",
        heading: "(5) K = U となる位置",
        blocks: [
          {
            kind: "p",
            html: "全エネルギーが <i>E</i> = (1/2)<i>kA</i><sup>2</sup> で一定。<i>K</i> = <i>U</i> ならば <i>U</i> = (1/4)<i>kA</i><sup>2</sup> なので、",
          },
          {
            kind: "eq",
            html: "<span class=\"frac\"><span class=\"num\">1</span><span class=\"den\">2</span></span><i>kx</i><sup>2</sup> = <span class=\"frac\"><span class=\"num\">1</span><span class=\"den\">4</span></span><i>kA</i><sup>2</sup>",
          },
          { kind: "p", html: "両辺を整理して、" },
          {
            kind: "eq",
            html: "<i>x</i> = &plusmn;<span class=\"frac\"><span class=\"num\"><i>A</i></span><span class=\"den\">√2</span></span>",
          },
        ],
      },
    ],
    pointNote: [
      {
        kind: "callout",
        label: "考え方の整理",
        html: "単振動では『運動エネルギー + 弾性力による位置エネルギー』が一定。<strong>速さが最大なのは位置エネルギーが最小の <i>x</i> = 0</strong>。<strong>K = U になるのは全エネルギーを半分ずつ分けるとき</strong>。微分方程式を使わなくても、エネルギー保存だけで主要な量がすべて出る。",
      },
    ],
    relatedArticleSlugs: [
      "simple-harmonic-motion-energy",
      "mechanics-mastery-guide",
    ],
    relatedPrintSlugs: ["elastic-force-and-restoring-motion"],
  },

  // ───────────────────────────────────────────────
  // 4. 力学 / 弾性力 - フックの法則と復元力
  // ───────────────────────────────────────────────
  {
    slug: "elastic-force-and-restoring-motion",
    title: "弾性力｜フックの法則と復元力 F = −kx",
    description:
      "ばねにつながれた小物体が受ける弾性力 F = −kx の符号の意味、加速度、自然長を通過するときの速さを問う基礎問題。復元力の本質と、エネルギー保存の使い方をまとめて確認できる無料 PDF。",
    lead: "ばねの力は『ずれた向き』ではなく『もとの位置へ戻す向き』にはたらきます。これが復元力。F = −kx の負号を語れるかどうかが、単振動への入り口になります。",
    subject: "力学",
    topic: "弾性力・復元力",
    difficulty: "基礎",
    points: 20,
    gradeLevel: "高校1年生 〜 高校2年生",
    pdfPath: "/prints/elastic-force-and-restoring-motion.pdf",
    pageCount: 3,
    publishedAt: "2026-05-15",
    kind: "free",
    tags: ["力学", "弾性力", "フックの法則", "復元力", "高校物理"],
    problemSetup: [
      {
        kind: "p",
        html: "なめらかな水平面上に、質量 <i>m</i> の小物体が置かれている。小物体は、ばね定数 <i>k</i> の軽いばねにつながれており、ばねの他端は左側の壁に固定されている。",
      },
      {
        kind: "p",
        html: "小物体の中心が O にあるとき、ばねは自然長である。いま、小物体を O から右向きに距離 <i>x</i> だけ引きのばして静かに手を離す。右向きを正の向きとする。摩擦・空気抵抗・ばねの質量は無視できるものとする。",
      },
    ],
    problemQuestions: [
      "このとき、小物体にはたらくばねの力を、向きも含めて文字式で答えよ。",
      "小物体の加速度を、向きも含めて文字式で答えよ。",
      "小物体を O から右向きに距離 <i>A</i> だけ引きのばして静かに手を離したとする。小物体が初めて O を通過するときの速さを、文字式で答えよ。",
    ],
    solution: [
      {
        id: "q1-force",
        heading: "(1) ばねの力",
        blocks: [
          {
            kind: "p",
            html: "フックの法則より、ばねの力は変位に比例し、その向きは変位と反対向きである。右向きを正にとったとき、自然長の位置 O から右向きに <i>x</i> だけずれると、ばねは左向きに小物体を引き戻す。したがって、",
          },
          { kind: "eq", html: "<i>F</i> = &minus;<i>kx</i>" },
          {
            kind: "p",
            html: "つまり <strong>ばねの力は左向き、大きさは <i>kx</i></strong>。",
          },
        ],
      },
      {
        id: "q2-acceleration",
        heading: "(2) 小物体の加速度",
        blocks: [
          {
            kind: "p",
            html: "水平方向にはばねの力だけがはたらく。運動方程式 <i>ma</i> = <i>F</i> に <i>F</i> = &minus;<i>kx</i> を代入して、",
          },
          {
            kind: "eq",
            html: "<i>a</i> = &minus;<span class=\"frac\"><span class=\"num\"><i>k</i></span><span class=\"den\"><i>m</i></span></span><i>x</i>",
          },
          {
            kind: "p",
            html: "加速度は左向きで、大きさは (<i>k</i>/<i>m</i>)<i>x</i>。これが『加速度が変位と反対向き・大きさは変位に比例』という、単振動の本質的な構造である。",
          },
        ],
      },
      {
        id: "q3-velocity-at-o",
        heading: "(3) 自然長を通過するときの速さ",
        blocks: [
          {
            kind: "p",
            html: "<i>x</i> = <i>A</i> から静かに手を離すので、はじめの速さは 0。このとき蓄えられている弾性エネルギーは (1/2)<i>kA</i><sup>2</sup>。",
          },
          {
            kind: "p",
            html: "小物体が O を通過するときはばねが自然長なので弾性エネルギーは 0。エネルギー保存より、",
          },
          {
            kind: "eq",
            html: "<span class=\"frac\"><span class=\"num\">1</span><span class=\"den\">2</span></span><i>kA</i><sup>2</sup> = <span class=\"frac\"><span class=\"num\">1</span><span class=\"den\">2</span></span><i>mv</i><sup>2</sup>",
          },
          { kind: "p", html: "これを <i>v</i> について解くと、" },
          {
            kind: "eq",
            html: "<i>v</i> = <i>A</i> · √(<i>k</i>/<i>m</i>)",
          },
        ],
      },
    ],
    pointNote: [
      {
        kind: "callout",
        label: "まとめ",
        html: "ばねの力は <i>F</i> = &minus;<i>kx</i>。この <strong>負号こそがばねの本質</strong>であり、力は常に変位と反対向きにはたらく（復元力）。弾性エネルギー (1/2)<i>kx</i><sup>2</sup> は、自然長で運動エネルギーへとそっくり移る。<br />『位置のずれ → 復元力 → 運動』という流れの繰り返しが、単振動である。",
      },
    ],
    relatedArticleSlugs: [
      "simple-harmonic-motion-energy",
      "mechanics-mastery-guide",
    ],
    relatedPrintSlugs: ["simple-harmonic-motion-energy-conservation"],
  },
];

export function getPrintBySlug(slug: string): Print | undefined {
  return prints.find((p) => p.slug === slug);
}

export function allPrintSlugs(): readonly string[] {
  return prints.map((p) => p.slug);
}

export function getRelatedPrints(slug: string): Print[] {
  const print = getPrintBySlug(slug);
  if (!print?.relatedPrintSlugs) return [];
  return print.relatedPrintSlugs
    .map((s) => getPrintBySlug(s))
    .filter((p): p is Print => Boolean(p));
}

/**
 * 単元（subject）ごとにグルーピング。インデックスページで章立て表示するために使う。
 * 単元の並び順は src/data/site.ts の subjects に揃える。
 */
export function printsBySubject(): { subject: PrintSubject; items: Print[] }[] {
  const order: PrintSubject[] = ["力学", "電磁気", "波動", "熱力学", "原子"];
  return order
    .map((subject) => ({
      subject,
      items: prints.filter((p) => p.subject === subject),
    }))
    .filter((g) => g.items.length > 0);
}
