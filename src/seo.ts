// 構造化データ（JSON-LD）の組み立て。値はすべて content.ts / pricing.json / services.ts から取る。
import { brand, faqs as homeFaqs, plans, serviceHours, siteDescription, siteUrl } from "@/content";
import type { Service } from "@/services";
import { planNames } from "@/services";

const ORG_ID = `${siteUrl}/#org`;
const WEBSITE_ID = `${siteUrl}/#website`;

const openingHours = [
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: serviceHours.weekday.open, closes: serviceHours.weekday.close },
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday"], opens: serviceHours.holiday.open, closes: serviceHours.holiday.close },
];

const prices = plans.map((p) => Number(p.price.replace(/,/g, "")));

// 事業者（ITサポートの専門サービス）
export const organizationLd = () => ({
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: brand.name,
  alternateName: brand.roman,
  description: siteDescription,
  url: siteUrl,
  email: brand.email,
  founder: brand.operator,
  address: { "@type": "PostalAddress", addressCountry: "JP", addressRegion: brand.area },
  areaServed: { "@type": "Country", name: "日本" },
  priceRange: `¥${Math.min(...prices).toLocaleString("en-US")}〜¥${Math.max(...prices).toLocaleString("en-US")}（月額・税別）`,
  openingHoursSpecification: openingHours,
});

export const websiteLd = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: brand.name,
  url: siteUrl,
  inLanguage: "ja",
  publisher: { "@id": ORG_ID },
});

// 月額プランの一覧（トップ・料金ページ）
export const plansOfferLd = () =>
  plans.map((p) => ({
    "@type": "Offer",
    name: `${p.name}プラン`,
    description: `${p.target}向け。${p.hours}。`,
    price: p.price.replace(/,/g, ""),
    priceCurrency: "JPY",
    priceSpecification: { "@type": "UnitPriceSpecification", price: p.price.replace(/,/g, ""), priceCurrency: "JPY", unitText: "月", valueAddedTaxIncluded: false },
    url: `${siteUrl}/pricing`,
    seller: { "@id": ORG_ID },
  }));

export const faqLd = (items: { q: string; a: string }[] = homeFaqs) => ({
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const serviceLd = (s: Service) => ({
  "@type": "Service",
  "@id": `${siteUrl}/services/${s.slug}#service`,
  name: s.name,
  description: s.description,
  serviceType: s.name,
  provider: { "@id": ORG_ID },
  areaServed: { "@type": "Country", name: "日本" },
  offers: plans
    .filter((p) => planNames(s.plans).includes(p.name))
    .map((p) => ({ "@type": "Offer", name: `${p.name}プラン`, price: p.price.replace(/,/g, ""), priceCurrency: "JPY", url: `${siteUrl}/pricing` })),
});

export type Crumb = { name: string; path: string };

export const breadcrumbLd = (crumbs: Crumb[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "ホーム", path: "/" }, ...crumbs].map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: `${siteUrl}${c.path === "/" ? "/" : c.path}`,
  })),
});

export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });
