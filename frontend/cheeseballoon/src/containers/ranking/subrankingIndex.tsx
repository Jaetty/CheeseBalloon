"use client";

import style from "src/containers/ranking/rankingIndex.module.scss";
import DaySelect from "src/components/ranking/dayselect";
import PlatformSelect from "src/components/ranking/platformselect";
import Subrank from "src/components/ranking/subrank";
import SubrankAll from "src/components/ranking/subrankAll";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { SubRankingData } from "src/types/type";

export default function Ranking() {
  const [date, setDate] = useState(1);
  const [platform, setPlatform] = useState("option1");
  const [num, setNum] = useState(1);
  const [data, setData] = useState<SubRankingData>();
  const [loading, setLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
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
  const subrankData = data && data.data?.slice(0, 3);
  const subrankAllData = data && data.data?.slice(3);

  useEffect(() => {
    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting && !loading && !allDataLoaded) {
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
  }, [subrankAllData, loading, allDataLoaded]);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LIVE_API}?offset=${num}&limit=15&date=${date}&platform=${platform}`
    );
    const newData = await response.json();
    if (
      newData.data.length === 0 ||
      (data?.data.length && data.data.length >= 300)
    ) {
      setAllDataLoaded(true);
    } else {
      setData((prevData) => {
        if (prevData) {
          return {
            ...prevData,
            data: [...prevData.data, ...newData.data],
          };
        }
        return {
          data: newData.data,
          status: newData.status,
          message: newData.message,
        };
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [date, platform, num]);

  return (
    <div className={style.ranking}>
      <p className={style.title}>{mapping[pathname]}</p>
      <div className={style.detail_menu}>
        <DaySelect setDate={setDate} />
        <PlatformSelect setPlatform={setPlatform} />
      </div>
      <Subrank data={subrankData} />
      <SubrankAll data={subrankAllData} />
      {allDataLoaded && <p className={style.DataLoaded}></p>}
      <div id="bottom" style={{ height: "1px" }} />
    </div>
  );
}
