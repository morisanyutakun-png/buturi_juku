import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

type Crumb = { name: string; href: string };

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: absoluteUrl(siteConfig.ogImage, siteConfig.url),
    sameAs: [] as string[],
    areaServed: "JP",
    inLanguage: "ja",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "ja",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/articles?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function personJsonLd(params: {
  name: string;
  role: string;
  url: string;
  sameAs?: string[];
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: params.name,
    jobTitle: params.role,
    url: params.url,
    description: params.description,
    sameAs: params.sameAs ?? [],
    worksFor: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href, siteConfig.url),
    })),
  };
}

export function articleJsonLd(params: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  image?: string;
}) {
  const url = absoluteUrl(`/articles/${params.slug}`, siteConfig.url);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    description: params.description,
    mainEntityOfPage: url,
    url,
    datePublished: params.publishedAt,
    dateModified: params.updatedAt ?? params.publishedAt,
    image: absoluteUrl(params.image ?? siteConfig.ogImage, siteConfig.url),
    inLanguage: "ja",
    author: {
      "@type": "Person",
      name: params.author ?? siteConfig.author.name,
    },
    publisher: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.ogImage, siteConfig.url),
      },
    },
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

export function courseJsonLd(params: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: params.name,
    description: params.description,
    url: absoluteUrl(`/courses/${params.slug}`, siteConfig.url),
    provider: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
    },
    inLanguage: "ja",
  };
}
