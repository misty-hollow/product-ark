import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { koKR } from "@clerk/localizations";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "지구물건보관소",
    template: "%s | 지구물건보관소"
  },
  description:
    "지금 존재하는 물건의 이름, 모습, 해설과 기억을 보존하는 사소한 생활사 아카이브"
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
          <meta name="theme-color" content="#F5F2EA" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </head>
        <body>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
