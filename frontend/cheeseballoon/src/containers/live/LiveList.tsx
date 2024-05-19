"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import style from "src/containers/live/LiveList.module.scss";
import LiveCard from "src/containers/live/LiveCard";

interface LiveInfo {
  streamerId: number;
  liveId: number;
  name: string;
  title: string;
  thumbnailUrl: string;
  platform: string;
  profileUrl: string;
  category: string;
  viewerCnt: number;
  streamUrl: string;
  channelUrl: string;
}

const API_URL = process.env.NEXT_PUBLIC_LIVE_API_URL;

async function getData(query: string) {
  const res = await fetch(`${API_URL}${query}`);

  return res.json();
}

export default function LiveList() {
  const [liveData, setLiveData] = useState<LiveInfo[] | null>(null);
  const [liveNum, setLiveNum] = useState<number>(36);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const query = searchParams.getAll("category");
      let newQuery;
      if (query.length > 0) {
        newQuery = `&categories=${query.join("&categories=")}`;
      } else {
        newQuery = "";
      }
      const data = await getData(newQuery);

      setLiveData(data.data);
    };
    fetchData();
  }, [searchParams]);

  const handleLiveNum = () => {
    setLiveNum(liveNum + 24);
  };

  return (
    <div className={style.wrapper}>
      {liveData && liveData.length > 0
        ? liveData.slice(0, liveNum).map((liveinfo: LiveInfo, idx: number) => (
            <div className={style.livecard} key={idx}>
              <LiveCard liveinfo={liveinfo} />
            </div>
          ))
        : liveData && (
            <div className={style["no-result-container"]}>
              <div className={style["no-result"]}>결과가 없습니다</div>
            </div>
          )}
      {liveData && liveData.length > liveNum && (
        <button type="button" className={style.plus} onClick={handleLiveNum}>
          +
        </button>
      )}
    </div>
  );
}
