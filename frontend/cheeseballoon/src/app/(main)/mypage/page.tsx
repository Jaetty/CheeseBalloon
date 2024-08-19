"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Mypage from "src/containers/mypage/MyIndex";
import { accessTokenState } from "src/stores/store";
import customFetch from "src/lib/CustomFetch";

export default function MyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem("accessToken");

      if (!token) {
        // eslint-disable-next-line no-alert
        alert("로그인이 필요한 서비스입니다");
        router.push("/home");
        return;
      }

      try {
        const response = await customFetch(
          `${process.env.NEXT_PUBLIC_VALIDATE_TOKEN_API}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Invalid token");
        }

        setLoading(false);
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert("로그인이 필요한 서비스입니다");
        router.push("/home");
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return null;
  }

  return (
    <div>
      <Mypage />
    </div>
  );
}
