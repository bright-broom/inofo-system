import { brand } from "@/content";
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
              情シスの困りごと、
              <br />
              まずは「資料請求」から。
            </p>
            <p className="mt-3 text-sm leading-relaxed md:text-base">
              サービス内容・対応範囲・導入の流れを
              <br className="hidden md:block" />
              1冊にまとめてお届けします。
            </p>
            <ol className="mt-5 flex flex-wrap gap-2 text-xs font-bold">
              {["フォームに入力", "内容を確認して送信", "資料をダウンロード"].map((s, i) => (
                <li key={s} className="rounded-full bg-white px-3 py-1.5">
                  {i + 1}. {s}
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Mascot className="w-20 md:w-24" />
            <a href="#contact" className="rounded-full bg-ink px-8 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-indigo">
              資料請求/お問い合わせ →
            </a>
            <a href={`tel:${brand.tel}`} className="text-sm font-bold">
              TEL <span className="font-display text-lg">{brand.tel}</span>
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
