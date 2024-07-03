"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import error from "public/svgs/no_image.jpg";
import styles from "src/containers/detail/DetailLive.module.scss";
import onAir from "src/stores/on_air.png";

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
    <div className={styles.wrapper}>
      {liveData && liveData.live && (
        <div className={styles.container}>
          <div className={styles["image-container"]}>
            <a
              href={liveData.streamerUrl}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={liveData.thumbnailUrl}
                alt="라이브"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.src = error.src;
                }}
                className={styles.thumbnail}
              />
              <div className={styles["on-air-box"]}>
                <img
                  src={onAir.src}
                  alt="on_air"
                  className={styles["on-air"]}
                />
              </div>
            </a>
          </div>
          <hr />
        </div>
      )}
    </div>
  );
}
