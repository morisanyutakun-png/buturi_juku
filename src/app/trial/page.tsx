import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { breadcrumbJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "体験授業（60分・¥3,000）｜ Solvora Learning Lab",
  description:
    "Solvora Learning Lab の体験授業（60分・¥3,000）のご案内。現状診断から学習戦略の提案、おすすめコースのご案内までを講師（森祐太）が直接担当します。受講のスタートは必ずここから。決済完了をもって申し込み確定（高校物理・理系個別指導 / AI復習プリント付き）。",
  path: "/trial",
  keywords: [
    "Solvora Learning Lab 体験授業",
    "高校物理 体験授業",
    "高校物理専門塾 体験授業",
    "オンライン 高校物理 体験授業",
    "大学受験 物理 学習相談",
  ],
  category: "education",
});

const flow = [
  {
    step: "01",
    time: "0 – 10分",
    title: "苦手調査",
    body: "申込フォームで選んでいただいた分野・単元をもとに、つまずいているポイントを具体化します。志望校・模試成績・使用教材も伺い、当日の授業で扱う問題の難易度を最終調整します。",
  },
  {
    step: "02",
    time: "10 – 45分",
    title: "REM 演習プリントを使った授業",
    body: "選んだ単元について、AI（REM）で作成した演習プリント（問題＋解答＋解説）を当日の教材として進めます。『言語化 → 立式 → 演習』の3ステップを実際になぞり、書籍ベースの主力講座と同じ思考順序を圧縮して体験できます。",
  },
  {
    step: "03",
    time: "45 – 55分",
    title: "質疑応答（必要に応じて）",
    body: "授業中に詰まった点、他の単元への波及、勉強法に関する個別の疑問などにお答えします。授業の延長というより、その場で気になったことを残さず持ち帰れるよう、フリーな時間として確保しています。",
  },
  {
    step: "04",
    time: "55 – 60分",
    title: "今後の学習方針の提案",
    body: "残り期間と当日の手応えから、次に取り組むべき単元・教材・週次の進め方を整理してお渡しします。電磁気集中講座（おすすめ）／ 分野別集中 ／ 定期テスト対策など、合うコースがあればその場でご案内します（勧誘はしません）。",
  },
];

export default function TrialPage() {
  return (
    <>
      <PageHero
        eyebrow="TRIAL — 60分・¥3,000 の体験授業"
        watermark="試"
        tone="warm"
        breadcrumb={[
          { label: "ホーム", href: "/" },
          { label: "体験授業", href: "/trial" },
        ]}
        title={
          <>
            <span className="block">
              <span className="text-warm">60分・¥3,000</span>で、
            </span>
            <span className="block">あなたの高校物理を</span>
            <span className="block">診断します。</span>
          </>
        }
        description="Solvora Learning Lab の体験授業は、入塾を前提としない学習相談としてご利用いただけます。本気で受験と向き合う方への軽い参加コストとして ¥3,000 をいただき、現状の苦手分野と残り期間を踏まえた学習戦略を、講師（森祐太）が直接お渡しします。一番おすすめしているのは、書籍ベースの電磁気集中講座。分野別講座・定期テスト対策もご用意しています。"
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact?topic=trial#contact-form"
            className="group inline-flex items-center gap-2 rounded-full bg-warm px-7 py-4 text-[15px] sm:text-[14px] font-medium text-white shadow-warm transition hover:bg-warm-deep min-h-[52px] sm:min-h-0"
          >
            体験授業を申し込む
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-full border border-ink-900/[0.14] bg-white/80 px-7 py-4 text-[15px] sm:text-[14px] text-ink-800 transition hover:border-ink-900/30 hover:bg-white min-h-[52px] sm:min-h-0"
          >
            高校物理・理系個別指導の講座を見る
            <ArrowRight className="h-3.5 w-3.5 opacity-50" />
          </Link>
        </div>
      </PageHero>

      <Section
        eyebrow="OVERVIEW"
        title="体験授業の中身"
        description="苦手調査 → REM 演習プリントを使った授業 → 質疑応答 → 学習方針の提案。60分のなかで密度高く進めます。"
      >
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-10">
            <div className="rounded-2xl border border-ink-900/10 bg-white p-7 sm:p-8">
              <p className="text-[12px] sm:text-xs tracking-[0.24em] sm:tracking-[0.28em] uppercase text-brand-deep font-medium">
                WHAT YOU GET
              </p>
              <ul className="mt-6 space-y-4 sm:space-y-3 text-[15px] sm:text-sm leading-[1.85] sm:leading-normal text-ink-800">
                {[
                  "選んだ単元の苦手調査と難易度調整",
                  "REM 演習プリントを使った授業体験",
                  "気になった点をその場で解消する質疑応答",
                  "今後の学習方針（教材・進め方）の提案",
                  "講座の詳細・費用面のご説明(ご希望の方のみ)",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-3">
                    <Check className="mt-1 sm:mt-0.5 h-4 w-4 shrink-0 text-brand-deep" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[12px] sm:text-xs tracking-[0.24em] sm:tracking-[0.28em] uppercase text-brand-deep font-medium">
                FOR WHOM
              </p>
              <h2 className="mt-4 font-serif text-[1.55rem] sm:text-2xl text-ink-900">
                このような方におすすめです
              </h2>
              <ul className="mt-6 space-y-3 text-[15px] sm:text-sm leading-[1.85] sm:leading-normal text-ink-800">
                {[
                  "物理の勉強法そのものに迷っている方",
                  "独学で進めてきたが、行き詰まりを感じている方",
                  "どの分野から立て直すべきか判断がつかない方",
                  "総合塾に通っているが、物理だけ伸びない方",
                ].map((x) => (
                  <li
                    key={x}
                    className="flex items-start gap-3 rounded-xl border border-ink-900/10 bg-white p-5 sm:p-4"
                  >
                    <Check className="mt-1 sm:mt-0.5 h-4 w-4 shrink-0 text-brand-deep" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[12px] sm:text-xs tracking-[0.24em] sm:tracking-[0.28em] uppercase text-brand-deep font-medium">
                TIMELINE
              </p>
              <h2 className="mt-4 font-serif text-[1.55rem] sm:text-2xl text-ink-900">
                当日の流れ(60分)
              </h2>
              <ol className="mt-6 space-y-3">
                {flow.map((f) => (
                  <li
                    key={f.step}
                    className="rounded-xl border border-ink-900/10 bg-white p-6"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-mono text-[12.5px] sm:text-xs text-brand-deep">
                        STEP {f.step}
                      </p>
                      <p className="font-mono text-[12.5px] sm:text-xs text-ink-400">{f.time}</p>
                    </div>
                    <p className="mt-4 sm:mt-3 font-serif text-[1.15rem] sm:text-base text-ink-900">{f.title}</p>
                    <p className="mt-3 sm:mt-2 text-[14.5px] sm:text-sm leading-[1.95] sm:leading-relaxed text-ink-700">
                      {f.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-ink-900/10 bg-gradient-to-br from-paper-soft to-white p-7 sm:p-8">
              <p className="text-[11px] sm:text-[10px] tracking-[0.24em] sm:tracking-[0.28em] uppercase text-brand-deep">
                FEE
              </p>
              <p className="mt-4 font-serif text-[2.4rem] sm:text-3xl text-ink-900">¥3,000</p>
              <p className="mt-3 text-[13.5px] sm:text-xs leading-relaxed text-ink-600">
                60分・初回のみ／前払い／オンライン実施。
              </p>
              <p className="mt-2 sm:mt-1.5 text-[12.5px] sm:text-[11px] text-ink-500">
                お申し込みフォーム送信時に Stripe での決済確認が必要です（決済完了で申し込み確定）。
              </p>

              <ul className="mt-7 sm:mt-6 space-y-3 sm:space-y-2 text-[14px] sm:text-xs leading-[1.7] text-ink-700">
                <li className="flex items-start gap-2.5 sm:gap-2">
                  <Check className="mt-1 sm:mt-0.5 h-4 w-4 sm:h-3 sm:w-3 shrink-0 text-brand-deep" />
                  入塾前提ではありません（無理な勧誘なし）
                </li>
                <li className="flex items-start gap-2.5 sm:gap-2">
                  <Check className="mt-1 sm:mt-0.5 h-4 w-4 sm:h-3 sm:w-3 shrink-0 text-brand-deep" />
                  保護者同席も可能です
                </li>
                <li className="flex items-start gap-2.5 sm:gap-2">
                  <Check className="mt-1 sm:mt-0.5 h-4 w-4 sm:h-3 sm:w-3 shrink-0 text-brand-deep" />
                  当日中に学習戦略 + おすすめコース（電磁気集中・定期テスト対策など）のご提案
                </li>
                <li className="flex items-start gap-2.5 sm:gap-2">
                  <Check className="mt-1 sm:mt-0.5 h-4 w-4 sm:h-3 sm:w-3 shrink-0 text-brand-deep" />
                  講師（森祐太）が直接担当
                </li>
              </ul>

              <Link
                href="/contact?topic=trial#contact-form"
                className="mt-8 inline-flex w-full min-h-[52px] sm:min-h-0 items-center justify-center gap-2 rounded-full bg-warm px-5 py-4 sm:py-3 text-[15px] sm:text-sm font-medium text-white hover:bg-warm-deep transition"
              >
                体験授業の申し込みフォームへ
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      <Section
        eyebrow="AFTER THE TRIAL"
        title="体験のあと、自分のペースで続けたい方へ"
        description="体験授業は1回完結ですが、続けて取り組みたい単元が出てきた方には、定期テスト対策講座が次の一歩として自然です。"
        className="bg-paper-soft"
      >
        <div className="grid gap-6 rounded-2xl border border-ink-900/10 bg-white/90 p-6 sm:p-9 shadow-soft md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="text-[10.5px] sm:text-[11px] font-medium tracking-[0.22em] sm:tracking-[0.28em] uppercase text-warm-deep">
              定期テスト対策講座
            </p>
            <h3 className="mt-3 sm:mt-4 font-serif text-[1.35rem] sm:text-[1.6rem] leading-[1.45] tracking-[-0.012em] text-ink-900">
              強化したい単元を選び、<br className="sm:hidden" />
              詰まった問題は専用プリントに。
            </h3>
            <ul className="mt-5 space-y-3 text-[14px] sm:text-[14.5px] leading-[1.85] text-ink-700">
              <li className="flex items-start gap-2.5">
                <Check className="mt-1 h-4 w-4 shrink-0 text-brand-deep" />
                <span>
                  力学 / 熱 / 波 / 電磁気 / 原子から、
                  <strong className="font-medium text-ink-900">伸ばしたい単元</strong>
                  を選んで集中演習。
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-1 h-4 w-4 shrink-0 text-brand-deep" />
                <span>
                  授業中に詰まった問題は、AI（REM）で
                  <strong className="font-medium text-ink-900">専用の復習プリント</strong>
                  を準備し、次回の冒頭でフォローします。
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-1 h-4 w-4 shrink-0 text-brand-deep" />
                <span>
                  学校の定期テスト直前にも、入試前の単元立て直しにも使えます。
                </span>
              </li>
            </ul>
            <p className="mt-5 text-[12.5px] sm:text-[12px] leading-[1.75] text-ink-500">
              ※ コース詳細・受講料は講座ページにてご確認ください。体験授業の終了時にも個別にご案内します。
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/courses/test-prep"
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-ink-900 px-5 py-3.5 text-[14.5px] sm:text-[14px] font-medium text-paper transition hover:bg-ink-800"
            >
              定期テスト対策講座の詳細を見る
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-ink-900/15 bg-white px-5 py-3.5 text-[14.5px] sm:text-[14px] text-ink-800 transition hover:border-ink-900/30 hover:bg-paper-soft"
            >
              他の講座も見る
              <ArrowRight className="h-3.5 w-3.5 opacity-60" />
            </Link>
          </div>
        </div>
      </Section>

      <CtaBlock
        primary={{ label: "体験授業を申し込む", href: "/contact?topic=trial#contact-form" }}
        secondary={{ label: "高校物理・理系個別指導の講座を見る", href: "/courses" }}
      />

      <JsonLd
        id="ld-breadcrumb-trial"
        data={breadcrumbJsonLd([
          { name: "ホーム", href: "/" },
          { name: "体験授業", href: "/trial" },
        ])}
      />
      <JsonLd
        id="ld-webpage-trial"
        data={webPageJsonLd({
          name: "体験授業（60分・¥3,000）｜ Solvora Learning Lab",
          description:
            "Solvora Learning Lab の60分・¥3,000 体験授業。現在の高校物理の理解度を診断し、学習戦略とおすすめコース（電磁気集中講座 / 分野別講座 / 定期テスト対策）を提案します（高校物理専門塾としての指導継続）。",
          path: "/trial",
        })}
      />
      <JsonLd
        id="ld-service-trial"
        data={serviceJsonLd({
          name: "Solvora Learning Lab の体験授業（高校物理・理系個別指導）",
          description:
            "Solvora Learning Lab が行う、高校物理・大学受験物理の現状診断と学習戦略提案の60分オンライン体験授業（¥3,000）です（高校物理専門塾としての指導継続）。",
          path: "/trial",
          serviceType: "オンライン学習相談 / 体験授業 / 高校物理・理系個別指導",
          price: "3000",
        })}
      />
    </>
  );
}
