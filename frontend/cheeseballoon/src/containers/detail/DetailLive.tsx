"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import anya from "public/svgs/anya2.jpg";
import style from "src/containers/detail/DetailLive.module.scss";

const API_URL = process.env.NEXT_PUBLIC_STREAMER_LIVE_API_URL;

interface liveDataType {
  live: boolean;
  streamerUrl: string;
  thumbnailUrl: string;
}

async function getData(streamerId: string) {
  const res = await fetch(`${API_URL}${streamerId}`);

  return res.json();
}

export default function DetailLive() {
  const [liveData, setLiveData] = useState<liveDataType | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(id.toString());
      setLiveData(data.data);
    };

    fetchData();
  }, [id]);

  return (
    <div className={style.wrapper}>
      {liveData && liveData.live && (
        <div className={style.container}>
          <div className={style["image-container"]}>
            <a
              href={liveData.streamerUrl}
              className={style.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={liveData.thumbnailUrl}
                alt="라이브"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.src = anya.src;
                }}
                className={style.thumbnail}
              />
            </a>
          </div>
          <hr />
        </div>
      )}
    </div>
  );
}
