"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import style from "./liveList.module.scss";
import LiveCard from "./liveCard";

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
  // console.log(`${API_URL}${query}`)
  const res = await fetch(`${API_URL}${query}`);

  return res.json();
}

export default function LiveList() {
  const [liveData, setLiveData] = useState<LiveInfo[]>([]);
  const [liveNum, setLiveNum] = useState<number>(20);
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

  return (
    <div className={style.wrapper}>
      {liveData &&
        liveData.slice(0, liveNum).map((liveinfo: LiveInfo, idx: number) => (
          <div className={style.livecard} key={idx}>
            <a
              href={liveinfo.streamUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={liveinfo.title}
              className={style.atag}
            >
              <LiveCard liveinfo={liveinfo} />
            </a>
          </div>
        ))}
    </div>
  );
}
