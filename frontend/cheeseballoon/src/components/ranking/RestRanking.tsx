"use client";

import style from "src/components/ranking/RestRanking.module.scss";
import Image from "next/image";
import aflogo from "public/svgs/afreeca.svg";
import chzlogo from "public/svgs/chzzk.svg";
import nofav from "public/svgs/nofav.svg";
import fav from "public/svgs/fav.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import noimage from "public/svgs/blank_profile.png";
import { useState, useEffect } from "react";
import ArrowUp from "public/svgs/uparrow.png";
import ArrowDown from "public/svgs/downarrow.png";

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
};

type Props = {
  data: RankingData[] | undefined;
};

function noop() {}

const fixProfileUrl = (url: string) => {
  if (url === "default" || url === "None") {
    return noimage.src;
  }
  if (url.startsWith("//")) {
    return `https:${url}`;
  }
  return url;
};

export default function RestRanking({ data }: Props) {
  const pathname = usePathname()?.split("/").pop() || "";
  const [updatedUrls, setUpdatedUrls] = useState<Record<number, string>>({});
  const [bookmarks, setBookmarks] = useState<Record<number, boolean>>({});

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
      setBookmarks(initialBookmarks);
    }
  }, [data]);

  const handleImageError = async (id: number) => {
    try {
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
    } catch (error) {
      noop();
    }
  };

  const toggleBookmark = (id: number) => {
    setBookmarks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className={style.container}>
      {data &&
        data.map((item, index) => (
          <div key={index} className={style.subitem}>
            <div className={style.index}>{index + 4}</div>
            {pathname === "live" ? (
              <>
                <div className={style.livenameinfo}>
                  <div className={style.image}>
                    <Link href={`/detail/${item.streamerId}`}>
                      <Image
                        src={updatedUrls[item.streamerId] || noimage.src}
                        alt=""
                        width={48}
                        height={48}
                        onError={() => handleImageError(item.streamerId)}
                      />
                    </Link>
                  </div>
                  <div className={style.livename}>
                    <Link
                      href={`/detail/${item.streamerId}`}
                      className={style.link}
                    >
                      {item.name}
                    </Link>
                    <span className={style.logo}>
                      {item.platform === "A" || item.platform === "S" ? (
                        <Image src={aflogo} alt="" width={14} height={14} />
                      ) : (
                        <Image src={chzlogo} alt="" width={15} height={15} />
                      )}
                    </span>
                  </div>
                </div>

                <div className={style.livetitleinfo}>
                  <Link
                    href={item.streamUrl || ""}
                    className={style.link}
                    target="_blank"
                  >
                    {item.value}
                  </Link>
                </div>
                <div className={style.livesubinfo}>{item.category}</div>
                <div className={style.liveinfo}>
                  {item.diff.toLocaleString()} 명
                </div>
                <div className={style.livefav}>
                  <Image
                    src={bookmarks[item.streamerId] ? fav : nofav}
                    alt=""
                    width={20}
                    height={20}
                    onClick={() => toggleBookmark(item.streamerId)}
                    role="presentation"
                  />
                </div>
              </>
            ) : (
              <>
                <div className={style.nameinfo}>
                  <div className={style.image}>
                    <Link href={`/detail/${item.streamerId}`}>
                      <Image
                        src={updatedUrls[item.streamerId] || noimage.src}
                        alt=""
                        width={48}
                        height={48}
                        onError={() => handleImageError(item.streamerId)}
                      />
                    </Link>
                  </div>
                  <div className={style.name}>
                    <Link
                      href={`/detail/${item.streamerId}`}
                      className={style.link}
                    >
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
                        <div className={style.zero}>( - )</div>
                      )}
                    </div>
                  )}
                </div>
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
                          {`${String(Math.abs(item.diff)).slice(0, 2)}h ${String(Math.abs(item.diff)).slice(2, 4)}m`}
                          )
                        </span>
                      )}
                      {item.diff < 0 && (
                        <span className={style.negative}>
                          (-{" "}
                          {`${String(Math.abs(item.diff)).slice(0, 2)}h ${String(Math.abs(item.diff)).slice(2, 4)}m`}
                          )
                        </span>
                      )}
                      {item.diff === 0 && (
                        <span className={style.zero}>( - )</span>
                      )}
                    </>
                  )}{" "}
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
                <div className={style.fav}>
                  <Image
                    src={bookmarks[item.streamerId] ? fav : nofav}
                    alt=""
                    width={20}
                    height={20}
                    onClick={() => toggleBookmark(item.streamerId)}
                    role="presentation"
                  />
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
}
