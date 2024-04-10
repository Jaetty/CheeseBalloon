"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Error from "next/error";
import style from "./detailProfileContent.module.scss";

const STREAMER_API_URL = process.env.NEXT_PUBLIC_STREAMER_API_URL;

interface DetailProfileContentData {
  streamId: number;
  originId: string;
  name: string;
  profileUrl: string;
  streamUrl: string;
  followerCnt: number;
  platform: string;
  rank: number;
  diff: number;
}
interface liveDataType {
  live: boolean;
  streamUrl: string;
  thumbnailUrl: string;
}

// 임시 데이터
const data: DetailProfileContentData = {
  streamId: 1234,
  originId: "hanryang1125",
  name: "풍월량",
  profileUrl:
    "https://nng-phinf.pstatic.net/MjAyMzEyMjBfNzgg/MDAxNzAyOTk5MDU4NTQ1.q74UANafs4egu_GflqIXrKZvqweabjdsqb3q7F-vEPEg.0DlZf3Myopu6ITUmTkOYLU-GKcBLotgKn61A0o9ZAN4g.PNG/7d354ef2-b2a8-4276-8c12-5be7f6301ae0-profile_image-600x600.png?type=f120_120_na",
  streamUrl: "https://chzzk.naver.com/7ce8032370ac5121dcabce7bad375ced",
  followerCnt: 178000,
  platform: "치지직",
  rank: 1,
  diff: 3,
};

async function getData(streamerId: string) {
  const res = await fetch(`${STREAMER_API_URL}${streamerId}`);

  return res.json();
}

export default function DetailProfileContent() {
  const { id } = useParams();
  const [liveData, setLiveData] = useState<liveDataType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data2 = await getData(id.toString());

      if ("data" in data2) {
        setLiveData(data2.data);
      } else {
        router.push("/error");
      }
    };

    fetchData();
  }, [id, router]);

  return (
    <div className={style.wrapper}>
      <div className={style["image-container"]}>
        <img
          className={`${style["profile-image"]} ${liveData && liveData.live ? style.live : null}`}
          src={data.profileUrl}
          alt="https://ssl.pstatic.net/cmstatic/nng/img/img_anonymous_square_gray_opacity2x.png?type=f120_120_na"
        />
      </div>
      <div>
        <div className={style["logo-and-name"]}>
          <img
            className={style["platform-logo"]}
            src="https://ssl.pstatic.net/static/nng/glive/icon/favicon.png"
            alt=""
          />
          <div className={style.name}>{data.name}</div>
        </div>
      </div>
      <div className={style.rank}>
        <div className={style["rank-num"]}># {data.rank}</div>
        <div
          className={`${style["rank-diff"]} ${data.diff >= 0 ? style.positive : style.negative}`}
        >
          {data.diff >= 0 ? `(+${data.diff})` : `(-${data.diff})`}
        </div>
      </div>
    </div>
  );
}
