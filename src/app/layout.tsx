import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FloatingPeriodicTable } from "@/components/FloatingPeriodicTable";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hóa Học THPTQG Survival Guide",
  description: "Nền tảng học tập Hóa Học THPTQG — Hệ thống kiến thức theo dạng bài, bảng tuần hoàn tương tác và kho bài tập thông minh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <FloatingPeriodicTable />
      </body>
    </html>
  );
}
