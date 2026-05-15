/**
 * 演習プリント アーカイブのデータ。
 *
 * - PDF は public/prints/<slug>.pdf に配置（一次ソース）
 * - PDF をページ画像に変換した PNG は public/prints/<slug>/page-N.png に配置
 *   （`scripts/build-print-previews.sh` で再生成可能）。詳細ページの
 *   Web プレビューはこの PNG を縦に並べて表示する。
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
 * Web プレビュー用 PNG ページ画像のパスを返す。
 * 1-origin（先頭ページは page-1.png）。
 */
export function printPageImagePaths(print: Print): string[] {
  return Array.from(
    { length: print.pageCount },
    (_, i) => `/prints/${print.slug}/page-${i + 1}.png`,
  );
}

/** サムネイル（一覧カード・OG 画像など）として使う 1 ページ目の PNG パス。 */
export function printThumbPath(print: Print): string {
  return `/prints/${print.slug}/page-1.png`;
}

export const prints: Print[] = [
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
