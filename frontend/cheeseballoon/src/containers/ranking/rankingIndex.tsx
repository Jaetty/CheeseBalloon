"use client";

import style from "src/containers/ranking/rankingIndex.module.scss";
import DaySelect from "src/components/ranking/dayselect";
import PlatformSelect from "src/components/ranking/platformselect";
import { useState, useEffect } from "react";
import RankingIndex from "src/components/ranking/rankingIndex";

export default function Ranking() {
  const [date, setDate] = useState(1);
  const [platform, setPlatform] = useState("option1");
  const title: (
    | "팔로워 수"
    | "평균 시청자 수"
    | "최고 시청자 수"
    | "총 방송시간"
    | "시청률"
    | "실시간 LIVE"
  )[] = [
    "팔로워 수",
    "평균 시청자 수",
    "최고 시청자 수",
    "총 방송시간",
    "시청률",
    "실시간 LIVE",
  ];

  const chunkSize = 3;
  const chunks = [];
  for (let i = 0; i < title.length; i += chunkSize) {
    chunks.push(title.slice(i, i + chunkSize));
  }
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
      <div>
        {chunks.map((chunk, index) => (
          <div key={index} className={style.container}>
            {chunk.map((titleItem) => (
              <RankingIndex key={titleItem} title={titleItem} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
