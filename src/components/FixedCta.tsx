"use client";

import { useEffect, useState } from "react";
import { Mascot } from "./Mascot";

export function FixedCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const contact = document.getElementById("contact");
      const nearContact = contact ? contact.getBoundingClientRect().top < window.innerHeight : false;
      setShow(window.scrollY > 400 && !nearContact);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <a
      href="#contact"
      className={`fixed right-3 bottom-3 z-40 flex items-center rounded-full bg-ink py-3.5 pr-16 pl-6 text-sm font-bold text-white shadow-lg transition duration-300 hover:bg-indigo md:right-6 md:bottom-6 md:py-5 md:pr-24 md:pl-10 md:text-lg ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
    >
      無料で相談する
      <Mascot className="bob absolute -top-8 right-1 w-16 md:-top-12 md:w-24" wave />
    </a>
  );
}
