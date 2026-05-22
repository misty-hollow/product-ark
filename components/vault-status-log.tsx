"use client";

import { useEffect, useState } from "react";

export function VaultStatusLog() {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    function tick() {
      setTime(
        new Intl.DateTimeFormat("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        }).format(new Date())
      );
    }

    tick();
    const timer = window.setInterval(tick, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-3 border-l-[3px] border-[var(--accent-active)] bg-[var(--bg-inset)] px-4 py-3 text-left font-mono text-xs leading-6 text-[var(--ink-secondary)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <span className="relative mt-2 flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-[var(--accent-active)] opacity-50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-active)]" />
        </span>
        <p>
          <span className="font-medium text-[var(--ink-primary)]">STATUS / ENV-LOG</span>
          <span className="mx-2 text-[var(--ink-muted)]">·</span>
          수장고 온도 <span className="font-medium text-[var(--ink-primary)]">20.5°C</span>
          <span className="mx-2 text-[var(--ink-muted)]">·</span>
          습도 <span className="font-medium text-[var(--ink-primary)]">45.0%</span>
          <span className="mx-2 text-[var(--ink-muted)]">·</span>
          상태 <span className="font-medium text-[var(--ink-primary)]">정상</span>
        </p>
      </div>
      <p className="shrink-0 text-[10px] uppercase tracking-widest text-[var(--ink-muted)]">
        LAST SYNC: {time}
      </p>
    </div>
  );
}
