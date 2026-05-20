import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { koKR } from "@clerk/localizations";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LangProvider } from "@/lib/i18n/context";
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
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Noto+Serif+KR:wght@300;400;500;700&family=DM+Mono:wght@300;400;500&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <LangProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </LangProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
