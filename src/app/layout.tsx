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
  title: "呪術廻戦キャラ診断 | あなたの術式を解き明かす",
  description:
    "15問の質問に答えて、あなたに最も近い呪術廻戦のキャラクターを診断！50名のキャラクターから、あなたの呪術師タイプが判明します。",
  openGraph: {
    title: "呪術廻戦キャラ診断 | あなたの術式を解き明かす",
    description:
      "15問の質問に答えて、50名の呪術廻戦キャラからあなたのタイプを診断！",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "呪術廻戦キャラ診断 | あなたの術式を解き明かす",
    description:
      "15問の質問に答えて、50名の呪術廻戦キャラからあなたのタイプを診断！",
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
        {children}
      </body>
    </html>
  );
}
