import type { Metadata } from "next";
import "src/styles/globals.css";
import Footer from "src/components/footer";
import { PaddingProvider } from "src/lib/PaddingContext";
import NotificationProvider from "src/lib/NotificationContext";
import { MenuProvider } from "src/lib/MenuContext";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "치즈벌룬",
  description:
    "치지직과 아프리카TV 방송인들의 주요 데이터들을 수집하여 제공합니다.",
  icons: {
    icon: "/svgs/cheese.png",
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const toggleValue = cookieStore.get("toggle")?.value === "true";
  const initialIsMobile = cookieStore.get("viewport")?.value === "mobile";

  return (
    <MenuProvider
      initialToggleValue={toggleValue}
      initialIsMobile={initialIsMobile}
    >
      <PaddingProvider initialToggleValue={toggleValue}>
        <NotificationProvider>
          <div className="children">
            {children}
            <div className="footer">
              <Footer />
            </div>
          </div>
        </NotificationProvider>
      </PaddingProvider>
    </MenuProvider>
  );
}
