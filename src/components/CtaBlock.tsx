import { brand, hours, mailto } from "@/content";
import { Mascot } from "./Mascot";
import { Reveal } from "./Reveal";

export function CtaBlock() {
  return (
    <Reveal className="mx-auto my-20 max-w-5xl px-4">
      <div className="relative overflow-hidden rounded-[2rem] border-[3px] border-ink bg-sun px-6 py-10 shadow-[8px_8px_0_#111] md:px-14 md:py-12">
        <div className="dots pointer-events-none absolute -top-10 -right-10 size-48 rounded-full opacity-25" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="sec-title text-2xl md:text-3xl">
              どのプランが合うか、
              <br />
              まずは無料でご相談ください。
            </p>
            <p className="mt-3 text-sm leading-relaxed md:text-base">
              いまの状況を伺って、最適なプランをご提案します。
              <br className="hidden md:block" />
              「まだ検討段階」でも大歓迎です。
            </p>
            <p className="mt-5 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold">受付：{hours.label}（土日祝も対応）</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Mascot className="w-20 md:w-24" />
            <a href={mailto()} className="rounded-full bg-ink px-8 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-indigo">
              メールで無料相談 →
            </a>
            <a href="#plans" className="text-sm font-bold underline underline-offset-4">プランを比較する</a>
          </div>
        </div>
        <p className="relative mt-6 text-center text-xs md:text-left">
          宛先：<span className="font-bold">{brand.email}</span>
        </p>
      </div>
    </Reveal>
  );
}
