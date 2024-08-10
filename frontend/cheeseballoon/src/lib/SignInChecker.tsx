"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { accessTokenState, isSignInState } from "../stores/store";

const REFRESH_API_URL = process.env.NEXT_PUBLIC_REFRESH_API_URL;

export default function SignInChecker() {
  const pathname = usePathname();
  const params = useSearchParams();
  const setAccessToken = accessTokenState((state) => state.setAccessToken);
  const setIsSignIn = isSignInState((state) => state.setIsSignIn);

  useEffect(() => {
    async function getNewAccessToken() {
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) {
        setAccessToken(null);
        setIsSignIn(false);
        return null;
      }

      const response = await fetch(`${REFRESH_API_URL}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.data.accessToken);
        setIsSignIn(true);
        return null;
      }

      Cookies.remove("refreshToken");
      setAccessToken(null);
      setIsSignIn(false);
      return null;
    }
    getNewAccessToken();
  }, [pathname, params, setAccessToken, setIsSignIn]);

  return null;
}
