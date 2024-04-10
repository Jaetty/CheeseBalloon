"use client";

import { useState } from "react";
import Image from "next/image";
import chzzkIcon from "public/svgs/chzzk.svg";
import afreecaIcon from "public/svgs/afreeca.svg";
import anya from "public/svgs/anya.jpg";
import blankProfile from "public/svgs/blank_profile.png";
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
  const [streamImageError, setStreamImageError] = useState<boolean>(false);
  const [profileImageError, setProfileImageError] = useState<boolean>(false);

  const handleOpenUrl = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={style.wrapper}
      onClick={() => handleOpenUrl(liveinfo.streamUrl)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          handleOpenUrl(liveinfo.streamUrl);
        }
      }}
    >
      <div className={style["first-container"]}>
        <img
          src={streamImageError ? anya.src : liveinfo.thumbnailUrl}
          alt="썸네일"
          onError={() => setStreamImageError(true)}
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
        <div
          role="button"
          tabIndex={0}
          className={style.name}
          onClick={(event) => {
            event.stopPropagation();
            handleOpenUrl(liveinfo.channelUrl);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleOpenUrl(liveinfo.channelUrl);
            }
          }}
        >
          {liveinfo.name}
        </div>
        <div className={style.category}>{liveinfo.category}</div>
      </div>
      <div className={style["third-container"]}>
        <div
          role="button"
          tabIndex={0}
          onClick={(event) => {
            event.stopPropagation();
            handleOpenUrl(liveinfo.channelUrl);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleOpenUrl(liveinfo.channelUrl);
            }
          }}
        >
          <img
            src={profileImageError ? blankProfile.src : liveinfo.profileUrl}
            alt="프로필"
            onError={() => setProfileImageError(true)}
            className={style.profile}
          />
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={(event) => {
            event.stopPropagation();
            handleOpenUrl(liveinfo.channelUrl);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleOpenUrl(liveinfo.channelUrl);
            }
          }}
          className={style.title}
        >
          {liveinfo.title}
        </div>
      </div>
      <div className={style["fourth-container"]}>
        <img src="/svgs/viewericon.svg" alt="" className={style.viewericon} />
        <div className={style.viewers}>{liveinfo.viewerCnt}</div>
      </div>
    </div>
  );
}
