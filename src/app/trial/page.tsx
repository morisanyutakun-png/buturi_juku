import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { Breadcrumb } from "@/components/breadcrumb";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "高校物理専門塾の無料体験授業(60分)",
  description:
    "高校物理専門塾「物理の森」の無料体験授業(60分)のご案内。高校物理の現状診断から学習戦略の提案までをその場で行う、高校物理専門塾のオンライン体験授業です。",
  path: "/trial",
  keywords: [
    "高校物理専門塾 体験授業",
    "高校物理 体験授業 無料",
    "オンライン 高校物理 体験授業",
    "大学受験 物理 学習相談",
  ],
  category: "education",
});

const flow = [
  {
    step: "01",
    time: "0 – 30分",
    title: "現状ヒアリング",
    body: "志望校・模試成績・使用教材・つまずきポイントを丁寧に整理します。前半をしっかり使うことで、後半の診断と提案の精度が上がります。",
  },
  {
    step: "02",
    time: "30 – 55分",
    title: "診断ミニ授業",
    body: "苦手分野の中から1テーマを選び、『言語化 → 立式 → 演習』の3ステップで指導を体験いただきます。",
  },
  {
    step: "03",
    time: "55 – 60分",
    title: "学習戦略の提案",
    body: "残り期間から逆算した学習ロードマップと、受講形式・料金についてお答えします。その場でお渡しできるよう構成しています。",
  },
];

export default function TrialPage() {
  return (
    <>
      <Container className="pt-10">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "体験授業", href: "/trial" },
          ]}
        />
      </Container>

      <Section
        eyebrow="FREE TRIAL SESSION"
        title={<>高校物理専門塾の体験授業 — <br className="sm:hidden" />60分で、あなたの高校物理を診断します。</>}
        description="高校物理専門塾「物理の森」の体験授業は、入塾を前提としない学習相談としてご利用いただけます。高校物理の現状の苦手分野と残り期間を踏まえた学習戦略を、その場でお渡しします。"
      >
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-10">
            <div className="rounded-2xl border border-ink-900/10 bg-white p-8">
              <p className="text-xs tracking-[0.28em] uppercase text-brand-deep">
                WHAT YOU GET
              </p>
              <ul className="mt-6 space-y-3 text-sm text-ink-800">
                {[
                  "苦手分野の現在地ヒアリング",
                  "診断ミニ授業による指導体験",
                  "残り期間を踏まえた学習ロードマップの提案",
                  "講座の詳細・費用面のご説明(ご希望の方のみ)",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs tracking-[0.28em] uppercase text-brand-deep">
                FOR WHOM
              </p>
              <h2 className="mt-4 font-serif text-2xl text-ink-900">
                このような方におすすめです
              </h2>
              <ul className="mt-6 space-y-3 text-sm text-ink-800">
                {[
                  "物理の勉強法そのものに迷っている方",
                  "独学で進めてきたが、行き詰まりを感じている方",
                  "どの分野から立て直すべきか判断がつかない方",
                  "総合塾に通っているが、物理だけ伸びない方",
                ].map((x) => (
                  <li
                    key={x}
                    className="flex items-start gap-3 rounded-xl border border-ink-900/10 bg-white p-4"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs tracking-[0.28em] uppercase text-brand-deep">
                TIMELINE
              </p>
              <h2 className="mt-4 font-serif text-2xl text-ink-900">
                当日の流れ(60分)
              </h2>
              <ol className="mt-6 space-y-3">
                {flow.map((f) => (
                  <li
                    key={f.step}
                    className="rounded-xl border border-ink-900/10 bg-white p-6"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-mono text-xs text-brand-deep">
                        STEP {f.step}
                      </p>
                      <p className="font-mono text-xs text-ink-400">{f.time}</p>
                    </div>
                    <p className="mt-3 font-serif text-ink-900">{f.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-700">
                      {f.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-ink-900/10 bg-gradient-to-br from-paper-soft to-white p-8">
              <p className="text-[10px] tracking-[0.28em] uppercase text-brand-deep">
                FEE
              </p>
              <p className="mt-4 font-serif text-3xl text-ink-900">無料</p>
              <p className="mt-3 text-xs text-ink-600">
                初回のみ。オンラインで実施します。
              </p>
              <p className="mt-1.5 text-[11px] text-ink-500">
                使用ツールは受講開始時にご案内します。
              </p>

              <ul className="mt-6 space-y-2 text-xs text-ink-700">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3 w-3 text-brand-deep" />
                  入塾前提ではありません
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3 w-3 text-brand-deep" />
                  保護者同席も可能です
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3 w-3 text-brand-deep" />
                  当日中に学習戦略をお渡しします
                </li>
              </ul>

              <Link
                href="/contact"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-warm px-5 py-3 text-sm font-medium text-white hover:bg-warm-deep transition"
              >
                申し込みフォームへ
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      <CtaBlock
        primary={{ label: "体験授業を申し込む", href: "/contact" }}
        secondary={{ label: "講座を見る", href: "/courses" }}
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
          name: "高校物理専門塾の無料体験授業(60分)",
          description:
            "高校物理専門塾「物理の森」の60分無料体験授業。現在の高校物理の理解度を診断し、学習戦略を提案します。",
          path: "/trial",
        })}
      />
      <JsonLd
        id="ld-service-trial"
        data={serviceJsonLd({
          name: "高校物理専門塾「物理の森」の無料体験授業",
          description:
            "高校物理専門塾「物理の森」が行う、高校物理・大学受験物理の現状診断と学習戦略提案の60分オンライン体験授業です。",
          path: "/trial",
          serviceType: "高校物理専門塾のオンライン学習相談 / 体験授業",
          price: "0",
        })}
      />
    </>
  );
}
