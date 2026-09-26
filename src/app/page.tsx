import {
  brand, siteUrl, siteDescription, hours, problems, plans, compareRows, planNotes, capacity, skills, steps, reasons, tips, message, excluded, faqs, sns, mailto,
} from "@/content";
import { Header } from "@/components/Header";
import { FixedCta } from "@/components/FixedCta";
import { CtaBlock } from "@/components/CtaBlock";
import { CopyEmail } from "@/components/CopyEmail";
import { Mascot } from "@/components/Mascot";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";

const br = (s: string) => s.split("\n").flatMap((l, i) => (i ? [<br key={i} />, l] : [l]));

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="overflow-x-clip">
        <JsonLd />
        <Hero />
        <Problems />
        <Plans />
        <Reasons />
        <Team />
        <Flow />
        <CtaBlock />
        <Tips />
        <Message />
        <Faq />
        <Terms />
        <Sns />
        <Contact />
      </main>
      <Footer />
      <FixedCta />
    </>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="relative bg-sun pt-16">
      <div className="dots absolute top-24 left-[42%] hidden size-40 rounded-full opacity-20 md:block" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 pb-20 md:grid-cols-[1.05fr_1fr] md:px-8 md:pt-16 md:pb-28">
        <div className="relative z-10">
          <div className="mb-6 flex items-end gap-2">
            <Mascot className="bob w-16 md:w-20" />
            <span className="mb-4 rounded-full border-2 border-ink bg-white px-3 py-1 text-xs font-bold">IT担当が「ひとり」の会社へ</span>
          </div>
          <h1 className="sec-title text-[clamp(1.55rem,7vw,2.2rem)] leading-[1.5] md:text-[clamp(2rem,4.2vw,3.4rem)] md:leading-[1.4] [&>span]:whitespace-nowrap">
            <span className="bg-white px-2 box-decoration-clone">「{brand.name}」は、</span>
            <br />
            <span className="bg-white px-2 box-decoration-clone">小さな会社の情シスを</span>
            <br />
            <span className="bg-white px-2 box-decoration-clone">まるっと支える</span>
            <br />
            <span className="bg-white px-2 box-decoration-clone">相棒です！</span>
          </h1>
          <p className="mt-8 max-w-md text-sm leading-loose font-bold md:text-base">
            プランは3つだけ。月額 3万円から。
            <br />
            現役ITエンジニアが、担当を変えずに直接サポートします。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#plans" className="rounded-full bg-ink px-8 py-4 font-bold text-white shadow-[4px_4px_0_#fff] transition hover:-translate-y-0.5 hover:bg-indigo">3つのプランを見る →</a>
            <a href={mailto()} className="rounded-full border-[2.5px] border-ink bg-white px-8 py-4 font-bold transition hover:-translate-y-0.5">メールで無料相談</a>
          </div>
        </div>
        <HeroVisual />
      </div>
      <svg className="absolute inset-x-0 -bottom-px h-10 w-full text-white md:h-16" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
        <path d="M0 80 L0 40 Q360 0 720 40 T1440 40 L1440 80Z" fill="currentColor" />
      </svg>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="absolute -inset-4 rotate-3 rounded-[2.5rem] bg-ink" />
      <div className="relative rounded-[2.5rem] border-[3px] border-ink bg-white p-5 md:p-7">
        <div className="mb-4 flex gap-1.5">
          <span className="size-3 rounded-full bg-alert" />
          <span className="size-3 rounded-full bg-sun-deep" />
          <span className="size-3 rounded-full bg-emerald-400" />
        </div>
        <p className="mb-3 text-xs font-bold text-neutral-500">今月のIT運用レポート</p>
        <div className="grid grid-cols-3 gap-3">
          {[["問い合わせ", "42件"], ["平均解決", "1.8h"], ["脆弱性", "0件"]].map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-soft p-3">
              <p className="text-[10px] font-bold text-neutral-500">{k}</p>
              <p className="font-display text-xl md:text-2xl">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex h-28 items-end gap-2 rounded-2xl bg-soft p-3">
          {[40, 65, 52, 80, 58, 90, 72, 45, 68, 84].map((h, i) => (
            <span key={i} className={`flex-1 rounded-t-md ${i % 3 === 2 ? "bg-indigo" : "bg-sun-deep"}`} style={{ height: `${h}%` }} />
          ))}
        </div>
        <ul className="mt-4 grid gap-2 text-xs font-bold">
          {["新入社員3名のPCセットアップ完了", "多要素認証を全社展開", "共有フォルダの権限を整理"].map((t) => (
            <li key={t} className="flex items-center gap-2 rounded-xl border-2 border-ink/10 px-3 py-2">
              <span className="grid size-5 place-items-center rounded-full bg-ink text-[10px] text-white">✓</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
      <Mascot className="absolute -right-4 -bottom-10 w-24 md:-right-10 md:w-32" wave />
    </div>
  );
}

/* ---------------- Problems ---------------- */
function Problems() {
  return (
    <section id="problem" className="dots-grid py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle en="Problem">
          こんな<span className="marker">“ひとり情シス”のお悩み</span>、
          <br className="md:hidden" />
          ありませんか？
        </SectionTitle>
        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={i} delay={i * 100} className="h-full">
              <div className="relative h-full rounded-3xl border-[2.5px] border-ink bg-white p-6 pt-10 transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#111]">
                <span className="absolute -top-5 left-6 grid size-11 place-items-center rounded-full border-[2.5px] border-ink bg-sun font-display text-lg">{i + 1}</span>
                <h3 className="text-xl leading-snug font-black">{br(p.title)}</h3>
                <ul className="mt-5 grid gap-2 text-sm">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded bg-ink text-[10px] text-white">✕</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16 flex flex-col items-center gap-2 text-center">
          <span className="text-3xl">▼</span>
          <p className="sec-title text-2xl md:text-3xl">
            会社の規模に合わせて、<span className="marker">3つのプラン</span>から選ぶだけ。
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Plans ---------------- */
function Plans() {
  return (
    <section id="plans" className="relative bg-sun py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle en="Plans" light>
          シンプルな<span className="rounded-xl bg-ink px-3 text-sun">3つのプラン</span>
        </SectionTitle>
        <p className="-mt-6 text-center text-sm font-bold">迷ったら、いちばん選ばれている「スタンダード」がおすすめです。</p>
        <p className="mx-auto mt-4 mb-14 w-fit rounded-full border-2 border-ink bg-white px-4 py-1.5 text-center text-xs font-black">
          品質を保つため、ご契約は同時に{capacity}社までとしています
        </p>

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

        <Compare />

        <ul className="mt-6 grid gap-1 text-xs">
          {planNotes.map((n) => <li key={n}>※{n}</li>)}
        </ul>
      </div>
    </section>
  );
}

function Compare() {
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

/* ---------------- Reasons ---------------- */
function Reasons() {
  return (
    <section id="reason" className="relative bg-ink py-20 text-white md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <p className="mb-2 font-display text-xs tracking-[.35em] text-sun uppercase">Reason</p>
          <h2 className="sec-title text-[1.7rem] md:text-4xl">
            <span className="text-sun">{brand.name}</span>が選ばれる3つの理由
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.big} delay={i * 100} className="h-full">
              <div className="h-full rounded-3xl border-2 border-white/15 bg-white/5 p-6 md:p-8">
                <p className="font-display text-5xl text-sun/30">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-2xl leading-snug font-black text-sun">{br(r.big)}</p>
                <p className="mt-3 text-sm leading-relaxed opacity-90">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Team ---------------- */
function Team() {
  return (
    <section className="bg-soft py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle en="Team">
          相談する人と、
          <br className="md:hidden" />
          <span className="marker">対応する人が同じ</span>
        </SectionTitle>
        <Reveal className="mx-auto grid max-w-4xl items-center gap-6 md:grid-cols-[auto_auto_1fr]">
          <div className="flex flex-col items-center gap-2">
            <span className="grid size-24 place-items-center rounded-full border-[2.5px] border-ink bg-white text-3xl">🏢</span>
            <span className="font-bold">お客様</span>
          </div>
          <span className="text-center text-2xl font-black md:text-3xl">⇄</span>
          <div className="rounded-3xl border-[2.5px] border-ink bg-white p-5">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-ink px-4 py-1.5 text-sm font-bold text-white">担当エンジニア</span>
              <span className="text-sm font-bold">が、ご相談から作業まで一貫して対応</span>
            </div>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
              {skills.map((e) => (
                <span key={e} className="grid min-h-16 place-items-center rounded-2xl bg-sun px-1 text-center text-xs leading-tight font-bold">{e}</span>
              ))}
            </div>
            <p className="mt-3 text-right text-xs font-bold text-neutral-500">対応できる領域</p>
          </div>
        </Reveal>
        <p className="sec-title mt-12 text-center text-xl md:text-2xl">
          毎回イチから説明する必要は、<span className="marker">もうありません。</span>
        </p>
      </div>
    </section>
  );
}

/* ---------------- Flow ---------------- */
function Flow() {
  return (
    <section id="flow" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <SectionTitle en="Flow">ご利用開始までの3ステップ</SectionTitle>
        <p className="-mt-6 mb-12 text-center">
          <span className="rounded-full bg-alert px-4 py-1.5 text-sm font-black text-white">ご提案まで無料！</span>
        </p>
        <ol className="grid gap-6 md:grid-cols-3 md:gap-10">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 100} className="h-full">
              <li className="relative flex h-full flex-col rounded-3xl border-[2.5px] border-ink bg-white p-6">
                {s.free && <span className="absolute -top-3 right-4 rounded-full bg-alert px-3 py-0.5 text-xs font-black text-white">無料</span>}
                <p className="font-display text-sm text-indigo">STEP {i + 1}</p>
                <p className="mt-1 text-xl font-black">{s.title}</p>
                <p className="mt-1 text-xs font-bold text-neutral-500">「{s.sub}」</p>
                <ul className="mt-4 grid gap-1 text-sm">
                  {s.items.map((it) => <li key={it}>・{it}</li>)}
                </ul>
                {i < steps.length - 1 && (
                  <span className="absolute top-1/2 -right-8 z-10 hidden size-8 -translate-y-1/2 place-items-center rounded-full bg-sun font-black md:grid">›</span>
                )}
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Tips ---------------- */
function Tips() {
  return (
    <section className="dots-grid py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <SectionTitle en="Tips">
          情シス外注で
          <br className="md:hidden" />
          <span className="marker">失敗しない</span>選び方
        </SectionTitle>
        <div className="mb-4 hidden grid-cols-2 gap-6 text-center font-black md:grid">
          <p className="rounded-full bg-neutral-300 py-2">失敗しがち</p>
          <p className="rounded-full bg-sun py-2">失敗しない</p>
        </div>
        <div className="grid gap-6">
          {tips.map((t, i) => (
            <Reveal key={i} className="grid gap-4 md:grid-cols-2 md:gap-6">
              <div className="rounded-3xl border-2 border-neutral-300 bg-white p-6">
                <p className="flex items-center gap-2 text-lg font-black text-neutral-500">
                  <span className="grid size-7 place-items-center rounded-full bg-neutral-400 text-sm text-white">✕</span>
                  {t.bad.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{t.bad.body}</p>
              </div>
              <div className="rounded-3xl border-[2.5px] border-ink bg-white p-6 shadow-[5px_5px_0_var(--color-sun-deep)]">
                <p className="flex items-center gap-2 text-lg font-black">
                  <span className="grid size-7 place-items-center rounded-full bg-indigo text-sm text-white">◯</span>
                  {t.good.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed">{t.good.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Message ---------------- */
function Message() {
  return (
    <section className="bg-sun py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[320px_1fr] md:gap-16">
        <Reveal className="md:sticky md:top-28 md:self-start">
          <p className="mb-2 font-display text-xs tracking-[.35em] uppercase">Message</p>
          <h2 className="sec-title text-3xl">ごあいさつ</h2>
          <div className="mt-8 grid aspect-square w-56 place-items-center rounded-full border-[3px] border-ink bg-white md:w-full">
            <Mascot className="w-1/2" />
          </div>
          <p className="mt-6 text-sm font-bold">{brand.name}</p>
          <p className="text-sm">{message.role}</p>
          <p className="mt-1 text-2xl font-black">{message.name}</p>
          <p className="font-display text-xs tracking-widest text-neutral-600">{message.roman}</p>
        </Reveal>
        <Reveal className="rounded-[2rem] border-[3px] border-ink bg-white p-6 md:p-12">
          <p className="sec-title text-2xl md:text-3xl">{message.heading}</p>
          <div className="mt-8 grid gap-5 text-[15px] leading-loose">
            {message.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function Faq() {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4">
        <SectionTitle en="FAQ">よくあるご質問</SectionTitle>
        <div className="grid gap-4">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-3xl border-[2.5px] border-ink bg-white open:shadow-[5px_5px_0_#111]">
              <summary className="flex cursor-pointer items-start gap-3 p-5 md:p-6">
                <span className="font-display text-xl text-indigo">Q.</span>
                <span className="flex-1 pt-0.5 font-black">{f.q}</span>
                <span className="faq-icon grid size-7 shrink-0 place-items-center rounded-full bg-sun text-lg font-black transition">+</span>
              </summary>
              <div className="flex gap-3 border-t-2 border-dashed border-neutral-200 p-5 md:p-6">
                <span className="font-display text-xl text-alert">A.</span>
                <p className="flex-1 pt-0.5 text-sm leading-relaxed">{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Terms ---------------- */
function Terms() {
  return (
    <section className="pb-20 md:pb-28">
      <div className="mx-auto grid max-w-4xl gap-6 px-4 md:grid-cols-[minmax(0,18rem)_1fr]">
        <Reveal className="rounded-3xl border-[2.5px] border-ink p-6 md:p-8">
          <p className="text-sm font-black">対応時間</p>
          <p className="mt-2 grid font-display text-lg leading-relaxed [&>span]:whitespace-nowrap">
            <span>平日 19:00〜22:00</span>
            <span>土日祝 10:00〜18:00</span>
          </p>
          <p className="mt-2 text-sm text-neutral-600">{hours.note}</p>
        </Reveal>
        <Reveal className="rounded-3xl bg-soft p-6 md:p-8">
          <p className="text-sm font-black">月額料金に含まれないもの</p>
          <ul className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
            {excluded.map((e) => <li key={e} className="flex gap-2"><span className="text-indigo">●</span>{e}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- SNS ---------------- */
function Sns() {
  const links = sns.filter((s) => s.href);
  if (!links.length) return null;
  return (
    <section className="pb-16">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="font-black">各種SNSでも情報発信中！</p>
        <div className="mt-4 flex justify-center gap-3">
          {links.map((s) => (
            <a key={s.name} href={s.href} className="rounded-full border-2 border-ink px-5 py-2 text-sm font-bold transition hover:bg-ink hover:text-white">{s.name}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  return (
    <section id="contact" className="relative bg-sun py-20 md:py-28">
      <div className="dots absolute top-0 right-0 hidden h-40 w-72 opacity-20 md:block" style={{ clipPath: "polygon(30% 0,100% 0,100% 100%)" }} />
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <p className="mb-2 font-display text-xs tracking-[.35em] uppercase">Contact</p>
        <h2 className="sec-title text-3xl md:text-4xl">
          ご相談は、メールで
          <br className="md:hidden" />
          お気軽にどうぞ。
        </h2>
        <p className="mt-6 leading-loose">
          下記アドレスまでご連絡ください。
          <br />
          プランが決まっていなくても大丈夫です。
        </p>

        <div className="mx-auto mt-10 max-w-2xl rounded-[2rem] border-[3px] border-ink bg-white p-6 shadow-[8px_8px_0_#111] md:p-10">
          <Mascot className="mx-auto -mt-16 mb-2 w-20 md:-mt-20 md:w-24" wave />
          <p className="text-xs font-bold text-neutral-500">お問い合わせ先</p>
          <a href={mailto()} className="mt-2 block font-display text-[clamp(1.4rem,6vw,2.6rem)] break-all hover:text-indigo">
            {brand.email}
          </a>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a href={mailto()} className="rounded-full bg-ink px-8 py-3.5 font-bold text-white transition hover:bg-indigo">メールを作成する →</a>
            <CopyEmail />
          </div>

          <div className="mt-8 rounded-2xl bg-soft p-5 text-left text-sm">
            <p className="mb-2 font-black">メールに書いていただくとスムーズです</p>
            <ul className="grid gap-1 sm:grid-cols-2">
              {["会社名・お名前", "従業員数", "ご希望のプラン（未定でOK）", "いま困っていること"].map((t) => (
                <li key={t} className="flex gap-2"><span className="text-indigo">✓</span>{t}</li>
              ))}
            </ul>
          </div>
          <p className="mt-5 text-xs text-neutral-600">メールは24時間受付／対応時間：{hours.label}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 構造化データ ---------------- */
function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#org`,
        name: brand.company,
        url: siteUrl,
        email: brand.email,
        address: { "@type": "PostalAddress", addressCountry: "JP", addressRegion: brand.area },
      },
      {
        "@type": "Service",
        name: `${brand.name}（情シスアウトソーシング）`,
        description: siteDescription,
        provider: { "@id": `${siteUrl}/#org` },
        areaServed: "JP",
        hoursAvailable: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "19:00",
            closes: "22:00",
          },
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday"], opens: "10:00", closes: "18:00" },
        ],
        offers: plans.map((p) => ({
          "@type": "Offer",
          name: `${p.name}プラン`,
          description: `${p.target}向け。${p.hours}。`,
          price: p.price.replace(/,/g, ""),
          priceCurrency: "JPY",
          url: `${siteUrl}/#plans`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
