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
];

export const featuredBook = books[0];
