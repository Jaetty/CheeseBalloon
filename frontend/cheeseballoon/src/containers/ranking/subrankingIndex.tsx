"use client";

import style from "src/containers/ranking/rankingIndex.module.scss";
import DaySelect from "src/components/ranking/dayselect";
import PlatformSelect from "src/components/ranking/platformselect";
import Subrank from "src/components/ranking/subrank";
import SubrankAll from "src/components/ranking/subrankAll";
import { useState, useEffect } from "react";

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
      <p className={style.title}>팔로워 수</p>
      <div className={style.detail_menu}>
        <DaySelect setDate={setDate} />
        <PlatformSelect setPlatform={setPlatform} />
      </div>
      <Subrank />
      <SubrankAll />
    </div>
  );
}
