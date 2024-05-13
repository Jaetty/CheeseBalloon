import type { Metadata } from "next";
import "src/styles/globals.css";
import Nav from "src/components/nav/index";
import Footer from "src/components/footer";
import { PaddingProvider } from "src/lib/PaddingContext";
import { MenuProvider } from "src/lib/MenuContext";

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
          <MenuProvider></MenuProvider>
          <PaddingProvider>
            <div className="children">
              {children}
              <Footer />
            </div>
          </PaddingProvider>
        </div>
      </body>
    </html>
  );
}
