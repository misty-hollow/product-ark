export function Footer() {
  return (
    <footer className="border-t border-[var(--border-xs)] bg-[var(--surface-page)]">
      <div className="ark-wrap grid gap-6 py-10 text-[var(--ink-2)] md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div>
          <p className="font-serif text-[17px] font-semibold not-italic text-[var(--ink-0)]">
            지구물건보관소 (地球物件保管所)
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
            THE PERMANENT ARCHIVE OF TRIVIAL SPECIMENS
          </p>
          <p className="mt-3 max-w-md text-xs leading-5 text-[var(--ink-2)]">
            본 아카이브는 사소한 일상 개체가 소실되는 상황을 대비해 출범했습니다.
          </p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 border border-[var(--border-sm)] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-[var(--ink-3)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent-green)] opacity-50 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-green)]" />
          </span>
          [Archive Status: Active]
        </div>
        <p className="whitespace-nowrap font-mono text-[9px] uppercase tracking-widest text-[var(--ink-3)] md:text-right">
          © 2026 EARTH OBJECT ARCHIVE. ALL SPECIMEN RECORDS PERMANENTLY KEPT.
        </p>
      </div>
    </footer>
  );
}
