"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Mypage from "src/containers/mypage/MyIndex";
import { useAlertStore } from "src/stores/store";
import customFetch from "src/lib/CustomFetch";
import { FavState } from "src/types/type";

export default function MyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<FavState[]>([]);
  const showAlert = useAlertStore((state) => state.showAlert);

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      const token = sessionStorage.getItem("accessToken");

      if (!token) {
        showAlert("로그인이 필요한 서비스입니다");
        router.push("/home");
        return;
      }

      try {
        const response = await customFetch(
          `${process.env.NEXT_PUBLIC_MYPAGE_BOOK}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Invalid token");
        }

        const responseData = await response.json();

        if (responseData.data.length > 0) {
          const sortedData = responseData.data.sort(
            (a: FavState, b: FavState) => b.followerCnt - a.followerCnt
          );
          setData(sortedData);
        } else {
          setData([]);
        }

        setLoading(false);
      } catch (error) {
        showAlert("로그인이 필요한 서비스입니다");
        router.push("/home");
      }
    };

    checkAuthAndFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  if (loading) {
    return null;
  }

  return (
    <div>
      <Mypage data={data} />
    </div>
  );
}
