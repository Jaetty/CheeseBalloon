"use client";

import userfill from "public/svgs/userfill.png";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { accessTokenState, isSignInState } from "@/src/stores/store";

export default function IsLogin() {
  const setAccessToken = accessTokenState((state) => state.setAccessToken);
  const setIsSignIn = isSignInState((state) => state.setIsSignIn);
  const isSignIn = isSignInState((state) => state.isSignIn);
  const router = useRouter();

  const handleLogin = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    if (isSignIn) {
      Cookies.remove("refreshToken");
      setAccessToken(null);
      setIsSignIn(false);
    } else {
      router.push(`/login`);
    }
  };

  return (
    <Image
      onClick={handleLogin}
      src={userfill}
      alt="User icon"
      width={30}
      height={30}
    />
  );
}
