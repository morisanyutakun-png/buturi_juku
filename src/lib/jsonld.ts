import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

type Crumb = { name: string; href: string };
type ListItem = { name: string; href: string; description?: string };

const organizationId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": organizationId,
    name: siteConfig.name,
    alternateName: [siteConfig.nameSub, siteConfig.nameEn],
    url: siteConfig.url,
    description: siteConfig.description,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.ogImage, siteConfig.url),
      width: 1200,
      height: 630,
    },
    image: absoluteUrl(siteConfig.ogImage, siteConfig.url),
    email: `mailto:${siteConfig.contact.email}`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.contact.email,
      availableLanguage: ["ja"],
      areaServed: "JP",
    },
    founder: {
      "@type": "Person",
      name: siteConfig.author.name,
      jobTitle: siteConfig.author.role,
      url: absoluteUrl("/teacher", siteConfig.url),
    },
    knowsAbout: siteConfig.seo.knowsAbout,
    audience: siteConfig.seo.audiences.map((audience) => ({
      "@type": "Audience",
      audienceType: audience,
    })),
    areaServed: siteConfig.seo.serviceAreas,
    sameAs: [] as string[],
    inLanguage: "ja",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    alternateName: siteConfig.nameSub,
    url: siteConfig.url,
    publisher: {
      "@id": organizationId,
    },
    inLanguage: "ja",
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
      "@id": organizationId,
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

export function webPageJsonLd(params: {
  name: string;
  description: string;
  path: string;
  dateModified?: string;
}) {
  const url = absoluteUrl(params.path, siteConfig.url);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: params.name,
    description: params.description,
    isPartOf: {
      "@id": websiteId,
    },
    about: {
      "@id": organizationId,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.ogImage, siteConfig.url),
      width: 1200,
      height: 630,
    },
    dateModified: params.dateModified ?? siteConfig.seo.lastModified,
    inLanguage: "ja",
  };
}

export function itemListJsonLd(params: {
  name: string;
  description: string;
  path: string;
  items: readonly ListItem[];
}) {
  const url = absoluteUrl(params.path, siteConfig.url);
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}#itemlist`,
    name: params.name,
    description: params.description,
    url,
    itemListElement: params.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(item.href, siteConfig.url),
      name: item.name,
      description: item.description,
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
  keywords?: readonly string[];
}) {
  const url = absoluteUrl(`/articles/${params.slug}`, siteConfig.url);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: params.title,
    description: params.description,
    mainEntityOfPage: url,
    url,
    datePublished: params.publishedAt,
    dateModified: params.updatedAt ?? params.publishedAt,
    image: absoluteUrl(params.image ?? siteConfig.ogImage, siteConfig.url),
    keywords: params.keywords,
    inLanguage: "ja",
    isPartOf: {
      "@id": websiteId,
    },
    author: {
      "@type": "Person",
      name: params.author ?? siteConfig.author.name,
      url: absoluteUrl("/teacher", siteConfig.url),
    },
    publisher: {
      "@id": organizationId,
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
  category?: string;
  format?: string;
  targets?: readonly string[];
}) {
  const url = absoluteUrl(`/courses/${params.slug}`, siteConfig.url);
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${url}#course`,
    name: params.name,
    description: params.description,
    url,
    courseMode: params.format,
    educationalLevel: "高校物理 / 大学受験",
    about: params.category,
    audience: (params.targets ?? siteConfig.seo.audiences).map((target) => ({
      "@type": "Audience",
      audienceType: target,
    })),
    provider: {
      "@id": organizationId,
    },
    inLanguage: "ja",
  };
}

export function serviceJsonLd(params: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  price?: string;
}) {
  const url = absoluteUrl(params.path, siteConfig.url);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: params.name,
    description: params.description,
    serviceType: params.serviceType,
    url,
    provider: {
      "@id": organizationId,
    },
    areaServed: siteConfig.seo.serviceAreas,
    audience: siteConfig.seo.audiences.map((audience) => ({
      "@type": "Audience",
      audienceType: audience,
    })),
    offers: {
      "@type": "Offer",
      url,
      price: params.price,
      priceCurrency: "JPY",
      availability: "https://schema.org/InStock",
    },
    inLanguage: "ja",
  };
}
