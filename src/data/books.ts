export type Book = {
  slug: string;
  title: string;
  subtitle: string;
  tagline?: string;
  description: string;
  field: string;
  publishedYear: string;
  amazonUrl?: string;
  coverImage: string;
  coverWidth: number;
  coverHeight: number;
  badge?: string;
  highlights: string[];
  /** Pull-quote rendered next to the book. */
  pullQuote?: { body: string; emphasis?: string };
};

export const books: Book[] = [
  {
    slug: "electromagnetism",
    title: "考える力を育てる 電磁気学",
    subtitle: "公式暗記では決して届かない、電磁気の『考える力』へ。",
    tagline: "難関国公立大志望者必見",
    description:
      "電磁気で失点する受験生が抱える『場のイメージの欠如』と『回路の立式ロジックの曖昧さ』を、原理レベルから組み立て直すために書かれた一冊。電場・電位・磁場・電磁誘導・交流まで、視覚的な思考順序とともに体系化し、『自分で考えて解く力』を育てることを目的としています。",
    field: "電磁気学",
    publishedYear: "2025",
    amazonUrl: "https://amzn.asia/d/01R84xGQ",
    coverImage: "/book/electromagnetism-cover.svg",
    coverWidth: 1713,
    coverHeight: 2655,
    badge: "著者による執筆書籍",
    highlights: [
      "電場・電位を『ベクトル場』として視覚化",
      "回路問題の立式ロジックを手順化",
      "電磁誘導を『面積変化』で一気通貫",
      "難関大入試の頻出問題を網羅",
    ],
    pullQuote: {
      body: "電磁気で失点する本当の理由は、公式の暗記量ではなく、",
      emphasis: "場のイメージの欠如にある。",
    },
  },
  {
    slug: "mechanics",
    title: "考える力を育てる 力学",
    subtitle: "公式の羅列ではなく、現象の本質と法則の成り立ちから理解する力学へ。",
    tagline: "難関国公立大志望者必見",
    description:
      "高校物理を踏まえつつ、大学初年度レベルまでを射程に入れて力学を体系化した一冊。運動方程式・エネルギー・運動量という三つの道具の使い分けから、円運動・単振動・万有引力・剛体・流体までを、現象の本質と法則の成り立ちに踏み込んで解説。知識を暗記するのではなく、物理現象を論理的に解析し、応用問題に対応できる力を育てることを目指しています。",
    field: "力学",
    publishedYear: "2026",
    amazonUrl: "https://amzn.asia/d/0efFqrcE",
    coverImage: "/book/mechanics-cover.webp",
    coverWidth: 1140,
    coverHeight: 1602,
    badge: "著者による執筆書籍",
    highlights: [
      "運動方程式・エネルギー・運動量を『3つの道具』として整理",
      "衝突・重心系・慣性力など発展トピックも収録",
      "円運動・単振動・万有引力をケプラーから一気通貫",
      "剛体・慣性モーメント・流体まで大学初年度を射程に",
    ],
    pullQuote: {
      body: "公式の羅列ではなく、",
      emphasis: "現象の本質から法則を組み立てる。",
    },
  },
  {
    slug: "thermodynamics",
    title: "考える力を育てる 熱力学",
    subtitle: "マクロな状態量とミクロな分子運動を、『微小と積分』で結ぶ。",
    tagline: "難関国公立大志望者必見",
    description:
      "熱力学の基本概念から応用まで体系的に学べる構成。高校物理を踏まえつつ、大学初年度レベルまでを射程に入れて整理した一冊。公式の羅列ではなく、現象の本質と法則の成り立ちを理解することに重点を置き、マクロな状態量とミクロな分子運動を結ぶ『微小と積分』の視座から、熱の世界を読み解く共通言語を獲得することを目指します。",
    field: "熱力学",
    publishedYear: "2026",
    amazonUrl: "https://amzn.asia/d/07jsS2MB",
    coverImage: "/book/thermodynamics-cover.webp",
    coverWidth: 1140,
    coverHeight: 1602,
    badge: "著者による執筆書籍",
    highlights: [
      "気体分子運動論からマクロな状態量へ橋渡し",
      "熱機関・冷却器・ヒートポンプを統一的に整理",
      "第2法則・エントロピー(発展)まで踏み込む",
      "相変化・蒸気圧・湿度・露点・熱気球まで網羅",
    ],
    pullQuote: {
      body: "マクロな状態量とミクロな分子運動を結ぶ ",
      emphasis: "『微小と積分』 が、熱の世界を読み解く共通言語となる。",
    },
  },
  {
    slug: "wave-atom",
    title: "考える力を育てる 波動・原子",
    subtitle: "波の重ね合わせと量子条件という、二つの原理から世界を読み解く。",
    tagline: "難関国公立大志望者必見",
    description:
      "波動と原子の基本概念から応用まで体系的に学べる構成。高校物理を踏まえつつ、大学初年度レベルまでを射程に入れて整理した一冊。公式の暗記ではなく、波の重ね合わせと量子条件という二つの原理から世界を読み解くことに重点を置き、関数 y(x,t) で記述される波と、整数で番号付けされた原子の状態が、同じ『波動方程式の風景』で繋がる構造を描き出します。",
    field: "波動・原子",
    publishedYear: "2026",
    amazonUrl: "https://amzn.asia/d/0eEpio9t",
    coverImage: "/book/wave-atom-cover.webp",
    coverWidth: 1140,
    coverHeight: 1603,
    badge: "著者による執筆書籍",
    highlights: [
      "波の基本式 y(x,t) と波動方程式から再構築",
      "重ね合わせ・定在波・うなり・干渉を一気通貫",
      "光電効果・コンプトン散乱・物質波・ボーア模型",
      "原子核・崩壊則・E = mc² まで射程に",
    ],
    pullQuote: {
      body: "関数 y(x,t) の波と整数で番号付けされた原子の状態が、",
      emphasis: "同じ『波動方程式の風景』 で繋がる。",
    },
  },
  {
    slug: "physics-1",
    title: "考える力を育てる 高校物理I — 力学・電磁気",
    subtitle: "力学と電磁気を貫く『微小と積分』で、高校物理の核を一本の流れで読み解く。",
    tagline: "難関国公立 二次対策",
    description:
      "高校物理の核である力学と電磁気を、『微小と積分』という同じ視座から一本の流れで読み解くシリーズ第I巻。位置・速度・加速度から運動方程式・エネルギー・運動量へ、電場と磁場が織りなす場の見方から回路・電磁誘導までを、微分と積分という共通言語で繋いで読み通します。高校物理を踏まえつつ、大学初年度レベルへの橋渡しまで射程に入れた、地方国公立から旧帝大までを志す受験生のための一冊。",
    field: "高校物理I（力学・電磁気）",
    publishedYear: "2026",
    amazonUrl: "https://amzn.asia/d/01FaauPU",
    coverImage: "/book/physics-1-cover.webp",
    coverWidth: 1140,
    coverHeight: 1602,
    badge: "Series · Physics I",
    highlights: [
      "Part I 力学：運動方程式・エネルギー・運動量を統合",
      "円運動・単振動・万有引力・剛体・流体まで収録",
      "Part II 電磁気：静電界・静磁界から交流回路まで",
      "アンペール・ビオサバール・非線形抵抗まで踏み込む",
    ],
    pullQuote: {
      body: "公式と解法の暗記ではなく、現象を小さく分けて式にし、",
      emphasis: "必要な量を足し集める ―― その思考をひたすら鍛える。",
    },
  },
  {
    slug: "physics-2",
    title: "考える力を育てる 高校物理II — 熱・波動・原子",
    subtitle: "熱・波動・原子を貫く『微小と積分・波と整数』の視座から、高校物理の核を一本の流れで読み解く。",
    tagline: "難関国公立 二次対策",
    description:
      "高校物理の核である熱・波動・原子を、『微小と積分・波と整数』という同じ視座から一本の流れで読み解くシリーズ第II巻。気体分子運動論から熱機関・エントロピー・湿度・熱気球へ、関数 y(x,t) の波動から、ドップラー効果・干渉・幾何光学へ、光電効果・物質波・ボーア模型から原子核・E = mc² までを、微分と積分・波と整数という同じ言葉でつないで読み通します。",
    field: "高校物理II（熱・波動・原子）",
    publishedYear: "2026",
    amazonUrl: "https://amzn.asia/d/0ccBQ1I3",
    coverImage: "/book/physics-2-cover.webp",
    coverWidth: 1140,
    coverHeight: 1602,
    badge: "Series · Physics II",
    highlights: [
      "Part I 熱力学：気体分子運動論から熱機関・エントロピーへ",
      "Part II 波動：重ね合わせ・定在波・干渉・幾何光学",
      "Part III 原子：光電効果・物質波・ボーア模型・原子核",
      "高校物理から大学初年度への橋渡しを担う一冊",
    ],
    pullQuote: {
      body: "微分と積分・波と整数という同じ言葉で、",
      emphasis: "熱・波動・原子を一本の流れで読み通す。",
    },
  },
];

export const featuredBook = books[0];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}
