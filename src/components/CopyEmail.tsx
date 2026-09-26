"use client";

import { useState } from "react";
import { brand } from "@/content";

export function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(brand.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // クリップボード非対応環境では何もしない（アドレスは画面に表示済み）
    }
  }
  return (
    <button type="button" onClick={copy} className={`rounded-full border-2 border-ink px-4 py-2 text-xs font-bold transition hover:bg-ink hover:text-white ${className}`}>
      {copied ? "コピーしました ✓" : "アドレスをコピー"}
    </button>
  );
}
