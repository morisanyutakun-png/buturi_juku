import type { Metadata } from "next";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { Breadcrumb } from "@/components/breadcrumb";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { faqItems } from "@/data/faq";

export const metadata: Metadata = buildMetadata({
  title: "高校物理専門塾のよくある質問 — 体験授業・料金・オンライン受講",
  description:
    "高校物理専門塾「物理の森」によくある質問をまとめました。高校物理専門塾の体験授業、授業形式、料金、オンライン受講についてお答えしています。",
  path: "/faq",
  keywords: [
    "高校物理専門塾 FAQ",
    "高校物理専門塾 料金",
    "高校物理専門塾 体験授業",
    "オンライン物理 授業",
    "物理 体験授業 無料",
  ],
  category: "education",
});

export default function FaqPage() {
  const categories = Array.from(new Set(faqItems.map((f) => f.category)));

  return (
    <>
      <Container className="pt-10">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "よくある質問", href: "/faq" },
          ]}
        />
      </Container>

      <Section
        eyebrow="FAQ"
        title="高校物理専門塾のよくある質問"
        description="高校物理専門塾「物理の森」の受講前に、よく寄せられるご質問をまとめました。ここにない内容は、お問い合わせフォームからお気軽にお送りください。"
      >
        <div className="space-y-14">
          {categories.map((category) => {
            const items = faqItems.filter((f) => f.category === category);
            return (
              <div key={category}>
                <h2 className="mb-6 font-serif text-xl text-ink-900">
                  <span className="mr-3 text-brand-deep">—</span>
                  {category}
                </h2>
                <div className="space-y-3">
                  {items.map((q) => (
                    <details
                      key={q.question}
                      className="group rounded-2xl border border-ink-900/10 bg-white p-6 [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-4 font-serif text-ink-900">
                        <span>{q.question}</span>
                        <span
                          aria-hidden
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-ink-900/15 text-xs transition group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="mt-4 text-sm leading-relaxed text-ink-700">
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
          name: "高校物理専門塾のよくある質問",
          description:
            "高校物理専門塾「物理の森」の体験授業、料金、授業形式、オンライン受講についてのFAQページです。",
          path: "/faq",
        })}
      />
    </>
  );
}
