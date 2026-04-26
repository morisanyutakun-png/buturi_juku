import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

type BuildMetadataInput = {
  title: string;
  description?: string;
  path: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: readonly string[];
  category?: string;
};

function uniqueKeywords(keywords: readonly string[]): string[] {
  return Array.from(new Set(keywords.map((keyword) => keyword.trim()).filter(Boolean)));
}

export function buildMetadata({
  title,
  description,
  path,
  noIndex,
  type = "website",
  publishedTime,
  modifiedTime,
  keywords = [],
  category,
}: BuildMetadataInput): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const desc = description ?? siteConfig.description;
  const canonical = absoluteUrl(path, siteConfig.url);
  const mergedKeywords = uniqueKeywords([
    ...siteConfig.seo.defaultKeywords,
    ...siteConfig.seo.highIntentKeywords,
    ...keywords,
  ]);

  // Note: og:image / twitter:image are auto-filled by Next.js from
  // src/app/opengraph-image.tsx (file-based convention). We deliberately
  // omit `images` here so the dynamic image is used on every page.
  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          type: "article",
          title: fullTitle,
          description: desc,
          url: canonical,
          siteName: siteConfig.name,
          locale: siteConfig.locale,
          publishedTime,
          modifiedTime: modifiedTime ?? publishedTime,
        }
      : {
          type: "website",
          title: fullTitle,
          description: desc,
          url: canonical,
          siteName: siteConfig.name,
          locale: siteConfig.locale,
        };

  return {
    title: { absolute: fullTitle },
    description: desc,
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.author.name, url: absoluteUrl("/teacher", siteConfig.url) }],
    creator: siteConfig.author.name,
    publisher: siteConfig.name,
    keywords: mergedKeywords,
    category,
    alternates: {
      canonical,
      languages: {
        "ja-JP": canonical,
      },
    },
    referrer: "origin-when-cross-origin",
    robots: noIndex
      ? { index: false, follow: false }
      : {
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
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      site: siteConfig.twitter,
      creator: siteConfig.twitter,
    },
  };
}
