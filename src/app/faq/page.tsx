import type { Metadata } from "next";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { faqItems } from "@/data/faq";

export const metadata: Metadata = buildMetadata({
  title: "よくある質問 ｜ Solvora Learning Lab — プリント・参考書・学習サポート",
  description:
    "Solvora Learning Lab のよくある質問をまとめました。無料の演習プリント・参考書・学習サポート（体験授業 / オンライン個別指導）・料金・受講環境について先回りでお答えしています。",
  path: "/faq",
  keywords: [
    "Solvora Learning Lab FAQ",
    "高校物理 プリント よくある質問",
    "高校物理 参考書 よくある質問",
    "高校物理 個別指導 料金",
    "高校物理 体験授業",
    "オンライン物理 授業",
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
        description="Solvora Learning Lab のプリント・参考書・学習サポートについて、よく寄せられるご質問をまとめました。ここにない内容は、お問い合わせフォームからお気軽にお送りください。"
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
        eyebrow="STILL UNSURE — まだ気になる点があれば"
        title="ご質問は、いつでも歓迎します。"
        description="記載のない内容は、お問い合わせフォームまたは体験授業の時間内でお気軽にご相談ください。まずは演習プリントを試して、それでも気になる点があればどうぞ。"
        primary={{ label: "演習プリントを開く", href: "/prints" }}
        secondary={{ label: "お問い合わせを送る", href: "/contact" }}
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
            "Solvora Learning Lab のプリント・参考書・学習サポート（体験授業 / オンライン個別指導）・料金・受講環境についての FAQ ページです。",
          path: "/faq",
        })}
      />
    </>
  );
}
