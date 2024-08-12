"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { accessTokenState } from "@/src/stores/store";

export default function KakaoRedirect() {
  const router = useRouter();
  const { provider } = useParams();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const googleRedirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
  const kakaoRedirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const { accessToken, setAccessToken } = accessTokenState.getState();

  useEffect(() => {
    const getToken = async () => {
      try {
        let redirectUri;
        if (provider === "google") {
          redirectUri = googleRedirectUri;
        } else if (provider === "kakao") {
          redirectUri = kakaoRedirectUri;
        }
        const response = await fetch(`${redirectUri}/code?code=${code}`);
        const data = await response.json();

        Cookies.set("refreshToken", data.data.refreshToken, {
          secure: true,
          sameSite: "strict",
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
  }, [
    code,
    router,
    setAccessToken,
    accessToken,
    googleRedirectUri,
    kakaoRedirectUri,
    provider,
  ]);

  return <div></div>;
}
