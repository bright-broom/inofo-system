const paths: Record<string, React.ReactNode> = {
  cloud: <path d="M7 18h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.1 9.5 4.5 4.5 0 0 0 7 18Z" />,
  laptop: <><rect x="4" y="5" width="16" height="11" rx="1.5" /><path d="M2 19h20" /></>,
  chat: <path d="M4 5h16v11H9l-5 4V5Zm4 5h.01M12 10h.01M16 10h.01" />,
  shield: <path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3Zm-3 9 2 2 4-4" />,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
  rocket: <path d="M5 19c1-3 2-4 4-5m-4 5c3-1 4-2 5-4m4-10c3 0 5 2 5 5-1 4-5 7-8 8l-4-4c1-3 4-7 7-9Zm0 5h.01" />,
};

export function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[name]}
    </svg>
  );
}
