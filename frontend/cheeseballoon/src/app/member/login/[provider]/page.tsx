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
  const state = searchParams.get("state");
  const googleTokenAPI = process.env.NEXT_PUBLIC_GOOGLE_TOKEN_API;
  const kakaoTokenAPI = process.env.NEXT_PUBLIC_KAKAO_TOKEN_API;
  const naverTokenAPI = process.env.NEXT_PUBLIC_NAVER_LOGIN_URL;
  const { accessToken, setAccessToken } = accessTokenState.getState();

  useEffect(() => {
    const getToken = async () => {
      try {
        let redirectUri = "";
        if (provider === "google") {
          redirectUri = `${googleTokenAPI}/code?code=${code}`;
        } else if (provider === "naver") {
          redirectUri = `${naverTokenAPI}/code?code=${code}&state=${state}`;
        } else if (provider === "kakao") {
          redirectUri = `${kakaoTokenAPI}/code?code=${code}`;
        }

        const response = await fetch(redirectUri);
        const data = await response.json();

        Cookies.set("refreshToken", data.data.refreshToken, {
          secure: true,
          sameSite: "strict",
        });

        setAccessToken(data.data.accessToken);

        router.push("/home");
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
    state,
    router,
    setAccessToken,
    accessToken,
    googleTokenAPI,
    kakaoTokenAPI,
    naverTokenAPI,
    provider,
  ]);

  return <div></div>;
}
