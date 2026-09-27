import type { MetadataRoute } from "next";
import { siteUrl } from "@/content";
import { services } from "@/services";

// 公開する全ページ。ページを増やしたらここにも足す（npm run seo:check が漏れを検出する）
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/services`, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({ url: `${siteUrl}/services/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${siteUrl}/pricing`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/faq`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/company`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
