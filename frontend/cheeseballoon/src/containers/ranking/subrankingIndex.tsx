"use client";

import style from "src/containers/ranking/rankingIndex.module.scss";
import DaySelect from "src/components/ranking/dayselect";
import PlatformSelect from "src/components/ranking/platformselect";
import Subrank from "src/components/ranking/subrank";
import FollowSubrank from "src/components/ranking/subfollowrank";
import FollowSubrankAll from "src/components/ranking/subfollowrankall";
import TopViewSubrank from "src/components/ranking/subtopviewrank";
import TopViewSubrankAll from "src/components/ranking/subtopviewrankall";
import SubrankAll from "src/components/ranking/subrankAll";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  FollowRankData,
  AvgRankData,
  TopviewRankData,
  TimeRankData,
  RatingRankData,
  LiveRankData,
} from "src/types/type";

export default function Ranking() {
  const [date, setDate] = useState(1);
  const [platform, setPlatform] = useState("T");
  const [num, setNum] = useState(1);
  const [data, setData] = useState<
    | FollowRankData[]
    | AvgRankData[]
    | TopviewRankData[]
    | TimeRankData[]
    | RatingRankData[]
    | LiveRankData[]
    | undefined
  >();
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [subrankAllData, setSubRankAllData] = useState<
    | FollowRankData[]
    | AvgRankData[]
    | TopviewRankData[]
    | TimeRankData[]
    | RatingRankData[]
    | LiveRankData[]
    | undefined
  >();
  const pathname = usePathname()?.split("/").pop() || "";
  const mapping: Record<string, string> = {
    follow: "팔로워 수",
    average: "평균 시청자 수",
    topview: "최고 시청자 수",
    time: "총 방송시간",
    rating: "시청률",
    live: "실시간 LIVE",
  };

  const observer = useRef<IntersectionObserver | null>(null);
  const subrankData = data?.slice(0, 3);

  useEffect(() => {
    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting && !allDataLoaded) {
        setNum((prevNum) => prevNum + 1);
      }
    };
    observer.current = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });
    if (subrankAllData && subrankAllData.length > 0) {
      observer.current.observe(document.querySelector("#bottom")!);
    }
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [subrankAllData, allDataLoaded]);

  const fetchData = async () => {
    let apiUrl;
    switch (pathname) {
      case "follow":
        apiUrl = process.env.NEXT_PUBLIC_FOLLOW_RANK;
        break;
      case "average":
        apiUrl = process.env.NEXT_PUBLIC_AVG_RANK;
        break;
      case "topview":
        apiUrl = process.env.NEXT_PUBLIC_TOPVIEW_RANK;
        break;
      default:
        apiUrl = process.env.NEXT_PUBLIC_AVG_RANK;
        break;
    }
    const response = await fetch(`${apiUrl}?date=${date}&platform=${platform}`);
    const newData = await response.json();
    setData(newData.data);
    setNum(1);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, platform]);

  useEffect(() => {
    if (num === 1 && data) {
      setSubRankAllData(data?.slice(3, 15));
    } else if (num > 1 && data) {
      const maxDataLength = 300;
      const newDataSliceEnd = Math.min(15 + num * 15, maxDataLength);
      const newDataSlice = data?.slice(3, newDataSliceEnd);
      setSubRankAllData(newDataSlice);
    }
  }, [num, data]);

  return (
    <div className={style.ranking}>
      <p className={style.title}>{mapping[pathname]}</p>
      <div className={style.detail_menu}>
        <DaySelect setDate={setDate} />
        <PlatformSelect setPlatform={setPlatform} />
      </div>
      {pathname === "follow" && (
        <>
          <FollowSubrank data={subrankData as FollowRankData[]} />
          <FollowSubrankAll data={subrankAllData as FollowRankData[]} />
        </>
      )}

      {pathname === "topview" && (
        <>
          <TopViewSubrank data={subrankData as TopviewRankData[]} />
          <TopViewSubrankAll data={subrankAllData as TopviewRankData[]} />
        </>
      )}

      {pathname !== "follow" && pathname !== "topview" && (
        <>
          <Subrank data={subrankData as AvgRankData[]} />
          <SubrankAll data={subrankAllData as AvgRankData[]} />
        </>
      )}
      {allDataLoaded && <p className={style.DataLoaded}></p>}
      <div id="bottom" style={{ height: "1px" }} />
    </div>
  );
}
