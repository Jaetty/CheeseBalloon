"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import afreeca from "public/svgs/afreeca.svg";
import chzzk from "public/svgs/chzzk.svg";
import style from "src/containers/detail/DetailProfileContent.module.scss";

interface StreamerDataType {
  streamId: number;
  originId: string;
  name: string;
  profileUrl: string;
  streamUrl: string;
  followerCnt: number;
  platform: string;
  rank: number;
  diff: number;
  bookmark: boolean;
}
interface LiveDataType {
  live: boolean;
  streamerUrl: string;
  thumbnailUrl: string;
}

// 임시 데이터
// const data: StreamerDataType = {
//   streamId: 1234,
//   originId: "hanryang1125",
//   name: "풍월량",
//   profileUrl:
//     "https://nng-phinf.pstatic.net/MjAyMzEyMjBfNzgg/MDAxNzAyOTk5MDU4NTQ1.q74UANafs4egu_GflqIXrKZvqweabjdsqb3q7F-vEPEg.0DlZf3Myopu6ITUmTkOYLU-GKcBLotgKn61A0o9ZAN4g.PNG/7d354ef2-b2a8-4276-8c12-5be7f6301ae0-profile_image-600x600.png?type=f120_120_na",
//   streamUrl: "https://chzzk.naver.com/7ce8032370ac5121dcabce7bad375ced",
//   followerCnt: 178000,
//   platform: "치지직",
//   rank: 1,
//   diff: 3,
//   bookmark: false,
// };

const STREAMER_API_URL = process.env.NEXT_PUBLIC_STREAMER_API_URL;
const STREAMER_LIVE_API_URL = process.env.NEXT_PUBLIC_STREAMER_LIVE_API_URL;

async function getData(api: string, streamerId: string) {
  const res = await fetch(`${api}${streamerId}`);

  return res.json();
}

export default function DetailProfileContent() {
  const { id } = useParams();
  const [streamerData, setStreamerData] = useState<StreamerDataType | null>(
    null
  );
  const [liveData, setLiveData] = useState<LiveDataType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const streamerDataResponse = await getData(
        STREAMER_API_URL as string,
        id.toString()
      );
      const liveDataResponse = await getData(
        STREAMER_LIVE_API_URL as string,
        id.toString()
      );

      if ("data" in streamerDataResponse) {
        setStreamerData(streamerDataResponse.data);
      } else {
        router.push("/error");
      }

      if ("data" in liveDataResponse) {
        setLiveData(liveDataResponse.data);
      } else {
        router.push("/error");
      }
    };

    fetchData();
  }, [id, router]);

  return (
    streamerData && (
      <div className={style.wrapper}>
        <div className={style["image-container"]}>
          <img
            className={`${style["profile-image"]} ${liveData && liveData.live ? style.live : null}`}
            src={streamerData.profileUrl}
            alt="https://ssl.pstatic.net/cmstatic/nng/img/img_anonymous_square_gray_opacity2x.png?type=f120_120_na"
          />
        </div>
        <div>
          <div className={style["logo-and-name"]}>
            {streamerData.platform === "C" ? (
              <img className={style["platform-logo"]} src={chzzk.src} alt="" />
            ) : (
              <img
                className={style["platform-logo"]}
                src={afreeca.src}
                alt=""
              />
            )}
            <div className={style.name}>{streamerData.name}</div>
          </div>
        </div>
        <div className={style.rank}>
          <div className={style["rank-num"]}># {streamerData.rank}</div>
          <div
            className={`${style["rank-diff"]} ${streamerData.diff >= 0 ? style.positive : style.negative}`}
          >
            {streamerData.diff >= 0
              ? `(+${streamerData.diff})`
              : `(-${streamerData.diff})`}
          </div>
        </div>
      </div>
    )
  );
}
