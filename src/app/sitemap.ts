import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { visibleCourses } from "@/data/courses";
import { articles } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  // lastModified は「ビルド時の現在日時」または siteConfig の手動設定値の
  // **新しい方** を採用。これにより:
  //   - 毎回のデプロイで sitemap の lastmod が自動更新される
  //   - 内容を手で固定したい場合は site.ts 側で未来日を入れれば優先される
  const manualDate = new Date(siteConfig.seo.lastModified);
  const buildDate = new Date();
  const lastModified =
    manualDate.getTime() > buildDate.getTime() ? manualDate : buildDate;
  const base = siteConfig.url.replace(/\/$/, "");

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/online`, lastModified, changeFrequency: "monthly", priority: 0.85 },
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

  const courseUrls: MetadataRoute.Sitemap = visibleCourses().map((c) => ({
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
