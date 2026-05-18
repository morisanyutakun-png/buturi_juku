export type NavItem = {
  label: string;
  href: string;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://example.com";

export const siteConfig = {
  name: "Solvora Learning Lab",
  nameSub: "高校物理 演習プリント・解説 PDF・参考書",
  /** SEO 上の二次的な肩書き（本文に自然に混ぜる用）。「高校物理 個別指導」を残す目的で保持。 */
  nameSeo: "高校物理 無料プリント・参考書・個別指導",
  nameEn: "SOLVORA LEARNING LAB",
  shortName: "Solvora",
  /** 旧ブランド。JSON-LD の alternateName と一部 SEO 文脈にのみ残す。表向きの本文には出さない。 */
  legacyName: "高校物理専門塾 物理の森",
  tagline: "公式は覚えた。それなのに、解けない方へ。",
  description:
    "公式は覚えたのに解けない——その壁を立式の手順から崩すために、力学・電磁気・波動・熱・原子の演習プリントを解答・解説まで無料で公開しています。さらに体系的に読みたい方には、講師・森祐太が書いた参考書『考える力を育てる』シリーズ全 6 冊と note の有料単発 PDF を。それでも詰まる単元には、60 分の体験授業と週次の個別サポートも用意しています。",
  url: siteUrl,
  locale: "ja_JP",
  // og:image / twitter:image are auto-generated from src/app/opengraph-image.tsx
  // (Next.js file-based convention). The path below is used by JSON-LD
  // logo / primaryImageOfPage references — Solvora 公式ロックアップ PNG を使用。
  ogImage: "/brand/solvora-lockup.png",
  ogImageAlt: "Solvora Learning Lab — 高校物理 演習プリント・解説 PDF・参考書",
  twitter: "@butsuri_no_mori",
  version: "2026.05.07",
  author: {
    name: "森 祐太",
    role: "主宰講師",
  },
  contact: {
    email: "morisan.yutakun@gmail.com",
    hours: "月・木・金 10:00–12:00 / 13:00–20:00、土日 10:00–18:00（火・水は休講・現状／その他の時間帯もご相談可能です）",
  },
  address: {
    region: "日本",
    note: "オンライン指導中心(全国対応)",
  },
  seo: {
    lastModified: "2026-05-12",
    defaultKeywords: [
      "高校物理専門塾",
      "高校物理 専門塾",
      "高校物理 塾",
      "物理専門塾",
      "物理塾",
      "高校物理 オンライン",
      "高校物理 個別指導",
      "大学受験 物理",
      "大学受験物理 専門塾",
      "オンライン物理塾",
      "高校物理",
      "共通テスト 物理",
      "難関大 物理",
      "力学",
      "電磁気",
    ],
    highIntentKeywords: [
      "高校物理専門塾 オンライン",
      "高校物理専門塾 個別指導",
      "高校物理専門塾 大学受験",
      "高校物理 オンライン 専門塾",
      "高校物理 個別指導 オンライン",
      "大学受験 物理 専門塾",
      "物理 苦手 克服 高校",
      "難関大 物理 専門塾",
      "医学部 物理 専門塾",
    ],
    /** 新ブランドの語彙。defaultKeywords/highIntentKeywords は旧 SEO 資産として維持し、ここを上乗せして使う。 */
    solvoraKeywords: [
      "Solvora Learning Lab",
      "高校物理 プリント 無料",
      "高校物理 演習プリント PDF",
      "高校物理 解説 PDF",
      "高校物理 参考書",
      "考える力を育てる",
      "AI 復習 プリント",
      "復習プリント PDF",
      "高校物理 教材",
      "高校物理 学習サポート",
    ],
    knowsAbout: [
      "高校物理専門塾",
      "高校物理",
      "大学受験物理",
      "高校物理 個別指導",
      "オンライン高校物理",
      "力学",
      "電磁気",
      "波動",
      "熱力学",
      "原子物理",
      "共通テスト物理",
      "物理の個別指導",
      "オンライン授業",
    ],
    serviceAreas: ["日本全国", "オンライン", "海外在住の日本語学習者"],
    audiences: [
      "高校生",
      "大学受験生",
      "既卒生",
      "医学部志望者",
      "難関大志望者",
      "物理を学び直したい社会人",
    ],
  },
} as const;

export const mainNav: NavItem[] = [
  { label: "演習プリント", href: "/prints" },
  { label: "参考書", href: "/teacher#books" },
  { label: "学習コラム", href: "/articles" },
  { label: "学習サポート", href: "/courses" },
  { label: "よくある質問", href: "/faq" },
  { label: "お問い合わせ", href: "/contact" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "教材",
    items: [
      { label: "演習プリント", href: "/prints" },
      { label: "参考書 6冊", href: "/teacher#books" },
      { label: "学習コラム", href: "/articles" },
    ],
  },
  {
    heading: "学習サポート",
    items: [
      { label: "サポート一覧", href: "/courses" },
      { label: "体験授業", href: "/trial" },
      { label: "オンライン受講", href: "/online" },
    ],
  },
  {
    heading: "塾について",
    items: [
      { label: "塾の理念", href: "/about" },
      { label: "講師紹介", href: "/teacher" },
      { label: "よくある質問", href: "/faq" },
      { label: "お問い合わせ", href: "/contact" },
    ],
  },
  {
    heading: "運営情報",
    items: [
      { label: "プライバシーポリシー", href: "/privacy" },
      { label: "特定商取引法に基づく表記", href: "/tokushoho" },
    ],
  },
];
