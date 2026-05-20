"use client";

import { useLang } from "@/lib/i18n/context";
import { t } from "@/lib/i18n/translations";

export function NewItemPageIntro() {
  const { lang } = useLang();
  const tx = t[lang];

  return (
    <div className="mb-7 space-y-4">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
          {tx.newPageLabel}
        </p>
        <h1 className="mt-1 text-3xl font-semibold">{tx.newPageTitle}</h1>
        <p className="mt-3 text-sm leading-6 text-stone-500">
          {tx.newPageDesc}
        </p>
      </div>
      <div className="border-l-2 border-stone-400 bg-[#F4F1EA]/80 p-4 text-xs leading-6 text-stone-600">
        {tx.newPageNotice}
      </div>
    </div>
  );
}
