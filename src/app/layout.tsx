import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { JsonLd } from "@/components/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/data/site";
import { GA_ID, GADS_ID } from "@/lib/analytics";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} ｜ AI復習プリント付き 高校物理・理系個別指導`,
    template: `%s ｜ ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  publisher: siteConfig.name,
  keywords: [
    ...siteConfig.seo.defaultKeywords,
    ...siteConfig.seo.highIntentKeywords,
  ],
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} ｜ AI復習プリント付き 高校物理・理系個別指導`,
    description: siteConfig.description,
    // og:image is auto-injected by Next.js from src/app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitter,
    creator: siteConfig.twitter,
    title: `${siteConfig.name} ｜ AI復習プリント付き 高校物理・理系個別指導`,
    description: siteConfig.description,
    // twitter:image is auto-injected from the same opengraph-image convention
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfbf5" },
    { media: "(prefers-color-scheme: dark)", color: "#142341" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  // `cover` lets the design extend under the iOS home indicator;
  // `env(safe-area-inset-*)` already pads our sticky CTA correctly.
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="dns-prefetch" href="https://yuta-eng.com" />
        <link rel="dns-prefetch" href="https://amzn.asia" />
        {/* GA / Google Ads タグ用：早めに接続を温める */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        {/*
          注：以前は /trial /courses /online の3ドキュメントを `<link rel="prefetch">`
          していたが、Lighthouse のネットワーク利用率を圧迫していたため停止。
          Next.js の `<Link>` がビューポート内で自動的に必要なルートをプリフェッチ
          するので、ナビ体感はほぼ変わらない。
        */}
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          メインコンテンツへスキップ
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileCtaBar />
        <JsonLd id="ld-organization" data={organizationJsonLd()} />
        <JsonLd id="ld-website" data={websiteJsonLd()} />

        {/* Google tag (gtag.js) — GA4 + Google Ads conversions
            一つの gtag.js で両方の宛先に送信できる。
            ・gtag-init は `afterInteractive` で実行：dataLayer と window.gtag を
              定義し、初期 config を発行する。analytics.ts 側に ensureGtag() の
              フォールバックがあるため、useEffect でこれより前に trackEvent が
              呼ばれても dataLayer にキューされる（gtag.js 本体ロード後に処理）。
            ・gtag.js 本体は `lazyOnload`：window.onload 後にロードして TBT/LCP
              への影響をゼロに近づける。Lighthouse の Total Blocking Time を
              100ms 級で改善できる。 */}
        {(GA_ID || GADS_ID) && (
          <>
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                ${GA_ID ? `gtag('config', '${GA_ID}', { send_page_view: true });` : ""}
                ${GADS_ID ? `gtag('config', '${GADS_ID}');` : ""}
              `}
            </Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID || GADS_ID}`}
              strategy="lazyOnload"
            />
          </>
        )}
      </body>
    </html>
  );
}
