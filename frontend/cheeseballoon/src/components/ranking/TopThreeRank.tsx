"use client";

import { useState, useEffect } from "react";
import style from "src/components/ranking/TopThree.module.scss";
import Image from "next/image";
import aflogo from "src/stores/afreeca.ico";
import chzlogo from "public/svgs/chzzk.svg";
import first from "public/svgs/1st.svg";
import second from "public/svgs/2nd.svg";
import third from "public/svgs/3rd.svg";
import fav from "public/svgs/fav.svg";
import nofav from "public/svgs/nofav.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import noimage from "public/svgs/blank_profile.png";
import ArrowUp from "public/svgs/uparrow.png";
import ArrowDown from "public/svgs/downarrow.png";
import { useNotification } from "src/lib/NotificationContext";
import customFetch from "src/lib/CustomFetch";
import { isSignInState } from "src/stores/store";

type RankingData = {
  streamerId: number;
  profileUrl: string;
  name: string;
  platform: string;
  diff: number;
  rankDiff?: number;
  value: string;
  category?: string;
  streamUrl?: string;
  bookmark?: boolean;
  liveId?: number;
  liveLogId?: number;
};

type Props = {
  data: RankingData[] | undefined;
};

const fixProfileUrl = (url: string) => {
  if (url === "default" || url === "None") {
    return noimage.src;
  }
  if (url.startsWith("//")) {
    return `https:${url}`;
  }
  return url;
};

export default function TopThreeRanking({ data }: Props) {
  const reorderedData = data && [data[1], data[0], data[2]];
  const rankImages = [second, first, third];
  const pathname = usePathname()?.split("/").pop() || "";
  const { showNotification } = useNotification();
  const [updatedUrls, setUpdatedUrls] = useState<Record<number, string>>({});
  const [bookmarkState, setBookmarkState] = useState<Record<number, boolean>>(
    {}
  );
  const isSign = isSignInState((state) => state.isSignIn);

  const handleImageError = async (id: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PF_UPDATE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ streamer_id: id }),
    });
    const datas = await response.json();
    const newProfileUrl = datas.detail.profile_url;
    if (newProfileUrl) {
      setUpdatedUrls((prev) => ({
        ...prev,
        [id]: fixProfileUrl(newProfileUrl),
      }));
    }
  };

  const handleLinkClick = async (item: RankingData) => {
    await customFetch(`${process.env.NEXT_PUBLIC_MYPAGE_VIEW}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        liveId: item.liveId,
        liveLogId: item.liveLogId,
      }),
    });
  };

  const toggleBookmark = async (item: RankingData) => {
    if (!isSign) {
      // eslint-disable-next-line no-alert
      alert("로그인이 필요한 서비스입니다");
      return;
    }

    try {
      let response;
      if (bookmarkState[item.streamerId]) {
        // eslint-disable-next-line no-restricted-globals, no-alert
        if (!confirm("삭제하시겠습니까?")) return;
        response = await customFetch(
          `${process.env.NEXT_PUBLIC_MYPAGE_DBOOK}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              streamerId: item.streamerId,
            }),
          }
        );
      } else {
        response = await customFetch(`${process.env.NEXT_PUBLIC_MYPAGE_BOOK}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            streamerId: item.streamerId,
          }),
        });
      }

      if (response && response.status === 401) {
        // eslint-disable-next-line no-alert
        alert("로그인이 필요한 서비스입니다");
        return;
      }

      showNotification(
        bookmarkState[item.streamerId]
          ? "즐겨찾기가 삭제되었습니다."
          : "즐겨찾기가 추가되었습니다."
      );

      setBookmarkState((prev) => ({
        ...prev,
        [item.streamerId]: !prev[item.streamerId],
      }));
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert("로그인이 필요한 서비스입니다");
    }
  };

  useEffect(() => {
    if (data) {
      const initialUrls = data.reduce(
        (acc, item) => {
          acc[item.streamerId] = fixProfileUrl(item.profileUrl);
          return acc;
        },
        {} as Record<number, string>
      );
      setUpdatedUrls(initialUrls);

      const initialBookmarks = data.reduce(
        (acc, item) => {
          acc[item.streamerId] = item.bookmark || false;
          return acc;
        },
        {} as Record<number, boolean>
      );
      setBookmarkState(initialBookmarks);
    }
  }, [data]);

  return (
    <div className={style.wrapper}>
      {reorderedData &&
        reorderedData.map((item, index) => (
          <div key={index} className={style.box}>
            <div className={style.image}>
              <Link href={`/detail/${item.streamerId}`}>
                <div className={style.imageWrapper}>
                  <Image
                    src={updatedUrls[item.streamerId] || noimage.src}
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 6vw, 70px"
                    onError={() => handleImageError(item.streamerId)}
                  />
                </div>
              </Link>
            </div>
            <div className={style.rankimage}>
              <Image src={rankImages[index]} alt="" width={28} height={28} />
            </div>
            <div className={style.favimage}>
              <Image
                src={bookmarkState[item.streamerId] ? fav : nofav}
                alt=""
                width={20}
                height={20}
                onClick={() => toggleBookmark(item)}
                role="presentation"
              />
            </div>
            <div className={style.name}>
              <Link href={`/detail/${item.streamerId}`} className={style.link}>
                {item.name}
              </Link>{" "}
              {item.platform === "A" || item.platform === "S" ? (
                <Image src={aflogo} alt="" width={14} height={14} />
              ) : (
                <Image src={chzlogo} alt="" width={14} height={14} />
              )}
            </div>
            {item.rankDiff !== undefined && (
              <div className={style.rank}>
                {item.rankDiff > 0 && (
                  <>
                    <Image src={ArrowUp} alt="" width={7} height={12} />
                    <span>{Math.abs(item.rankDiff)}</span>
                  </>
                )}
                {item.rankDiff < 0 && (
                  <>
                    <Image src={ArrowDown} alt="" width={7} height={12} />
                    <span>{Math.abs(item.rankDiff)}</span>
                  </>
                )}
                {item.rankDiff === 0 && (
                  <div className={style.mainzero}>( - )</div>
                )}
              </div>
            )}
            {pathname === "live" ? (
              <div>
                <div className={style.liveinfo}>
                  <div className={style.content1}>
                    <Link
                      href={`/live?category=${item.category}`}
                      className={style.link}
                    >
                      {item.category}
                    </Link>
                  </div>
                  <div className={style.content2}>
                    {item.diff.toLocaleString()} 명
                  </div>
                </div>
                <div className={style.info2}>
                  <Link
                    href={item.streamUrl || ""}
                    className={style.link}
                    target="_blank"
                    onClick={() => handleLinkClick(item)}
                  >
                    {item.value}
                  </Link>
                </div>
              </div>
            ) : (
              <div className={style.info}>
                {item.value}{" "}
                {pathname === "rating" && (
                  <>
                    {item.diff > 0 && (
                      <span className={style.positive}>
                        (+ {Math.abs(item.diff).toFixed(2)})
                      </span>
                    )}
                    {item.diff < 0 && (
                      <span className={style.negative}>
                        (- {Math.abs(item.diff).toFixed(2)})
                      </span>
                    )}
                    {item.diff === 0 && (
                      <span className={style.zero}>( - )</span>
                    )}
                  </>
                )}
                {pathname === "time" && (
                  <>
                    {item.diff > 0 && (
                      <span className={style.positive}>
                        (+{" "}
                        {`${Math.floor(Math.abs(item.diff) / 3600)
                          .toString()
                          .padStart(2, "0")}h ${Math.floor(
                          (Math.abs(item.diff) % 3600) / 60
                        )
                          .toString()
                          .padStart(2, "0")}m`}
                        )
                      </span>
                    )}
                    {item.diff < 0 && (
                      <span className={style.negative}>
                        (-{" "}
                        {`${Math.floor(Math.abs(item.diff) / 3600)
                          .toString()
                          .padStart(2, "0")}h ${Math.floor(
                          (Math.abs(item.diff) % 3600) / 60
                        )
                          .toString()
                          .padStart(2, "0")}m`}
                        )
                      </span>
                    )}
                    {item.diff === 0 && (
                      <span className={style.zero}>( - )</span>
                    )}
                  </>
                )}
                {pathname !== "rating" && pathname !== "time" && (
                  <>
                    {item.diff > 0 && (
                      <span className={style.positive}>
                        (+ {Math.abs(item.diff).toLocaleString()})
                      </span>
                    )}
                    {item.diff < 0 && (
                      <span className={style.negative}>
                        (- {Math.abs(item.diff).toLocaleString()})
                      </span>
                    )}
                    {item.diff === 0 && (
                      <span className={style.zero}>( - )</span>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
