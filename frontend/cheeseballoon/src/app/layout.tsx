import type { Metadata } from "next";
import "src/styles/globals.css";
import Nav from "src/components/nav/index";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { PopstateProvider } from "src/lib/PopContext";

export const metadata: Metadata = {
  title: "CheeseBalloon",
  description:
    "치지직과 아프리카TV 방송인들의 주요 데이터들을 수집하여 제공합니다.",
  icons: {
    icon: "/svgs/cheese.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId="G-F2SWLBDJYR" />
      <PopstateProvider>
        <body>
          <Nav />
          <div className="flex-container">
            <GoogleAnalytics gaId="G-F2SWLBDJYR" />
            <div className="children">{children}</div>
          </div>
        </body>
      </PopstateProvider>
    </html>
  );
}
