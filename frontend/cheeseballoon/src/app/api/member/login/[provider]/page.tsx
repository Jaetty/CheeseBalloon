"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAccessToken } from "@/src/stores/store";

export default function KakaoRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const { accessToken, setAccessToken } = useAccessToken.getState();

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await fetch(`${redirectUri}/code?code=${code}`);
        const data = await response.json();

        Cookies.set("refreshToken", data.data.refreshToken, {
          secure: true,
          sameSite: "strict",
          httpOnly: true,
        });

        setAccessToken(data.data.accessToken);

        router.back();
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert("로그인이 실패했습니다");
        router.replace("/login");
      }
    };

    if (code) {
      getToken();
    }
  }, [code, redirectUri, router, setAccessToken, accessToken]);

  return <div></div>;
}
