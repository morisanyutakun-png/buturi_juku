import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/container";

type Tier = {
  label: string;
  price: string;
  unit: string;
  note: string;
  href: string;
  accent: string;
  badge?: string;
  highlight?: boolean;
};

const tiers: Tier[] = [
  {
    label: "体験授業",
    price: "無料",
    unit: "60分 / 初回のみ",
    note: "現状診断 + 学習戦略の提案までその場で実施",
    href: "/trial",
    accent: "border-warm/35 bg-warm-bg/60 text-warm-deep",
    badge: "まずはここから",
    highlight: true,
  },
  {
    label: "1対1個別指導",
    price: "月 38,000円〜",
    unit: "90分 × 月4回 / 講師固定",
    note: "志望校から逆算したフルカスタムカリキュラム",
    href: "/courses/private",
    accent: "border-brand/30 bg-brand-bg/55 text-brand-deep",
  },
  {
    label: "共通テスト対策",
    price: "全8回 48,000円",
    unit: "90分 × 8回",
    note: "読解・処理・時間配分まで含めた共通テスト特化",
    href: "/courses/kyotsu",
    accent: "border-forest/30 bg-forest-bg/60 text-forest-deep",
  },
  {
    label: "分野別 集中講座",
    price: "全6回 36,000円",
    unit: "90分 × 6回 / 力学 or 電磁気",
    note: "苦手分野だけを短期で立て直す集中講座",
    href: "/courses",
    accent: "border-gold/40 bg-gold-soft/50 text-gold-deep",
  },
];

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
      <Container className="relative py-20 sm:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-[11px] sm:text-[10px] font-medium uppercase tracking-[0.32em] text-brand-deep before:inline-block before:h-px before:w-6 before:bg-current before:opacity-50">
              PRICING — 高校物理専門塾の料金
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
              高校物理専門塾の入塾金は<strong className="font-medium text-ink-900">0円</strong>。教材費・システム利用料も別途いただきません。受講料の概算をTOPで先に示します。
            </p>
            <Link
              href="/courses"
              className="mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-full border border-ink-900/15 bg-white/80 px-5 py-3 text-[14.5px] sm:text-[13.5px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white"
            >
              料金詳細・全コースを見る
              <ArrowRight className="h-3.5 w-3.5 opacity-60" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {tiers.map((t) => (
              <Link
                key={t.label}
                href={t.href}
                className={`group relative overflow-hidden rounded-2xl border ${t.accent} bg-white/85 p-6 sm:p-7 shadow-soft backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-card`}
              >
                {t.highlight && (
                  <span className="absolute right-4 top-4 inline-flex rounded-full bg-warm px-2.5 py-1 text-[10.5px] font-medium tracking-[0.18em] uppercase text-white">
                    {t.badge}
                  </span>
                )}
                <p className="text-[11px] sm:text-[10.5px] font-medium tracking-[0.24em] sm:tracking-[0.28em] uppercase">
                  {t.label}
                </p>
                <p className="mt-4 font-serif text-[2.1rem] sm:text-[2.4rem] leading-none tracking-[-0.018em] text-ink-900">
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
            "教材費・システム利用料 0円",
            "途中解約ペナルティなし",
          ].map((x) => (
            <li
              key={x}
              className="inline-flex items-center gap-3 rounded-full border border-ink-900/[0.08] bg-white/80 px-5 py-3 text-[14px] sm:text-[13.5px] text-ink-700"
            >
              <Check className="h-4 w-4 text-forest-deep" aria-hidden />
              {x}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
