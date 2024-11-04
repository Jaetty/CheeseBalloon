import type { Metadata } from "next";
import "src/styles/globals.css";
import Nav from "src/components/nav/index";
import CustomAlert from "src/lib/CustomAlert";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { PopstateProvider } from "src/lib/PopContext";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "치즈벌룬",
  description:
    "치지직과 SOOP TV 방송인들의 주요 데이터들을 수집하여 제공합니다.",
  icons: {
    icon: "/svgs/cheese.png",
  },
  keywords: [
    "치즈벌룬",
    "아프리카tv",
    "SOOP TV",
    "숲",
    "치지직",
    "방송 통계",
    "랭킹",
    "실시간 방송",
    "인터넷 방송",
    "시청자수",
    "시청률",
    "팔로워",
    "방송 시간",
  ],
};

const SignInChecker = dynamic(() => import("@/src/lib/SignInChecker"));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId="G-F2SWLBDJYR" />
      <PopstateProvider>
        <Suspense fallback={null}>
          <SignInChecker />
        </Suspense>
        <body>
          <Nav />
          <div className="flex-container">
            <GoogleAnalytics gaId="G-F2SWLBDJYR" />
            <div className="children">{children}</div>
            <CustomAlert />
          </div>
        </body>
      </PopstateProvider>
    </html>
  );
}
