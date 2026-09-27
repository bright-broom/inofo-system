import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mailto } from "@/content";
import { planNames, serviceBySlug, services } from "@/services";
import { breadcrumbLd, faqLd, graph, organizationLd, serviceLd } from "@/seo";
import { SubPage } from "@/components/SubPage";
import { JsonLd } from "@/components/JsonLd";

// 6つのサービスページをビルド時にすべて静的に作る。一覧にない URL は 404
export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.title, description: s.description, url: `/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  const crumbs = [{ name: "サービス", path: "/services" }, { name: s.name, path: `/services/${s.slug}` }];
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <SubPage en="Service" title={s.name} breadcrumbs={crumbs} lead={s.lead}>
      <JsonLd data={graph(organizationLd(), serviceLd(s), breadcrumbLd(crumbs), faqLd(s.faqs))} />

      <section>
        <h2 className="text-xl font-black">対応すること</h2>
        <ul className="mt-4 grid gap-2 text-[15px]">
          {s.tasks.map((t) => (
            <li key={t} className="flex gap-2"><span className="text-indigo">✓</span>{t}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-3xl border-[2.5px] border-ink bg-sun p-6">
        <h2 className="text-lg font-black">含まれるプラン</h2>
        <p className="mt-2 text-[15px] font-bold">{planNames(s.plans).join("・")}</p>
        {s.planNote && <p className="mt-2 text-sm leading-relaxed">{s.planNote}</p>}
        <Link href="/pricing" className="mt-4 inline-block text-sm font-bold underline">料金とプランの違いを見る →</Link>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-black">ラクシスの進め方</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {s.points.map((p) => (
            <div key={p.title} className="rounded-3xl border-2 border-neutral-200 bg-white p-5">
              <h3 className="font-black">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-black">よくあるご質問</h2>
        <dl className="mt-4 grid gap-4">
          {s.faqs.map((f) => (
            <div key={f.q} className="rounded-3xl border-[2.5px] border-ink bg-white p-5">
              <dt className="font-black"><span className="mr-2 font-display text-indigo">Q.</span>{f.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed"><span className="mr-2 font-display text-alert">A.</span>{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14 rounded-[2rem] border-[3px] border-ink bg-white p-6 text-center shadow-[8px_8px_0_#111]">
        <p className="sec-title text-xl md:text-2xl">{s.name}のご相談は、メールで無料です</p>
        <a href={mailto()} className="mt-5 inline-block rounded-full bg-ink px-8 py-4 font-bold text-white transition hover:bg-indigo">メールで無料相談 →</a>
      </section>

      <nav aria-label="ほかのサービス" className="mt-14">
        <h2 className="text-lg font-black">ほかのサービス</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/services/${o.slug}`} className="block rounded-full border-2 border-ink px-4 py-2 text-sm font-bold transition hover:bg-ink hover:text-white">{o.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </SubPage>
  );
}
