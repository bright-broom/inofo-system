import type { Metadata } from "next";
import { legal, mailto } from "@/content";
import { SubPage } from "@/components/SubPage";

export const metadata: Metadata = {
  title: "運営会社",
  alternates: { canonical: "/company" },
};

export default function CompanyPage() {
  return (
    <SubPage en="Company" title="運営会社">
      <dl className="overflow-hidden rounded-3xl border-[2.5px] border-ink">
        {legal.company.map((row, i) => (
          <div key={row.label} className={`grid gap-1 p-5 md:grid-cols-[10rem_1fr] md:gap-6 ${i ? "border-t border-neutral-200" : ""}`}>
            <dt className="text-sm font-black">{row.label}</dt>
            <dd className="text-[15px] break-words">{row.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-12 text-center">
        <a href={mailto()} className="inline-block rounded-full bg-ink px-8 py-4 font-bold text-white transition hover:bg-indigo">
          メールで無料相談 →
        </a>
      </div>
    </SubPage>
  );
}
