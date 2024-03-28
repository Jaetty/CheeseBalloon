"use client";

import { useEffect, useState } from "react";
import style from "./detailProfileContent.module.scss";

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

export default function DetailProfileContent() {
  return (
    <div className={style.wrapper}>
      <div className={style["image-container"]}>
        <img
          className={style["profile-image"]}
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
        {/* <div className={style.introduce}>프로필 소개</div> */}
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
