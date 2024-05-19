import type { Metadata } from "next";
import "src/styles/globals.css";

export const metadata: Metadata = {
  title: "Login",
  description: "치즈벌룬 로그인 페이지입니다.",
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
