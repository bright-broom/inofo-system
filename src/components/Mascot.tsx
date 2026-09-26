// オリジナルマスコット「ふくろう」
export function Mascot({ className = "", wave = false }: { className?: string; wave?: boolean }) {
  return (
    <svg viewBox="0 0 120 130" className={className} aria-hidden>
      <ellipse cx="60" cy="122" rx="34" ry="5" fill="#000" opacity=".12" />
      <path d="M22 44 Q20 18 36 22 L48 30 Q60 26 72 30 L84 22 Q100 18 98 44 Q106 70 98 96 Q90 118 60 118 Q30 118 22 96 Q14 70 22 44Z" fill="#8a5a2b" stroke="#111" strokeWidth="3" />
      <path d="M36 70 Q60 60 84 70 Q88 100 60 110 Q32 100 36 70Z" fill="#f3dcb2" stroke="#111" strokeWidth="2.5" />
      <path d="M44 80 l4 4 4-4 M56 82 l4 4 4-4 M68 80 l4 4 4-4 M50 94 l4 4 4-4 M62 94 l4 4 4-4" fill="none" stroke="#b58b55" strokeWidth="2" strokeLinecap="round" />
      <circle cx="44" cy="50" r="15" fill="#fff" stroke="#111" strokeWidth="3" />
      <circle cx="76" cy="50" r="15" fill="#fff" stroke="#111" strokeWidth="3" />
      <circle cx="46" cy="52" r="6" fill="#111" />
      <circle cx="74" cy="52" r="6" fill="#111" />
      <circle cx="48" cy="50" r="2" fill="#fff" />
      <circle cx="76" cy="50" r="2" fill="#fff" />
      <path d="M55 62 L60 72 L65 62Z" fill="#ffb629" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M52 118 v6 M68 118 v6" stroke="#ffb629" strokeWidth="4" strokeLinecap="round" />
      {wave ? (
        <path d="M98 70 Q116 56 112 38" fill="none" stroke="#111" strokeWidth="9" strokeLinecap="round" />
      ) : null}
      {wave ? <path d="M98 70 Q116 56 112 38" fill="none" stroke="#8a5a2b" strokeWidth="5" strokeLinecap="round" /> : null}
    </svg>
  );
}
