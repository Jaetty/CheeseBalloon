"use client";

import style from "src/containers/ranking/rankingIndex.module.scss";
import DaySelect from "src/components/ranking/dayselect";
import PlatformSelect from "src/components/ranking/platformselect";
import Subrank from "src/components/ranking/subrank";
import SubrankAll from "src/components/ranking/subrankAll";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SubRankingData } from "src/types/type";

export default function Ranking() {
  const [date, setDate] = useState(1);
  const [platform, setPlatform] = useState("option1");
  const [num, setNum] = useState(1);

  const pathname = usePathname()?.split("/").pop() || "";
  const mapping: Record<string, string> = {
    follow: "팔로워 수",
    average: "평균 시청자 수",
    topview: "최고 시청자 수",
    time: "총 방송시간",
    rating: "시청률",
    live: "실시간 LIVE",
  };
  const [data, setData] = useState<SubRankingData>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LIVE_API}?offset=${num}&limit=15&date=${date}&platform=${platform}`
      );
      const newData = await response.json();
      setData(newData);
    };

    fetchData();
  }, [date, platform, num]);

  const subrankData = data && data.data?.slice(0, 3);
  const subrankAllData = data && data.data?.slice(3);

  return (
    <div className={style.ranking}>
      <p className={style.title}>{mapping[pathname]}</p>
      <div className={style.detail_menu}>
        <DaySelect setDate={setDate} />
        <PlatformSelect setPlatform={setPlatform} />
      </div>
      <Subrank data={subrankData} />
      <SubrankAll data={subrankAllData} />
    </div>
  );
}
