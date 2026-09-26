export function SectionTitle({ en, children, light = false }: { en: string; children: React.ReactNode; light?: boolean }) {
  return (
    <div className="mb-12 text-center">
      <p className={`mb-2 font-display text-xs tracking-[.35em] uppercase ${light ? "text-ink/60" : "text-indigo"}`}>{en}</p>
      <h2 className="sec-title text-[1.7rem] md:text-4xl">{children}</h2>
    </div>
  );
}
