import {
  brand, problems, services, phases, experts, workload, steps, reasons, tips, message, terms, domains, crossDomains, faqs, sns,
} from "@/content";
import { Header } from "@/components/Header";
import { FixedCta } from "@/components/FixedCta";
import { CtaBlock } from "@/components/CtaBlock";
import { ContactForm } from "@/components/ContactForm";
import { Mascot } from "@/components/Mascot";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";

const br = (s: string) => s.split("\n").flatMap((l, i) => (i ? [<br key={i} />, l] : [l]));

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="overflow-x-clip">
        <Hero />
        <Problems />
        <Services />
        <Pricing />
        <Team />
        <CtaBlock />
        <Flow />
        <Reasons />
        <CtaBlock />
        <Tips />
        <Message />
        <Terms />
        <Domains />
        <Faq />
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
            <span className="bg-white px-2 box-decoration-clone">チームです！</span>
          </h1>
          <p className="mt-8 max-w-md text-sm leading-loose font-bold md:text-base">
            ヘルプデスクからセキュリティ、IT戦略まで。
            <br />
            必要なときに、必要な専門家が、月額でチームに加わります。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="rounded-full bg-ink px-8 py-4 font-bold text-white shadow-[4px_4px_0_#fff] transition hover:-translate-y-0.5 hover:bg-indigo">資料請求はこちら →</a>
            <a href="#price" className="rounded-full border-[2.5px] border-ink bg-white px-8 py-4 font-bold transition hover:-translate-y-0.5">料金を見る</a>
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
          {["新入社員3名のPCセットアップ完了", "多要素認証を全社展開", "複合機のスキャン設定を修正"].map((t) => (
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={i} delay={(i % 3) * 100} className="h-full">
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
            その悩み、<span className="marker">{brand.name}</span>がまとめて引き受けます。
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
function Services() {
  return (
    <section id="service" className="relative bg-sun py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <Logo className="justify-center" />
          <h2 className="sec-title mt-6 text-2xl md:text-4xl">
            下記のサービスをまとめて
            <br />
            <span className="mt-2 inline-block rounded-2xl bg-ink px-5 py-2 text-sun">
              月額 <span className="text-4xl md:text-6xl">4.8</span>万円<span className="text-base">(税別)</span>〜
            </span>
          </h2>
          <p className="mt-4 text-xs">※ヒアリング内容をもとに個別にお見積りいたします。</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 100} className="h-full">
              <div className="h-full rounded-3xl border-[2.5px] border-ink bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ink text-sun">
                    <Icon name={s.icon} className="size-7" />
                  </span>
                  <h3 className="text-lg leading-snug font-black">{s.title}</h3>
                </div>
                <ul className="mt-5 grid gap-1.5 text-sm">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-2 before:mt-2 before:size-1.5 before:shrink-0 before:rounded-full before:bg-indigo">{it}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */
function Pricing() {
  return (
    <section id="price" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle en="Service & Price">サービス領域と料金の目安</SectionTitle>
        <p className="-mt-6 mb-12 text-center text-sm">各フェーズのメニューは自由に組み合わせてご利用いただけます。</p>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {phases.map((p, i) => (
            <Reveal key={p.no} delay={i * 100} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border-[2.5px] border-ink bg-white">
                <header className="relative bg-ink px-6 py-6 text-white" style={{ background: i === 3 ? "var(--color-indigo)" : undefined }}>
                  <p className="font-display text-xs tracking-widest text-sun">PHASE {p.no}</p>
                  <p className="mt-1 text-xl font-black">{p.name}</p>
                  <p className="mt-3 text-sm leading-snug font-bold opacity-90">{br(p.goal)}</p>
                  <p className="mt-4 rounded-xl bg-white/10 px-3 py-2 text-sm">
                    <span className="font-display text-2xl text-sun">{p.rate}</span> 円/h
                  </p>
                </header>
                <div className="grid flex-1 content-start gap-5 p-6">
                  {p.blocks.map((b) => (
                    <div key={b.title}>
                      <p className="mb-2 inline-block rounded-full bg-sun px-3 py-0.5 text-xs font-black">{b.title}</p>
                      <ul className="grid gap-1 text-sm">
                        {b.items.map((it) => <li key={it}>・{it}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 hidden items-center gap-2 text-xs font-bold text-neutral-500 xl:flex">
          <span>運用</span>
          <span className="h-1 flex-1 rounded-full bg-gradient-to-r from-ink via-sun-deep to-indigo" />
          <span>経営</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Team ---------------- */
function Team() {
  const totals = workload.map((w) => w.hours.reduce((a, b) => a + b, 0));
  const fmt = (h: number) => (h ? `${h}h` : "—");
  return (
    <section className="bg-soft py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle en="Team">
          「あれもこれも」に
          <br className="md:hidden" />
          <span className="marker">チームで</span>対応します！
        </SectionTitle>

        <Reveal className="mx-auto grid max-w-4xl items-center gap-6 md:grid-cols-[auto_auto_1fr]">
          <div className="flex flex-col items-center gap-2">
            <span className="grid size-24 place-items-center rounded-full border-[2.5px] border-ink bg-white text-3xl">🏢</span>
            <span className="font-bold">お客様</span>
          </div>
          <span className="text-center text-2xl font-black md:text-3xl">⇄</span>
          <div className="rounded-3xl border-[2.5px] border-ink bg-white p-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-ink px-4 py-1.5 text-sm font-bold text-white">専任窓口 / PM</span>
              <span className="text-sm font-bold">がご要望を整理して割り振り</span>
            </div>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
              {experts.map((e) => (
                <span key={e} className="grid min-h-16 place-items-center rounded-2xl bg-sun px-1 text-center text-xs leading-tight font-bold">{e}</span>
              ))}
            </div>
            <p className="mt-3 text-right text-xs font-bold text-neutral-500">{brand.name} エキスパートチーム</p>
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <p className="mb-4 text-center font-black">稼働イメージ（例）</p>
          <div className="overflow-x-auto rounded-3xl border-[2.5px] border-ink bg-white">
            <table className="w-full min-w-[640px] text-center text-sm">
              <thead className="bg-ink text-white">
                <tr>
                  <th className="p-3" />
                  {experts.map((e) => <th key={e} className="p-3 text-xs font-bold">{e}</th>)}
                  <th className="bg-indigo p-3 font-bold">合計</th>
                </tr>
              </thead>
              <tbody>
                {workload.map((w, i) => (
                  <tr key={w.month} className="border-t border-neutral-200">
                    <th className="p-3 font-black">{w.month}</th>
                    {w.hours.map((h, j) => (
                      <td key={j} className={`p-3 ${h ? "font-bold" : "text-neutral-300"}`}>
                        {fmt(h)}
                        {h >= 8 && <span className="block text-[10px] text-neutral-500">({h / 8}日)</span>}
                      </td>
                    ))}
                    <td className="bg-sun/60 p-3 font-display text-lg">{totals[i]}h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="sec-title mt-8 text-center text-xl md:text-2xl">
            必要な専門家を、<span className="marker">必要なときだけ。</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Flow ---------------- */
function Flow() {
  return (
    <section id="flow" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle en="Flow">ご支援までの流れ</SectionTitle>
        <p className="-mt-6 mb-12 text-center">
          <span className="rounded-full bg-alert px-4 py-1.5 text-sm font-black text-white">STEP2まで無料！</span>
        </p>
        <ol className="grid gap-6 md:grid-cols-4">
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
                  <span className="absolute top-1/2 -right-5 z-10 hidden size-8 -translate-y-1/2 place-items-center rounded-full bg-sun font-black md:grid">›</span>
                )}
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
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
            <span className="text-sun">{brand.name}</span>が選ばれる理由
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-6">
          {reasons.map((r, i) => (
            <Reveal key={r.big} delay={i * 80} className={`h-full ${i < 2 ? "md:col-span-3" : "md:col-span-2"}`}>
              <div className="h-full rounded-3xl border-2 border-white/15 bg-white/5 p-6 md:p-8">
                <p className="font-display text-5xl text-sun/30">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-2xl font-black text-sun">{r.big}</p>
                <p className="mt-3 text-sm leading-relaxed opacity-90">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
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
          <h2 className="sec-title text-3xl">代表あいさつ</h2>
          <div className="mt-8 grid aspect-square w-56 place-items-center rounded-full border-[3px] border-ink bg-white md:w-full">
            <Mascot className="w-1/2" />
          </div>
          <p className="mt-6 text-sm font-bold">{brand.company}</p>
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

/* ---------------- Terms ---------------- */
function Terms() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4">
        <SectionTitle en="Terms">サービスご提供にあたって</SectionTitle>
        <div className="grid gap-6">
          <Reveal className="rounded-3xl border-[2.5px] border-ink p-6 md:p-8">
            <p className="text-lg font-black">基本対応時間</p>
            <p className="mt-2 font-display text-3xl">{terms.hours}</p>
            <ul className="mt-3 grid gap-1 text-sm text-neutral-600">
              {terms.hoursNote.map((n) => <li key={n}>※{n}</li>)}
            </ul>
          </Reveal>
          <Reveal className="rounded-3xl bg-soft p-6 md:p-8">
            <p className="text-lg font-black">月額料金に含まれないもの</p>
            <ul className="mt-4 grid gap-2 text-sm md:grid-cols-2">
              {terms.excluded.map((e) => <li key={e} className="flex gap-2"><span className="text-indigo">●</span>{e}</li>)}
            </ul>
          </Reveal>
          <Reveal className="rounded-3xl border-2 border-neutral-200 p-6 text-sm leading-relaxed md:p-8">
            <p className="mb-2 text-lg font-black">サービス提供会社</p>
            <p className="font-bold">{brand.company}</p>
            <p>{brand.zip} {brand.address}</p>
            <p>TEL {brand.tel}</p>
            <p>URL <a href={brand.url} className="text-indigo underline">{brand.url}</a></p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Domains ---------------- */
function Domains() {
  return (
    <section className="bg-soft py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle en="Coverage">
          企業の情シスが
          <br className="md:hidden" />
          カバーすべき領域
        </SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {domains.map((d, i) => (
            <Reveal key={d.area} delay={(i % 4) * 80} className={`h-full ${i === 0 ? "sm:col-span-2" : ""}`}>
              <div className={`h-full rounded-3xl border-[2.5px] border-ink p-5 ${i === 0 ? "bg-sun" : "bg-white"}`}>
                <p className="mb-4 inline-block rounded-full bg-ink px-4 py-1 text-sm font-black text-white">{d.area}</p>
                <div className={`grid gap-4 ${i === 0 ? "sm:grid-cols-3" : ""}`}>
                  {d.groups.map((g) => (
                    <div key={g.title}>
                      <p className="mb-2 text-sm font-black">{g.title}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {g.items.map((it) => (
                          <span key={it} className="rounded-lg border border-ink/15 bg-white px-2 py-1 text-xs">{it}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6 rounded-3xl border-[2.5px] border-dashed border-indigo bg-white p-5">
          <p className="mb-3 text-sm font-black text-indigo">部門横断</p>
          <div className="flex flex-wrap gap-2">
            {crossDomains.map((c) => <span key={c} className="rounded-full bg-indigo px-4 py-1.5 text-sm font-bold text-white">{c}</span>)}
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

/* ---------------- SNS ---------------- */
function Sns() {
  return (
    <section className="pb-10">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="font-black">各種SNSでも情報発信中！</p>
        <div className="mt-4 flex justify-center gap-3">
          {sns.map((s) => (
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
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="mb-2 font-display text-xs tracking-[.35em] uppercase">Contact</p>
          <h2 className="sec-title text-3xl md:text-4xl">
            情シスのお悩み解決に、
            <br />
            まずは「資料請求」を。
          </h2>
          <p className="mt-6 leading-loose">
            サービス内容や料金プランを
            <br />
            分かりやすくまとめた資料をご用意しています。
            <br />
            ご相談だけでもお気軽にどうぞ。
          </p>
          <a href={`tel:${brand.tel}`} className="mt-8 inline-flex items-center gap-3 rounded-2xl border-[2.5px] border-ink bg-white px-6 py-4">
            <span className="text-sm font-bold">お電話でも</span>
            <span className="font-display text-2xl">{brand.tel}</span>
          </a>
          <p className="mt-2 text-xs">受付：{terms.hours}</p>
          <Mascot className="mt-10 hidden w-36 md:block" wave />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-ink pt-14 pb-28 text-white md:pb-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo className="[&>span:last-child]:text-white" />
          <p className="mt-4 text-sm opacity-80">{brand.company}</p>
          <p className="text-xs opacity-60">{brand.zip} {brand.address}</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs opacity-80">
          <a href="#" className="hover:underline">プライバシーポリシー</a>
          <a href="#" className="hover:underline">運営会社</a>
          <a href="#contact" className="hover:underline">お問い合わせ</a>
        </div>
      </div>
      <p className="mt-10 text-center text-[11px] opacity-50">© {new Date().getFullYear()} {brand.company}</p>
    </footer>
  );
}
