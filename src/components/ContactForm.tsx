"use client";

import { useState } from "react";

type Status = "idle" | "confirm" | "sending" | "done" | "error";

const fields = [
  { name: "company", label: "会社名", type: "text", required: true },
  { name: "name", label: "お名前", type: "text", required: true },
  { name: "email", label: "メールアドレス", type: "email", required: true },
  { name: "tel", label: "電話番号", type: "tel", required: false },
] as const;

const sizes = ["〜29名", "30〜99名", "100〜299名", "300名以上"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setData(Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>);
    setStatus("confirm");
  }

  async function send() {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  const step = status === "idle" ? 0 : status === "done" ? 2 : 1;

  return (
    <div className="rounded-[2rem] border-[3px] border-ink bg-white p-6 shadow-[8px_8px_0_#111] md:p-10">
      <ol className="mb-8 grid grid-cols-3 gap-2 text-center text-[11px] font-bold md:text-sm">
        {["入力", "確認・送信", "資料ダウンロード"].map((s, i) => (
          <li key={s} className={`rounded-full py-2 ${i === step ? "bg-ink text-white" : "bg-soft text-neutral-500"}`}>
            {i + 1}. {s}
          </li>
        ))}
      </ol>

      {status === "idle" && (
        <form onSubmit={onSubmit} className="grid gap-5">
          {fields.map((f) => (
            <label key={f.name} className="grid gap-1.5 text-sm font-bold">
              <span>
                {f.label}
                {f.required && <span className="ml-2 rounded bg-alert px-1.5 py-0.5 text-[10px] text-white">必須</span>}
              </span>
              <input
                name={f.name}
                type={f.type}
                required={f.required}
                defaultValue={data[f.name]}
                className="rounded-xl border-2 border-neutral-300 bg-soft px-4 py-3 font-normal outline-none focus:border-ink focus:bg-white"
              />
            </label>
          ))}
          <label className="grid gap-1.5 text-sm font-bold">
            従業員規模
            <select name="size" defaultValue={data.size ?? sizes[1]} className="rounded-xl border-2 border-neutral-300 bg-soft px-4 py-3 font-normal">
              {sizes.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-bold">
            ご相談内容
            <textarea name="message" rows={4} defaultValue={data.message} className="rounded-xl border-2 border-neutral-300 bg-soft px-4 py-3 font-normal outline-none focus:border-ink focus:bg-white" />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="agree" required className="size-4 accent-ink" />
            プライバシーポリシーに同意する
          </label>
          <button className="mt-2 rounded-full bg-ink py-4 font-bold text-white transition hover:bg-indigo">入力内容を確認する →</button>
        </form>
      )}

      {(status === "confirm" || status === "sending" || status === "error") && (
        <div className="grid gap-4">
          <dl className="divide-y divide-neutral-200 rounded-xl bg-soft px-5 text-sm">
            {[...fields.map((f) => [f.label, data[f.name]]), ["従業員規模", data.size], ["ご相談内容", data.message]].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7rem_1fr] gap-3 py-3">
                <dt className="font-bold">{k}</dt>
                <dd className="whitespace-pre-wrap break-all">{v || "—"}</dd>
              </div>
            ))}
          </dl>
          {status === "error" && <p className="text-sm font-bold text-alert">送信に失敗しました。時間をおいて再度お試しください。</p>}
          <div className="grid gap-3 md:grid-cols-2">
            <button onClick={() => setStatus("idle")} className="rounded-full border-2 border-ink py-4 font-bold">修正する</button>
            <button onClick={send} disabled={status === "sending"} className="rounded-full bg-ink py-4 font-bold text-white hover:bg-indigo disabled:opacity-60">
              {status === "sending" ? "送信中…" : "この内容で送信する"}
            </button>
          </div>
        </div>
      )}

      {status === "done" && (
        <div className="grid justify-items-center gap-4 py-6 text-center">
          <p className="sec-title text-2xl">送信ありがとうございました！</p>
          <p className="text-sm">以下のボタンからサービス資料をダウンロードいただけます。</p>
          <a href="/service-guide.pdf" download className="rounded-full bg-ink px-10 py-4 font-bold text-white hover:bg-indigo">資料をダウンロード ↓</a>
        </div>
      )}
    </div>
  );
}
