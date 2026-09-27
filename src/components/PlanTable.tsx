// 3プランのカードと比較表（トップページと料金ページで共通）
import { compareRows, mailto, plans } from "@/content";
import { Reveal } from "./Reveal";

export function PlanCards() {
  return (
    <div className="grid items-stretch gap-6 md:grid-cols-3 md:gap-5">
      {plans.map((p, i) => (
        <Reveal key={p.id} delay={i * 100} className={`h-full ${p.recommended ? "order-first md:order-none md:-my-4" : ""}`}>
          <article
            className={`relative flex h-full flex-col rounded-3xl border-[3px] border-ink p-6 md:p-7 ${
              p.recommended ? "bg-ink text-white shadow-[8px_8px_0_#fff]" : "bg-white"
            }`}
          >
            {p.recommended && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border-[2.5px] border-ink bg-alert px-4 py-1 text-xs font-black whitespace-nowrap text-white">
                いちばん人気・おすすめ
              </span>
            )}
            <div className="flex items-center justify-between">
              <p className="font-display text-2xl">{p.name}</p>
              <span className={`grid size-9 place-items-center rounded-full border-2 text-sm font-black ${p.recommended ? "border-sun text-sun" : "border-ink"}`}>{p.rank}</span>
            </div>
            <p className={`mt-1 text-sm font-bold ${p.recommended ? "text-sun" : "text-indigo"}`}>{p.catch}</p>
            <p className={`mt-4 inline-block self-start rounded-full px-3 py-1 text-xs font-bold ${p.recommended ? "bg-white/15" : "bg-soft"}`}>{p.target}</p>

            <p className="mt-5 flex flex-wrap items-baseline gap-x-1">
              <span className="text-sm font-bold">¥</span>
              <span className="font-display text-[clamp(2rem,3.3vw,2.6rem)] leading-none">{p.price}</span>
              <span className="text-xs font-bold whitespace-nowrap opacity-70">/月(税別)</span>
            </p>
            <p className="mt-2 text-xs font-bold opacity-70">{p.hours}</p>

            <a
              href={mailto(p.name)}
              className={`mt-6 rounded-full py-3.5 text-center font-bold transition hover:-translate-y-0.5 ${
                p.recommended ? "bg-sun text-ink hover:bg-white" : "border-[2.5px] border-ink hover:bg-ink hover:text-white"
              }`}
            >
              {p.name}で相談する
            </a>

            <ul className={`mt-6 grid gap-3 border-t-2 border-dashed pt-6 text-sm ${p.recommended ? "border-white/20" : "border-neutral-200"}`}>
              {p.base && (
                <li className={`flex items-center gap-2 font-black ${p.recommended ? "text-sun" : ""}`}>
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-indigo text-[10px] text-white">＋</span>
                  {p.base}
                </li>
              )}
              {p.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-[10px] ${p.recommended ? "bg-sun text-ink" : "bg-ink text-white"}`}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function CompareTable() {
  return (
    <Reveal className="mt-20">
      <p className="sec-title mb-5 text-center text-xl md:text-2xl">プラン比較表</p>
      <div className="overflow-x-auto rounded-3xl border-[2.5px] border-ink bg-white">
        <table className="w-full min-w-[560px] text-center text-sm">
          <thead>
            <tr className="border-b-2 border-ink">
              <th className="w-[34%] p-4" />
              {plans.map((p) => (
                <th key={p.id} className={`p-4 ${p.recommended ? "bg-ink text-sun" : ""}`}>
                  <span className="block font-display text-base">{p.name}</span>
                  <span className={`text-xs font-bold ${p.recommended ? "text-white/70" : "text-neutral-500"}`}>¥{p.price}/月</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compareRows.map((r) => (
              <tr key={r.label} className="border-t border-neutral-200">
                <th className="p-3 pl-5 text-left font-bold">{r.label}</th>
                {r.values.map((v, j) => (
                  <td key={j} className={`p-3 ${plans[j].recommended ? "bg-sun/40 font-bold" : ""}`}>
                    {v === true ? (
                      <span className="text-lg font-black text-indigo" aria-label="含む">✓</span>
                    ) : v === false ? (
                      <span className="text-neutral-300" aria-label="含まない">—</span>
                    ) : (
                      v
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}
