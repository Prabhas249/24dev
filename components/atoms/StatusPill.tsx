export function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-ink-soft/80 px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-fog-muted backdrop-blur">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
      </span>
      {children}
    </div>
  );
}
