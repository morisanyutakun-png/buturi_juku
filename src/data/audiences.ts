export type Audience = {
  level: string;
  label: string;
  body: string;
  tone: "beginner" | "mid" | "advanced" | "independent";
};

export const audiences: Audience[] = [
  {
    level: "LEVEL 01",
    label: "物理が初めての高校生・初学者",
    body: "『物理基礎が始まったけれど、授業についていけない』『教科書の式変形が追えない』。そんな段階から、現象の言語化と基本の立式を一緒に組み立て直します。",
    tone: "beginner",
  },
  {
    level: "LEVEL 02",
    label: "物理が苦手で、点数が伸び悩んでいる人",
    body: "『どこでつまずいているかわからない』『定期試験の点が下がってきた』方の再出発を支えます。苦手の原因を言語化し、必要なところだけを最短で補強します。",
    tone: "beginner",
  },
  {
    level: "LEVEL 03",
    label: "中堅大学志望・国公立志望の受験生",
    body: "標準レベルの問題を取り切って他科目の足を引っ張らない物理を目指します。無理な難問演習はせず、合格点を安定して超えるラインの完成度を優先します。",
    tone: "mid",
  },
  {
    level: "LEVEL 04",
    label: "難関大・医学部・旧帝大志望の受験生",
    body: "思考力問題での得点精度を上げるための、立式ロジックと検算の手順を体系化。過去問演習期には志望校の傾向に合わせた戦略に切り替えます。",
    tone: "advanced",
  },
  {
    level: "LEVEL 05",
    label: "独学で進めてきたが停滞している人",
    body: "『何が足りないのかがわからない』という独学者の壁を、外からの視点で言語化。必要な補強だけを的確に行い、自走できる状態に戻します。",
    tone: "independent",
  },
  {
    level: "LEVEL 06",
    label: "社会人・再チャレンジの学び直し層",
    body: "学び直しや資格試験、大学再受験などで物理を伸ばしたい社会人の方にも対応します。限られた時間から逆算した効率的な学習計画を設計します。",
    tone: "independent",
  },
];
