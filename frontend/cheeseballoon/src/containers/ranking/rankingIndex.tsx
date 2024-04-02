"use client";

import style from "src/containers/ranking/rankingIndex.module.scss";
import DaySelect from "src/components/ranking/dayselect";
import PlatformSelect from "src/components/ranking/platformselect";
import { useState, useEffect } from "react";
import RankingIndex from "src/components/ranking/rankingIndex";

export default function Ranking() {
  const [date, setDate] = useState(1);
  const [platform, setPlatform] = useState("option1");
  // 데이터 상태
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // 예: const response = await fetch(`api/data?date=${date}&platform=${platform}`);
  //     // const newData = await response.json();
  //     // setData(newData);
  //   };

  //   fetchData();
  // }, [date, platform]);
  return (
    <div className={style.ranking}>
      <p className={style.title}>랭킹</p>
      <div className={style.wrapper}>
        <div className={style.subtitle}>
          정확한 데이터 수치는 더보기를 눌러 확인해주세요.
        </div>
        <div className={style.select_menu}>
          <DaySelect setDate={setDate} />
          <PlatformSelect setPlatform={setPlatform} />
        </div>
      </div>
      <div className={style.container}>
        <RankingIndex />
        <RankingIndex />
        <RankingIndex />
      </div>
      <div className={style.container}>
        <RankingIndex />
        <RankingIndex />
        <RankingIndex />
      </div>
    </div>
  );
}
