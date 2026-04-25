import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { courses } from "@/data/courses";
import { articles } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.seo.lastModified);
  const base = siteConfig.url.replace(/\/$/, "");

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/teacher`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/courses`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/articles`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/faq`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/trial`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/tokushoho`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];

  const courseUrls: MetadataRoute.Sitemap = courses.map((c) => ({
    url: `${base}/courses/${c.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articleUrls: MetadataRoute.Sitemap = articles
    .filter((a) => !a.externalUrl)
    .map((a) => ({
      url: `${base}/articles/${a.slug}`,
      lastModified: a.updatedAt ? new Date(a.updatedAt) : new Date(a.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticPages, ...courseUrls, ...articleUrls];
}
