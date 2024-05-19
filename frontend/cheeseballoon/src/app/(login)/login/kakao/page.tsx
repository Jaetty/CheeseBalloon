"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function KakaoRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  // console.log(code);

  useEffect(() => {
    fetch(`${redirectUri}/code?code=${code}`, {
      method: "GET", //
    })
      .then((response) => response.json())
      .then((data) => {
        router.push("/");
      })
      .catch((error) => {
        // console.error("오류 발생", error); //
      });
  }, [code, redirectUri, router]);

  return (
    <div>
      <h1>로그인 중입니다.</h1>
      <h1>로그인 중입니다.</h1>
      <h1>로그인 중입니다.</h1>
      <h1>로그인 중입니다.</h1>
    </div>
  );
}
