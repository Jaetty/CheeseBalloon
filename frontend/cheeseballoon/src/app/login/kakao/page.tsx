"use client";
// import { useNavigate } from "react-router-dom";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function KakaoRedirect() {
  // const navigate = useNavigate();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  console.log(code);

  useEffect(() => {
    fetch(
      `https://cheeseballoon.site/api/member/login/kakao/code?code=${code}`,
      {
        method: "GET", //
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("오류 발생", error); //
      });
  }, []);

  return (
    <div>
      <h1>로그인 중입니다.</h1>
      <h1>로그인 중입니다.</h1>
      <h1>로그인 중입니다.</h1>
      <h1>로그인 중입니다.</h1>
    </div>
  );
}
