import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jujutsu-shindan.vercel.app"),
  title: "呪術廻戦キャラ診断｜あなたの術式と呪術師ランクを判定",
  description:
    "15問で50名の呪術廻戦キャラからあなたの呪術師タイプを診断。術式・級位まで判明。自分の術式を知りたいならここから。",
  keywords: [
    "呪術廻戦 診断",
    "術式 診断",
    "呪術師 級位",
    "キャラ診断",
    "呪術 占い",
    "領域展開",
  ],
  openGraph: {
    title: "呪術廻戦キャラ診断｜あなたの術式と呪術師ランクを判定",
    description:
      "15問で50名のキャラからあなたの呪術師タイプを診断。術式・級位まで判明！",
    type: "website",
    siteName: "呪術廻戦キャラ診断",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "呪術廻戦キャラ診断｜あなたの術式と呪術師ランクを判定",
    description:
      "15問で50名のキャラからあなたの呪術師タイプを診断！",
  },
  alternates: {
    canonical: "https://jujutsu-shindan.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "呪術廻戦キャラ診断",
              url: "https://jujutsu-shindan.vercel.app",
              description:
                "15問の質問で50名の呪術廻戦キャラからあなたの呪術師タイプを診断。",
              applicationCategory: "EntertainmentApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "JPY",
              },
              inLanguage: "ja",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
