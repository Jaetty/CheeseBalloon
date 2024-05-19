import type { Metadata } from "next";
import "src/styles/globals.css";

export const metadata: Metadata = {
  title: "CheeseBalloon",
  description:
    "치지직과 아프리카TV 방송인들의 주요 데이터들을 수집하여 제공합니다.",
  icons: {
    icon: "/svgs/cheese.png",
  },
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div style={{ paddingTop: "60px" }}></div>
      <div className="children">{children}</div>
    </>
  );
}
