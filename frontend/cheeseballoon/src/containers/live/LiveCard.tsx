"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import customFetch from "@/src/lib/CustomFetch";
import chzzkIcon from "public/svgs/chzzk.svg";
import afreecaIcon from "@/src/stores/afreeca.ico";
import error from "public/svgs/no_image.jpg";
import blankProfile from "public/svgs/blank_profile.png";
import style from "./LiveCard.module.scss";

const VIEWLOG_API = process.env.NEXT_PUBLIC_VIEWLOG_API_URL;

interface LiveInfo {
  liveinfo: {
    streamerId: number;
    liveId: number;
    liveLogId: number;
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

  const handleQuery = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
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
    const data = { liveId: liveinfo.liveId, liveLogId: liveinfo.liveLogId };
    customFetch(`${VIEWLOG_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

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
      <div className={style["thumbnail-container"]}>
        <img
          src={liveinfo.thumbnailUrl}
          alt="썸네일"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = error.src;
          }}
          className={style.thumbnail}
        />
        <div className={style.viewers}>
          {liveinfo.viewerCnt.toLocaleString()}명 시청중
        </div>
      </div>
      <div className={style["contents-container"]}>
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
        <div className={style.contents}>
          <div
            role="button"
            tabIndex={0}
            title={liveinfo.title}
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
          <div className={style["platform-name-category"]}>
            {liveinfo.platform === "C" ? (
              <img
                src={chzzkIcon.src}
                alt=""
                className={style["platform-icon"]}
              />
            ) : (
              <img
                src={afreecaIcon.src}
                alt=""
                className={style["platform-icon"]}
              />
            )}
            <div
              role="button"
              tabIndex={0}
              className={style.name}
              onClick={(event) => {
                event.stopPropagation();
                router.push(`/detail/${liveinfo.streamerId}`);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  router.push(`/detail/${liveinfo.streamerId}`);
                }
              }}
            >
              {liveinfo.name}
            </div>
            {liveinfo.category.length > 0 && (
              <div
                role="button"
                tabIndex={0}
                className={style.category}
                onClick={(event) => {
                  event.stopPropagation();
                  handleQuery(event);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleQuery(event);
                  }
                }}
              >
                {liveinfo.category}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
