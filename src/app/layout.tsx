import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "메이플 월드 커뮤니티 | 국내 최대 메이플 디스코드",
  description:
    "약 3만 명이 함께하는 국내 최대 규모 메이플 월드 디스코드 커뮤니티. 신뢰할 수 있는 메소 거래, 닉네임·길드 거래, 파티 모집까지 한 곳에서.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#08090F] text-[#E7E8F2]">
        {children}
      </body>
    </html>
  );
}
