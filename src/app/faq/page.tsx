import type { Metadata } from "next";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { faqItems } from "@/data/faq";

export const metadata: Metadata = buildMetadata({
  title: "よくある質問 ｜ Solvora Learning Lab — 体験・料金・AI復習プリント",
  description:
    "Solvora Learning Lab（高校物理・理系個別指導 / AI復習プリント付き）によくある質問をまとめました。体験授業、授業形式、料金、オンライン受講、REM による復習プリント作成についてお答えしています（高校物理専門塾としての指導継続）。",
  path: "/faq",
  keywords: [
    "Solvora Learning Lab FAQ",
    "AI復習プリント よくある質問",
    "高校物理専門塾 FAQ",
    "高校物理専門塾 料金",
    "高校物理専門塾 体験授業",
    "オンライン物理 授業",
    "物理 体験授業 オンライン",
  ],
  category: "education",
});

export default function FaqPage() {
  const categories = Array.from(new Set(faqItems.map((f) => f.category)));

  return (
    <>
      <PageHero
        eyebrow="FAQ — よくある質問"
        watermark="問"
        tone="ink"
        breadcrumb={[
          { label: "ホーム", href: "/" },
          { label: "よくある質問", href: "/faq" },
        ]}
        title={
          <>
            <span className="block">受講前の</span>
            <span className="block">
              <span className="text-brand-deep">疑問</span>に、
            </span>
            <span className="block">先回りで答えます。</span>
          </>
        }
        description="Solvora Learning Lab の受講前によく寄せられるご質問をまとめました。ここにない内容は、お問い合わせフォームからお気軽にお送りください（高校物理専門塾としての指導継続）。"
      />

      <Section
        eyebrow="QUESTIONS"
        title="カテゴリ別 — よくある質問"
        description="受講・授業形式・料金・オンライン環境など、カテゴリ別に整理しています。"
      >
        <div className="space-y-12 sm:space-y-14">
          {categories.map((category) => {
            const items = faqItems.filter((f) => f.category === category);
            return (
              <div key={category}>
                <h2 className="mb-6 font-serif text-[1.4rem] sm:text-xl text-ink-900">
                  <span className="mr-3 text-brand-deep">—</span>
                  {category}
                </h2>
                <div className="space-y-3">
                  {items.map((q) => (
                    <details
                      key={q.question}
                      className="group rounded-2xl border border-ink-900/10 bg-white p-6 sm:p-6 [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-4 font-serif text-[1.05rem] sm:text-base leading-[1.55] text-ink-900 min-h-[40px]">
                        <span>{q.question}</span>
                        <span
                          aria-hidden
                          className="inline-flex h-8 w-8 sm:h-6 sm:w-6 items-center justify-center rounded-full border border-ink-900/15 text-base sm:text-xs transition group-open:rotate-45 shrink-0"
                        >
                          +
                        </span>
                      </summary>
                      <p className="mt-4 text-[15px] sm:text-sm leading-[2.05] sm:leading-relaxed text-ink-700">
                        {q.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <CtaBlock
        title="ご質問は、いつでも歓迎します。"
        description="記載のない内容は、お問い合わせフォームまたは体験授業の時間内でお気軽にご相談ください。"
      />

      <JsonLd
        id="ld-breadcrumb-faq"
        data={breadcrumbJsonLd([
          { name: "ホーム", href: "/" },
          { name: "よくある質問", href: "/faq" },
        ])}
      />
      <JsonLd
        id="ld-faqpage"
        data={faqPageJsonLd(
          faqItems.map((f) => ({ question: f.question, answer: f.answer })),
        )}
      />
      <JsonLd
        id="ld-webpage-faq"
        data={webPageJsonLd({
          name: "よくある質問 ｜ Solvora Learning Lab",
          description:
            "Solvora Learning Lab の体験授業、料金、授業形式、オンライン受講、AI 復習プリント（REM 補助）についての FAQ ページです（高校物理専門塾としての指導継続）。",
          path: "/faq",
        })}
      />
    </>
  );
}
