"use client";

import style from "src/containers/ranking/RankingIndex.module.scss";
import DaySelect from "src/components/ranking/DaySelect";
import PlatformSelect from "src/components/ranking/PlatformSelect";
import { useState, useEffect, useMemo } from "react";
import RankingIndex from "src/components/ranking/RankingIndex";
import { RankingData } from "src/types/type";
import Loading from "src/app/loading";

export default function Ranking() {
  const [date, setDate] = useState(1);
  const [platform, setPlatform] = useState("T");
  const [loading, setLoading] = useState(true);
  const title = useMemo(
    () => [
      "팔로워 수",
      "평균 시청자 수",
      "최고 시청자 수",
      "총 방송시간",
      "시청률",
      "실시간 LIVE",
    ],
    []
  );
  const [rankingData, setRankingData] = useState<RankingData>({});
  const fetchRankingData = async (
    rankingTitle: string,
    selectedDate: number,
    selectedPlatform: string
  ) => {
    let url;
    switch (rankingTitle) {
      case "팔로워 수":
        url = `${process.env.NEXT_PUBLIC_FOLLOW_RANK}?date=${selectedDate}&platform=${selectedPlatform}`;
        break;
      case "평균 시청자 수":
        url = `${process.env.NEXT_PUBLIC_AVG_RANK}?date=${selectedDate}&platform=${selectedPlatform}`;
        break;
      case "최고 시청자 수":
        url = `${process.env.NEXT_PUBLIC_TOPVIEW_RANK}?date=${selectedDate}&platform=${selectedPlatform}`;
        break;
      case "총 방송시간":
        url = `${process.env.NEXT_PUBLIC_TIME_RANK}?date=${selectedDate}&platform=${selectedPlatform}`;
        break;
      case "시청률":
        url = `${process.env.NEXT_PUBLIC_RATING_RANK}?date=${selectedDate}&platform=${selectedPlatform}`;
        break;
      case "실시간 LIVE":
        url = `${process.env.NEXT_PUBLIC_LIVE_API}?offset=1&limit=10&date=${selectedDate}&platform=${selectedPlatform}`;
        break;
      default:
        url = undefined;
    }
    return url
      ? fetch(url).then((response) => response.json())
      : Promise.resolve(undefined);
  };

  useEffect(() => {
    setLoading(true);
    const fetchAllData = async () => {
      const promises = title.map((titleItem) =>
        fetchRankingData(titleItem, date, platform)
      );
      const results = await Promise.all(promises);
      const newRankingData = results.reduce((acc, data, index) => {
        if (data) {
          acc[title[index]] = data;
        }
        return acc;
      }, {});

      setRankingData(newRankingData);
      setLoading(false);
    };

    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, platform]);

  if (loading) {
    return (
      <>
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
        </div>
        <div className={style.empty}> </div>
        <Loading />
      </>
    );
  }

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
              <RankingIndex
                key={titleItem}
                title={titleItem}
                data={rankingData[titleItem]?.data.slice(0, 10)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
