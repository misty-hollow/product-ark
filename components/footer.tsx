"use client";

import { useLang } from "@/lib/i18n/context";
import { t } from "@/lib/i18n/translations";

export function Footer() {
  const { lang } = useLang();
  const tx = t[lang];

  return (
    <footer className="border-t border-[var(--border-fine)] bg-[var(--bg-base)]">
      <div className="archive-container grid gap-6 py-8 text-[var(--ink-secondary)] md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div>
          <p className="font-display text-xl italic text-[var(--ink-primary)]">
            {tx.siteName}
          </p>
          <p className="mt-1 font-display text-sm italic text-[var(--ink-secondary)]">
            {tx.footerTagline}
          </p>
        </div>
        <div className="flex items-center gap-2 border-y border-[var(--border-fine)] py-3 font-mono text-[10px] uppercase tracking-widest text-[var(--ink-muted)] md:border-x md:border-y-0 md:px-8 md:py-0">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-active)] opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-active)]" />
          </span>
          {tx.archiveStatus}
        </div>
        <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--ink-muted)] md:text-right">
          {tx.footerCopy}
        </p>
      </div>
    </footer>
  );
}
