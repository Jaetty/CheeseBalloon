"use client";

import userfill from "public/svgs/userfill.png";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import {
  accessTokenState,
  isSignInState,
  isMobileState,
} from "@/src/stores/store";
import login from "public/svgs/login.svg";
import logout from "public/svgs/logout.svg";

export default function IsLogin() {
  const setAccessToken = accessTokenState((state) => state.setAccessToken);
  const setIsSignIn = isSignInState((state) => state.setIsSignIn);
  const isSignIn = isSignInState((state) => state.isSignIn);
  const isMobile = isMobileState((state) => state.isMobile); // isMobile 상태 가져오기
  const router = useRouter();

  const handleLogin = (e: MouseEvent<HTMLButtonElement | HTMLImageElement>) => {
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
    <div>
      {!isSignIn ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src={login}
            alt="login"
            width={23}
            height={23}
            onClick={handleLogin}
            style={{ cursor: "pointer" }}
          />
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {!isMobile && (
            <>
              <Image src={userfill} alt="User icon" width={30} height={30} />
              <span style={{ color: "white" }}>userName</span>
            </>
          )}
          <Image
            src={logout}
            alt="logout"
            width={23}
            height={23}
            onClick={handleLogin}
            style={{ cursor: "pointer" }}
          />
        </div>
      )}
    </div>
  );
}
