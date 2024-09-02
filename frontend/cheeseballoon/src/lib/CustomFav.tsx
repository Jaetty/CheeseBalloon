import { useState, useEffect } from "react";
import customFetch from "src/lib/CustomFetch";
import { FavState } from "src/types/type";

export default function useFavData() {
  const [favData, setFavData] = useState<FavState[] | null>(null);

  const fetchData = async () => {
    const response = await customFetch(
      `${process.env.NEXT_PUBLIC_MYPAGE_BOOK}`,
      {
        method: "GET",
      }
    );

    if (response && response.status === 401) {
      setFavData(null);
      return;
    }

    const responseData = await response.json();
    const sortedData = responseData.data.sort((a: FavState, b: FavState) => {
      if (a.isLive === b.isLive) {
        return b.followerCnt - a.followerCnt;
      }
      return a.isLive ? -1 : 1;
    });

    setFavData(sortedData);
    // eslint-disable-next-line no-console
    console.log("Updated favData:", sortedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { favData, fetchData };
}
