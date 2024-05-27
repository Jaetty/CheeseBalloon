"use client";

import style from "src/components/ranking/TopThree.module.scss";
import Image from "next/image";
import aflogo from "public/svgs/afreeca.svg";
import chzlogo from "public/svgs/chzzk.svg";
import first from "public/svgs/1st.svg";
import second from "public/svgs/2nd.svg";
import third from "public/svgs/3rd.svg";
import nofav from "public/svgs/nofav.svg";
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
  value2?: string;
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

export default function TopThreeRanking({ data }: Props) {
  const reorderedData = data && [data[1], data[0], data[2]];
  const rankImages = [second, first, third];
  const pathname = usePathname()?.split("/").pop() || "";
  const [updatedUrls, setUpdatedUrls] = useState<Record<number, string>>({});

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
    }
  }, [data]);

  return (
    <div className={style.wrapper}>
      {reorderedData &&
        reorderedData.map((item, index) => (
          <div key={index} className={style.box}>
            <div className={style.image}>
              <Link href={`/detail/${item.streamerId}`}>
                <Image
                  src={updatedUrls[item.streamerId] || noimage.src}
                  alt=""
                  width={70}
                  height={70}
                  onError={() => handleImageError(item.streamerId)}
                />
              </Link>
            </div>
            <div className={style.rankimage}>
              <Image src={rankImages[index]} alt="" width={28} height={28} />
            </div>
            <div className={style.favimage}>
              <Image src={nofav} alt="" width={20} height={20} />
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
            <div className={style.info}>
              {pathname === "live" ? (
                <>
                  {/* <div className={style.content}>
                    <div>{item.value2}</div> */}
                  {item.diff.toLocaleString()} 명
                  {/* </div>
                  <div>{item.value}</div> */}
                </>
              ) : (
                <>
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
                  {item.diff === 0 && <span className={style.zero}>( - )</span>}
                </>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
