import type { Metadata } from "next";
import { Mail, Clock, MapPin } from "lucide-react";
import { Section } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "高校物理専門塾「物理の森」へのお問い合わせ",
  description:
    "高校物理専門塾「物理の森」へのお問い合わせはこちらから。高校物理専門塾の体験授業のお申し込み、受講相談、料金に関するご質問などをお受けしています。",
  path: "/contact",
  keywords: [
    "高校物理専門塾 お問い合わせ",
    "高校物理 体験授業 申し込み",
    "オンライン 高校物理 相談",
  ],
  category: "education",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT — お問い合わせ"
        watermark="縁"
        tone="brand"
        breadcrumb={[
          { label: "ホーム", href: "/" },
          { label: "お問い合わせ", href: "/contact" },
        ]}
        title={
          <>
            <span className="block">高校物理専門塾と、</span>
            <span className="block">
              <span className="text-brand">最初の一歩</span>を。
            </span>
          </>
        }
        description="高校物理専門塾「物理の森」では、体験授業のお申し込み・受講前のご相談・料金に関するご質問などをお受けしています。2営業日以内にご返信します。"
      />

      <Section
        eyebrow="CONTACT FORM"
        title="お問い合わせフォーム"
        description="ご相談内容に応じて、最適な学習プランをご案内します。"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 text-brand-deep" aria-hidden />
                <div>
                  <p className="text-[10px] tracking-[0.28em] uppercase text-ink-400">
                    MAIL
                  </p>
                  <p className="mt-1 text-ink-900">{siteConfig.contact.email}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
              <div className="flex items-start gap-3">
                <Clock className="mt-1 h-5 w-5 text-brand-deep" aria-hidden />
                <div>
                  <p className="text-[10px] tracking-[0.28em] uppercase text-ink-400">
                    HOURS
                  </p>
                  <p className="mt-1 text-ink-900 leading-relaxed">
                    {siteConfig.contact.hours}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-brand-deep" aria-hidden />
                <div>
                  <p className="text-[10px] tracking-[0.28em] uppercase text-ink-400">
                    AREA
                  </p>
                  <p className="mt-1 text-ink-900 leading-relaxed">
                    {siteConfig.address.note}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-ink-900/10 bg-white p-8">
            <ContactForm />
          </div>
        </div>
      </Section>

      <JsonLd
        id="ld-breadcrumb-contact"
        data={breadcrumbJsonLd([
          { name: "ホーム", href: "/" },
          { name: "お問い合わせ", href: "/contact" },
        ])}
      />
      <JsonLd
        id="ld-webpage-contact"
        data={webPageJsonLd({
          name: "高校物理専門塾「物理の森」へのお問い合わせ",
          description:
            "高校物理専門塾「物理の森」が、体験授業の申し込み・受講相談・料金に関する質問を受け付けるお問い合わせページです。",
          path: "/contact",
        })}
      />
    </>
  );
}
