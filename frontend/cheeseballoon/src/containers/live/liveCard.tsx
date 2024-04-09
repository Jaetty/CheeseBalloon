"use client";

import { useState } from "react";
import Image from "next/image";
import chzzkIcon from "public/svgs/chzzk.svg";
import afreecaIcon from "public/svgs/afreeca.svg";
import anya from "public/svgs/anya.jpg";
import style from "./liveCard.module.scss";

interface LiveInfo {
  liveinfo: {
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
  };
}

export default function LiveCard({ liveinfo }: LiveInfo) {
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <div className={style.wrapper}>
      <div className={style["first-container"]}>
        <img
          src={imageError ? anya.src : liveinfo.thumbnailUrl}
          alt="썸네일"
          onError={() => setImageError(true)}
          className={style.thumbnail}
        />
      </div>
      <div className={style["second-container"]}>
        <div className={style["platform-icon"]}>
          {liveinfo.platform === "C" ? (
            <Image src={chzzkIcon} alt="" />
          ) : (
            <Image src={afreecaIcon} alt="" />
          )}
        </div>
        <a
          href={liveinfo.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={style.name}
        >
          {liveinfo.name}
        </a>
        <div className={style.category}>{liveinfo.category}</div>
      </div>
      <div className={style["third-container"]}>
        <a href={liveinfo.channelUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={liveinfo.profileUrl}
            alt="프로필"
            className={style.profile}
          />
        </a>
        <a
          href={liveinfo.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={style.title}
        >
          {liveinfo.title}
        </a>
      </div>
      <div className={style["fourth-container"]}>
        <img src="/svgs/viewericon.svg" alt="" className={style.viewericon} />
        <div className={style.viewers}>{liveinfo.viewerCnt}</div>
      </div>
    </div>
  );
}
