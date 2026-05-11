import type { Metadata } from "next";
import { Mail, Clock, MapPin, ArrowDown } from "lucide-react";
import { Section } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "お問い合わせ ｜ Solvora Learning Lab",
  description:
    "Solvora Learning Lab（高校物理・理系個別指導 / AI復習プリント付き）へのお問い合わせはこちらから。体験授業のお申し込み、受講相談、料金に関するご質問などをお受けしています（高校物理専門塾としての指導継続）。",
  path: "/contact",
  keywords: [
    "Solvora Learning Lab お問い合わせ",
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
            <span className="block">体験授業を、</span>
            <span className="block">
              <span className="text-brand">いますぐ申し込む</span>。
            </span>
          </>
        }
        description="このフォームは「体験授業（60分・¥3,000）」のお申し込み専用です。料金や講座内容のみのご質問は、右の『直接メール』からお気軽にどうぞ。"
      >
        {/* モバイル：ファーストビューから 1 タップでフォームへ飛べるアンカー */}
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
          <a
            href="#contact-form"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-warm px-6 py-3.5 text-[14.5px] sm:text-[14px] font-medium text-white shadow-warm transition hover:bg-warm-deep min-h-[52px] sm:min-h-0"
          >
            体験授業の申し込みフォームへ
            <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}?subject=Solvora%20Learning%20Lab%20への問い合わせ`}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-ink-900/15 bg-white/80 px-6 py-3.5 text-[14.5px] sm:text-[14px] text-ink-800 backdrop-blur transition hover:border-ink-900/30 hover:bg-white min-h-[52px] sm:min-h-0"
          >
            <Mail className="h-4 w-4" aria-hidden />
            メールで直接送る
          </a>
        </div>
      </PageHero>

      <Section
        eyebrow="TRIAL APPLICATION"
        title="体験授業 申し込みフォーム"
        description="入力後、決済画面（Stripe）に進みます。決済完了をもって申し込み確定となります。"
      >
        <div id="contact-form" className="scroll-mt-24 sm:scroll-mt-28 grid gap-8 lg:gap-10 lg:grid-cols-[1.5fr_1fr]">
          {/* モバイルはフォーム先頭。デスクトップは左 = フォーム / 右 = 補足の 2 カラム */}
          <div className="rounded-2xl border border-ink-900/10 bg-white p-5 sm:p-8 order-1">
            <ContactForm />
          </div>

          {/* 補足情報 — モバイルではフォームの下に置き、メイン導線（フォーム）を優先 */}
          <aside className="order-2 space-y-3 sm:space-y-4">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="block rounded-2xl border border-ink-900/10 bg-white p-5 sm:p-6 transition hover:border-brand/30"
            >
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 text-brand-deep" aria-hidden />
                <div>
                  <p className="text-[10px] tracking-[0.24em] uppercase text-ink-400">
                    MAIL — 直接メール
                  </p>
                  <p className="mt-1 text-[14px] sm:text-[14.5px] text-ink-900 break-all">
                    {siteConfig.contact.email}
                  </p>
                  <p className="mt-2 text-[12px] leading-[1.7] text-ink-500">
                    フォームを使わず直接メールいただいても問題ありません。タップでメールアプリが開きます。
                  </p>
                </div>
              </div>
            </a>
            <div className="rounded-2xl border border-ink-900/10 bg-white p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Clock className="mt-1 h-5 w-5 text-brand-deep" aria-hidden />
                <div>
                  <p className="text-[10px] tracking-[0.24em] uppercase text-ink-400">
                    AVAILABILITY — 受講可能時間帯（現状）
                  </p>
                  <p className="mt-1 text-[14px] text-ink-900 leading-[1.7]">
                    {siteConfig.contact.hours}
                  </p>
                  <p className="mt-2 text-[12px] leading-[1.7] text-ink-500">
                    お申し込み後のご返信は、2営業日以内を目安に、講師（森祐太）よりできる限り柔軟に対応いたします。
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-ink-900/10 bg-white p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-brand-deep" aria-hidden />
                <div>
                  <p className="text-[10px] tracking-[0.24em] uppercase text-ink-400">
                    AREA — 受講エリア
                  </p>
                  <p className="mt-1 text-[14px] text-ink-900 leading-[1.7]">
                    {siteConfig.address.note}
                  </p>
                </div>
              </div>
            </div>
          </aside>
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
          name: "お問い合わせ ｜ Solvora Learning Lab",
          description:
            "Solvora Learning Lab が、体験授業の申し込み・受講相談・料金に関する質問を受け付けるお問い合わせページです（高校物理専門塾としての指導継続）。",
          path: "/contact",
        })}
      />
    </>
  );
}
