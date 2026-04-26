const words = [
  "高校物理専門塾",
  "オンライン全国対応",
  "1対1個別指導",
  "大学受験物理",
  "共通テスト物理 満点",
  "二次試験 9割",
  "難関大 / 医学部",
  "力学 / 電磁気",
  "波動 / 熱力学 / 原子",
  "名大合格生輩出",
  "書籍執筆実績",
  "言語化 → 立式 → 演習",
];

export function KeywordMarquee() {
  const lane = (
    <ul className="flex shrink-0 items-center gap-12 px-6 font-serif">
      {words.map((w, i) => (
        <li key={`${w}-${i}`} className="flex items-center gap-12 whitespace-nowrap">
          <span className="text-[1.6rem] sm:text-[2rem] tracking-[-0.012em] text-ink-900">
            {w}
          </span>
          <span aria-hidden className="h-2 w-2 rounded-full bg-warm" />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label="高校物理専門塾の特徴キーワード"
      className="relative overflow-hidden border-y border-ink-900/[0.08] bg-paper"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent sm:w-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent sm:w-40"
      />
      <div className="flex w-max items-center py-7 sm:py-10 marquee-track">
        {lane}
        {lane}
      </div>
      <style>{`
        @keyframes mq-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: mq-scroll 38s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
