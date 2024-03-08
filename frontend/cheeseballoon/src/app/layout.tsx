import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "src/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CheeseBalloon",
  description:
    "치지직과 아프리카TV 방송인들의 주요 데이터들을 수집하여 제공합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className as string | undefined}>{children}</body>
    </html>
  );
}
