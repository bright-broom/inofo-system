"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled || open ? "bg-white/95 shadow-sm backdrop-blur" : "bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <a href="#top" aria-label="トップへ"><Logo /></a>
        <nav className="hidden items-center gap-6 text-sm font-bold lg:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-indigo">{n.label}</a>
          ))}
          <a href="#contact" className="rounded-full bg-ink px-5 py-2.5 text-white hover:bg-indigo">無料相談</a>
        </nav>
        <button
          className="relative grid size-11 place-items-center lg:hidden"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`absolute h-0.5 w-6 bg-ink transition ${open ? "rotate-45" : "-translate-y-1.5"}`} />
          <span className={`absolute h-0.5 w-6 bg-ink transition ${open ? "-rotate-45" : "translate-y-1.5"}`} />
        </button>
      </div>
      <div className={`fixed inset-x-0 top-16 bottom-0 bg-sun transition lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <ul className="flex flex-col gap-1 p-6 text-xl font-bold">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} onClick={() => setOpen(false)} className="block border-b-2 border-ink/10 py-4">{n.label}</a>
            </li>
          ))}
          <li className="mt-6">
            <a href="#contact" onClick={() => setOpen(false)} className="block rounded-full bg-ink py-4 text-center text-white">メールで無料相談</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
