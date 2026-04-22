import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

type BuildMetadataInput = {
  title: string;
  description?: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex,
  type = "website",
  publishedTime,
  modifiedTime,
}: BuildMetadataInput): Metadata {
  const fullTitle =
    path === "/" ? `${siteConfig.name} | ${siteConfig.tagline}` : `${title} | ${siteConfig.name}`;
  const desc = description ?? siteConfig.description;
  const canonical = absoluteUrl(path, siteConfig.url);
  const image = absoluteUrl(ogImage ?? siteConfig.ogImage, siteConfig.url);

  const images = [{ url: image, width: 1200, height: 630, alt: siteConfig.name }];

  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          type: "article",
          title: fullTitle,
          description: desc,
          url: canonical,
          siteName: siteConfig.name,
          locale: siteConfig.locale,
          images,
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
          images,
        };

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [image],
      creator: siteConfig.twitter,
    },
  };
}
