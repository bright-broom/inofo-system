import { brand } from "@/content";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid place-items-center rounded-lg border-[2.5px] border-ink bg-sun px-2 py-0.5 font-display text-lg leading-none tracking-wider shadow-[3px_3px_0_#111]">
        {brand.name}
      </span>
      <span className="hidden text-[10px] font-bold leading-tight sm:block">
        {brand.tagline}
        <br />
        <span className="tracking-[.3em] text-neutral-500">{brand.roman}</span>
      </span>
    </span>
  );
}
