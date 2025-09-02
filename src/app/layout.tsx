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
  title: "Floe ICE",
  description: "Floe Ice 是一个精心打造的现代化平台开发模板，融合了最新的 Web 技术栈和优雅的设计理念。它不仅仅是一个模板，更是一件艺术品 —— 每一个像素都经过精心雕琢，每一个动画都流畅如丝，为开发者提供无与伦比的开发体验。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
