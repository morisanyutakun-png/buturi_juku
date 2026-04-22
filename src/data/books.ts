export type Book = {
  slug: string;
  title: string;
  subtitle: string;
  tagline?: string;
  description: string;
  field: string;
  publishedYear: string;
  amazonUrl: string;
  coverImage: string;
  coverAspect?: string; // e.g. "4/3"
  badge?: string;
  highlights: string[];
};

export const books: Book[] = [
  {
    slug: "electromagnetism",
    title: "考える力を育てる 電磁気学",
    subtitle: "公式暗記では決して届かない、電磁気の『考える力』へ。",
    tagline: "【難関大志望者必見】",
    description:
      "電磁気で失点する受験生が抱える『場のイメージの欠如』と『回路の立式ロジックの曖昧さ』を、原理レベルから組み立て直すために書かれた一冊。電場・電位・磁場・電磁誘導・交流まで、視覚的な思考順序とともに体系化し、『自分で考えて解く力』を育てることを目的としています。",
    field: "電磁気学",
    publishedYear: "2025",
    amazonUrl: "https://amzn.asia/d/01R84xGQ",
    coverImage: "/book/electromagnetism-cover.jpg",
    coverAspect: "1135 / 870",
    badge: "著者による執筆書籍",
    highlights: [
      "電場・電位を『ベクトル場』として視覚化",
      "回路問題の立式ロジックを手順化",
      "電磁誘導を『面積変化』で一気通貫",
      "難関大入試の頻出問題を網羅",
    ],
  },
];

export const featuredBook = books[0];
