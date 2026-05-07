import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/container";
import { courses, getCourseBySlug } from "@/data/courses";

/**
 * 料金プレビュー（TOP）。
 * いちおし動線：体験授業 → 電磁気集中（おすすめ）→ 必要なら 1対1 専用カリキュラム。
 * カードに表示する 価格 / コース名 は data/courses.ts を単一情報源として参照。
 * これにより /courses ページや講座詳細ページとの表記ズレが起きない。
 */
type TierConfig = {
  slug: string;
  unit: string;
  note: string;
  accent: string;
  badge?: string;
  highlight?: boolean;
};

const tierConfigs: TierConfig[] = [
  {
    slug: "trial",
    unit: "60分 / 初回のみ / 無料",
    note: "受講のスタートは必ずここから。現状診断 + 学習戦略 + おすすめコースのご案内まで、その場で実施します。いきなり高額な講座にお金を払う必要はありません。",
    accent: "border-warm/35 bg-warm-bg/55",
    badge: "まずはここから",
  },
  {
    slug: "electromagnetism",
    unit: "1回 90分 × 全6回 / Solvora 主力講座",
    note: "森祐太が書いた『考える力を育てる 電磁気学』に沿って、場のイメージから回路までを書籍と同じ枠組みで一気通貫します。",
    accent: "border-brand/40 bg-brand-bg/65",
    badge: "おすすめ",
    highlight: true,
  },
  {
    slug: "private",
    unit: "1回 90分 × 月4回 / Solvora 最上位プロダクト",
    note: "毎回オーダーメイドの専用カリキュラムで、森祐太の指導時間を専有。難関大・医学部向けに、論述添削・過去問演習まで含む プレミアム（月額 88,000円）もご用意。",
    accent: "border-gold/40 bg-gold-soft/45",
  },
  {
    slug: "test-prep",
    unit: "1回 90分 × 全3回 / 駆け込み対応",
    note: "学校テスト直前 7〜10日前から。出題範囲を絞って、立式の型と誤答パターンを一気に仕上げます。",
    accent: "border-ink-900/15 bg-white/80",
  },
];

const tiers = tierConfigs.map((cfg) => {
  const course = getCourseBySlug(cfg.slug);
  if (!course) {
    throw new Error(
      `[price-preview] courses.ts に slug="${cfg.slug}" の講座がありません。`,
    );
  }
  return {
    label: course.title,
    price: course.price.value,
    unit: cfg.unit,
    note: cfg.note,
    href: `/courses/${course.slug}`,
    accent: cfg.accent,
    badge: cfg.badge,
    highlight: cfg.highlight,
  };
});

const totalCourseCount = courses.length;

export function PricePreview() {
  return (
    <section
      aria-labelledby="price-preview-heading"
      className="relative overflow-hidden border-b border-ink-900/[0.06] bg-paper-soft/55"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_85%_15%,rgba(202,163,75,0.12),transparent_55%),radial-gradient(circle_at_10%_85%,rgba(59,124,217,0.10),transparent_55%)]"
      />
      <Container className="relative py-16 sm:py-28">
        <div className="grid gap-8 md:grid-cols-[1fr_1.6fr] md:items-end">
          <div>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10.5px] sm:text-[10px] font-medium uppercase tracking-[0.22em] sm:tracking-[0.32em] text-brand-deep before:inline-block before:h-px before:w-5 sm:before:w-6 before:bg-current before:opacity-50">
              PRICING — Solvora Learning Lab の料金
            </p>
            <h2
              id="price-preview-heading"
              className="mt-6 font-serif text-display-md tracking-[-0.012em] text-ink-900"
            >
              料金は、
              <br className="hidden sm:block" />
              <span className="text-warm-deep">最初に</span>明示します。
            </h2>
            <p className="mt-5 max-w-md text-[15.5px] sm:text-[15px] leading-[2] sm:leading-[1.85] text-ink-700">
              いま一番おすすめは、書籍に沿った <strong className="font-medium text-ink-900">電磁気集中講座</strong>。森祐太が書いた『考える力を育てる 電磁気学』を講座カリキュラムに落とし込んだ Solvora の主軸講座です。さらに専用カリキュラムが必要な方には 1対1 専用カリキュラム指導、ピンポイントの方は分野別講座をご用意しています。入塾金・システム利用料は<strong className="font-medium text-ink-900">0円</strong>です。
            </p>
            <p className="mt-3 max-w-md text-[12.5px] sm:text-[12px] leading-[1.75] text-ink-500">
              ※ 指定教材（『考える力を育てる』シリーズ等）のみ、別途ご購入をお願いしています。
            </p>
            <Link
              href="/courses"
              className="mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-full border border-ink-900/15 bg-white/80 px-5 py-3 text-[14.5px] sm:text-[13.5px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white"
            >
              全 {totalCourseCount} 講座・料金詳細を見る
              <ArrowRight className="h-3.5 w-3.5 opacity-60" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {tiers.map((t) => (
              <Link
                key={t.label}
                href={t.href}
                className={`group relative overflow-hidden rounded-2xl border ${t.accent} ${
                  t.highlight ? "ring-2 ring-brand/40" : ""
                } bg-white/90 p-6 sm:p-7 shadow-soft backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-card`}
              >
                {t.badge && (
                  <span
                    className={`absolute right-4 top-4 inline-flex rounded-full px-2.5 py-1 text-[10.5px] font-medium tracking-[0.18em] uppercase ${
                      t.highlight
                        ? "bg-brand text-white"
                        : "bg-warm text-white"
                    }`}
                  >
                    {t.badge}
                  </span>
                )}
                <p
                  className={`text-[11px] sm:text-[10.5px] font-medium tracking-[0.24em] sm:tracking-[0.28em] uppercase ${
                    t.highlight ? "text-brand-deep" : "text-ink-700"
                  }`}
                >
                  {t.label}
                </p>
                <p className="mt-4 font-serif text-[2rem] sm:text-[2.3rem] leading-none tracking-[-0.018em] text-ink-900">
                  {t.price}
                </p>
                <p className="mt-3 text-[12.5px] sm:text-[12px] tracking-wide text-ink-500">
                  {t.unit}
                </p>
                <p className="mt-4 text-[14px] sm:text-[13.5px] leading-[1.85] text-ink-700">
                  {t.note}
                </p>
                <p className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] sm:text-[13px] text-ink-900 transition-transform group-hover:translate-x-0.5">
                  詳しく見る
                  <ArrowRight className="h-3.5 w-3.5" />
                </p>
              </Link>
            ))}
          </div>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-3">
          {[
            "入塾金 0円",
            "システム利用料 0円",
            "途中解約ペナルティなし",
          ].map((x) => (
            <li
              key={x}
              className="inline-flex items-center gap-3 rounded-full border border-ink-900/[0.08] bg-white/80 px-5 py-3 text-[14px] sm:text-[13.5px] text-ink-700"
            >
              <Check className="h-4 w-4 text-brand-deep" aria-hidden />
              {x}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
