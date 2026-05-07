import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { JsonLd } from "@/components/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/data/site";

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
        <link rel="preconnect" href="https://yuta-eng.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://amzn.asia" />
        {/* Prefetch high-probability nav targets so subsequent clicks feel instant */}
        <link rel="prefetch" href="/trial" as="document" />
        <link rel="prefetch" href="/courses" as="document" />
        <link rel="prefetch" href="/online" as="document" />
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
      </body>
    </html>
  );
}
