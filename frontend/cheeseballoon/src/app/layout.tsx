import type { Metadata } from "next";
import "src/styles/globals.css";
import Nav from "src/components/nav/index";
import Menu from "src/components/nav/item/Menu";
import Footer from "src/components/footer";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Nav />
        <div className="flex-container">
          <Menu />
          <div className="children">
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
