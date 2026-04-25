export type NavItem = {
  label: string;
  href: string;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://example.com";

export const siteConfig = {
  name: "物理の森",
  nameSub: "高校物理専門塾",
  nameEn: "MORI Physics Forest",
  shortName: "物理の森",
  tagline: "高校物理専門塾 — 考える力を育てる、オンライン物理塾。",
  description:
    "高校物理専門塾「物理の森」は、名古屋大学 工学部 電気電子情報工学科所属・大学受験物理の書籍執筆実績を持つ森祐太が主宰する、全国オンライン対応の高校物理専門塾です。高校物理の初学者から、中堅大、難関大・医学部志望まで、一人ひとりに合わせたカリキュラムで『考える力を育てる高校物理』へ導きます。",
  url: siteUrl,
  locale: "ja_JP",
  ogImage: "/og-default.svg",
  ogImageAlt: "物理の森 - 森祐太の物理専門塾",
  twitter: "@butsuri_no_mori",
  version: "2026.04.23",
  author: {
    name: "森 祐太",
    role: "主宰講師",
  },
  contact: {
    email: "morisan.yutakun@gmail.com",
    hours: "平日 10:00 – 21:00 / 土日 13:00 – 20:00",
  },
  address: {
    region: "日本",
    note: "オンライン指導中心(全国対応)",
  },
  seo: {
    lastModified: "2026-04-25",
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
      "共通テスト 物理 対策 専門塾",
      "難関大 物理 専門塾",
      "医学部 物理 専門塾",
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
  { label: "塾について", href: "/about" },
  { label: "講師紹介", href: "/teacher" },
  { label: "講座", href: "/courses" },
  { label: "物理学習コラム", href: "/articles" },
  { label: "よくある質問", href: "/faq" },
  { label: "お問い合わせ", href: "/contact" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "塾について",
    items: [
      { label: "塾の理念", href: "/about" },
      { label: "講師紹介", href: "/teacher" },
      { label: "講座一覧", href: "/courses" },
    ],
  },
  {
    heading: "学ぶ",
    items: [
      { label: "体験授業", href: "/trial" },
      { label: "物理学習コラム", href: "/articles" },
      { label: "よくある質問", href: "/faq" },
    ],
  },
  {
    heading: "お問い合わせ",
    items: [
      { label: "お問い合わせ", href: "/contact" },
      { label: "体験申込", href: "/trial" },
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
