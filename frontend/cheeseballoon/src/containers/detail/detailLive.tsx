"use client";

import { useEffect, useState } from "react";
import style from "./detailLive.module.scss";

const API_URL = process.env.NEXT_PUBLIC_LIVE_CHECK_API_URL;

interface responseData {
  live: boolean;
  streamUrl: string;
  thumbnailUrl: string;
}

async function getData() {
  const res = await fetch(`${API_URL}1369`);

  return res.json();
}

// 임시 데이터
const d = {
  streamUrl: "https://chzzk.naver.com/live/75cbf189b3bb8f9f687d2aca0d0a382b",
  thumbnailUrl:
    "https://livecloud-thumb.akamaized.net/chzzk/livecloud/KR/stream/26464698/live/5166956/record/26622172/thumbnail/image_480.jpg?date=1712170800000",
};

export default function DetailLive() {
  const [liveData, setLiveData] = useState<responseData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setLiveData(data.data);
    };

    fetchData();
  }, []);

  return (
    <div className={style.wrapper}>
      {liveData && !liveData?.live ? (
        <div className={style.container}>
          <div className={style["image-container"]}>
            <a href={d.streamUrl} className={style.link} target="_blank" rel="noopener noreferrer">
              <img src={d.thumbnailUrl} alt="123" className={style.thumbnail} />
            </a>
          </div>
          <hr />
        </div>
      ) : null}
    </div>
  );
}
