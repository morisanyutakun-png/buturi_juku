export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "森祐太 物理専門塾",
  shortName: "物理専門塾",
  tagline: "物理を、暗記ではなく理解へ。",
  description:
    "森祐太 物理専門塾は、高校物理に特化した完全オンラインの個別指導塾です。物理が初めての初学者から、中堅大志望、難関大・医学部志望まで、一人ひとりに合わせたカリキュラムで『現象理解から得点できる物理』へ導きます。",
  // カスタムドメイン設定後、ここを差し替える
  url: "https://example.com",
  locale: "ja_JP",
  ogImage: "/og-default.svg",
  twitter: "@buturi_juku",
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
    note: "オンライン指導中心（全国対応）",
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
