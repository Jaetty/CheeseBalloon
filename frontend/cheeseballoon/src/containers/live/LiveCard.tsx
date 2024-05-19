"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import chzzkIcon from "public/svgs/chzzk.svg";
import afreecaIcon from "public/svgs/afreeca.svg";
import anya from "public/svgs/anya.jpg";
import blankProfile from "public/svgs/blank_profile.png";
import style from "src/containers/live/LiveCard.module.scss";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.getAll("category");
  const [profileImageError, setProfileImageError] = useState<boolean>(false);

  const handleQuery = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (query.length >= 10) {
      return;
    }

    const newCategory = e.currentTarget.textContent;
    let newQuery;
    if (newCategory && !query.includes(newCategory)) {
      if (query.length > 0) {
        newQuery = `${query.join("&category=")}&category=${newCategory}`;
      } else {
        newQuery = newCategory;
      }
      const newPath = `${pathname}?category=${newQuery}`;
      router.push(newPath);
    }
  };

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
          src={liveinfo.thumbnailUrl}
          alt="썸네일"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = anya.src;
          }}
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
        {liveinfo.category.length > 0 && (
          <button
            className={style.category}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleQuery(event);
            }}
          >
            {liveinfo.category}
          </button>
        )}
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
            handleOpenUrl(liveinfo.streamUrl);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleOpenUrl(liveinfo.streamUrl);
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
