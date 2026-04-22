export type Testimonial = {
  name: string;
  role: string;
  body: string;
  score?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "K.S さん",
    role: "高3 / 国立大 理学部志望",
    score: "偏差値 52 → 68",
    body: "公式を暗記しているだけだったと、体験授業で初めて気づきました。力学の立式手順を教わってから、他の分野の問題まで式の立て方が安定しました。",
  },
  {
    name: "M.T さん",
    role: "高3 / 医学部志望",
    score: "共通テスト 62% → 91%",
    body: "電磁気が最後まで苦手でしたが、先生の本で紹介されていた『場の見方』で一気に理解が進みました。質問チャットも早く返ってきて安心でした。",
  },
  {
    name: "Y.N さん",
    role: "既卒 / 難関理工系志望",
    body: "独学で停滞していましたが、現状ヒアリングから逆算して無駄のないカリキュラムを組んでもらえました。オンラインなので移動時間のロスがなかったのも大きかったです。",
  },
];
