import type { Metadata } from "next";
import "src/styles/globals.css";
import Nav from "src/components/nav/index";

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
      <body>
        <Nav />
        <div className="flex-container">
          <div className="children">{children}</div>
        </div>
      </body>
    </html>
  );
}
