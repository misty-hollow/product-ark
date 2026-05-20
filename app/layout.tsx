import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { koKR } from "@clerk/localizations";

import { Header } from "@/components/header";
import "./globals.css";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "지구물건보관소",
    template: "%s | 지구물건보관소"
  },
  description: "오늘 본 물건을 미래의 도감에 남기는 소장 기록 커뮤니티"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={koKR}>
      <html lang="ko">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <Header />
          <main>{children}</main>
          <footer className="border-t border-[var(--border-fine)] bg-[var(--bg-base)]">
            <div className="archive-container grid gap-6 py-8 text-[var(--ink-secondary)] md:grid-cols-[1fr_auto_1fr] md:items-center">
              <div>
                <p className="font-display text-xl italic text-[var(--ink-primary)]">
                  지구물건보관소
                </p>
                <p className="mt-1 font-display text-sm italic text-[var(--ink-secondary)]">
                  오늘의 사물을 내일의 유산으로
                </p>
              </div>
              <div className="flex items-center gap-2 border-y border-[var(--border-fine)] py-3 font-mono text-[10px] uppercase tracking-widest text-[var(--ink-muted)] md:border-x md:border-y-0 md:px-8 md:py-0">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-active)] opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-active)]" />
                </span>
                [Archive Status: Active]
              </div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--ink-muted)] md:text-right">
                © 2026 Earth Object Archive
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
