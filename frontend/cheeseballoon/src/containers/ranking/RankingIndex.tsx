"use client";

import style from "src/containers/ranking/RankingIndex.module.scss";
import DaySelect from "src/components/ranking/DaySelect";
import PlatformSelect from "src/components/ranking/PlatformSelect";
import { useState, useEffect, useMemo } from "react";
import RankingIndex from "src/components/ranking/RankingIndex";
import { RankingData } from "src/types/type";
import Loading from "src/app/loading";
import decodetext from "src/lib/DecodeText";
import { usePopstate } from "src/lib/PopContext";
import { useToggleState, isMobileState } from "src/stores/store";
// import customFetch from "src/lib/CustomFetch";

export default function Ranking() {
  const [date, setDate] = useState(1);
  const [platform, setPlatform] = useState("T");
  const [loading, setLoading] = useState(true);
  const [chunkSize, setChunkSize] = useState(3);
  const { isPopstate, resetPopstate } = usePopstate();
  const { value, toggle } = useToggleState();
  const isMobile = isMobileState((state) => state.isMobile);
  const title = useMemo(
    () => [
      "팔로워 수",
      "평균 시청자 수",
      "최고 시청자 수",
      "총 방송시간",
      "시청률",
      "실시간 방송",
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
      case "실시간 방송":
        url = `${process.env.NEXT_PUBLIC_LIVE_RANK}?platform=${selectedPlatform}`;
        break;
      default:
        url = undefined;
    }
    if (url) {
      const response = await fetch(url);
      const data = await response.json();
      if (data?.data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.data = data.data.map((item: any) => ({
          ...item,
          name: decodetext(item.name),
        }));
      }
      return data;
    }
    return undefined;
  };

  const fetchAllData = async (
    selectedDate: number,
    selectedPlatform: string
  ) => {
    setLoading(true);
    const promises = title.map((titleItem) =>
      fetchRankingData(titleItem, selectedDate, selectedPlatform)
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

  useEffect(() => {
    const savedDate = isPopstate ? sessionStorage.getItem("selectedDate") : "1";
    const savedPlatform = isPopstate
      ? sessionStorage.getItem("selectedPlatform")
      : "T";
    if (savedDate !== null && savedPlatform !== null) {
      const parsedDate = parseInt(savedDate, 10);
      setDate(parsedDate);
      setPlatform(savedPlatform);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isPopstate) {
      sessionStorage.setItem("selectedDate", date.toString());
      sessionStorage.setItem("selectedPlatform", platform);
      fetchAllData(date, platform);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, platform, isPopstate]);

  useEffect(() => {
    if (isPopstate) {
      const savedDate = sessionStorage.getItem("selectedDate");
      const savedPlatform = sessionStorage.getItem("selectedPlatform");
      if (savedDate !== null && savedPlatform !== null) {
        const parsedDate = parseInt(savedDate, 10);
        fetchAllData(parsedDate, savedPlatform);
        setDate(parsedDate);
        setPlatform(savedPlatform);
        resetPopstate();
      } else {
        resetPopstate();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPopstate]);

  useEffect(() => {
    const handleResize = () => {
      const adjusted768 = 768 + (value ? 160 : 0);
      const adjusted1090 = 1210 + (value ? 160 : 0);
      const currentIsMobile = isMobileState.getState().isMobile;

      if (currentIsMobile) {
        setChunkSize(2);
      } else if (window.innerWidth < adjusted768) {
        setChunkSize(2);
      } else if (window.innerWidth < adjusted1090) {
        setChunkSize(2);
      } else {
        setChunkSize(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    const root = document.documentElement;

    if (isMobile) {
      // 모바일인 경우 항상 접힌 상태로 적용
      root.style.setProperty("--breakpoint-lg", "1210px");
      root.style.setProperty("--breakpoint-md", "768px");
    } else if (value) {
      // 네비게이션이 펼쳐졌을 때
      root.style.setProperty("--breakpoint-lg", "1370px");
      root.style.setProperty("--breakpoint-md", "835px");
    } else {
      // 네비게이션이 접혔을 때
      root.style.setProperty("--breakpoint-lg", "1210px");
      root.style.setProperty("--breakpoint-md", "768px");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

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
              <DaySelect date={date} setDate={setDate} />
              <PlatformSelect platform={platform} setPlatform={setPlatform} />
            </div>
          </div>
        </div>
        <div className={style.empty}> </div>
        <Loading />
      </>
    );
  }

  const chunks = [];
  for (let i = 0; i < title.length; i += chunkSize) {
    chunks.push(title.slice(i, i + chunkSize));
  }
  return (
    <div
      className={style.ranking}
      style={!isMobile && value ? { minWidth: "630px" } : {}}
    >
      <p className={style.title}>랭킹</p>
      <div className={style.wrapper}>
        <div className={style.subtitle}>
          정확한 데이터 수치는 더보기를 눌러 확인해주세요.
        </div>
        <div className={style.select_menu}>
          <DaySelect date={date} setDate={setDate} />
          <PlatformSelect platform={platform} setPlatform={setPlatform} />
        </div>
      </div>
      <div className={style.mobilewrapper}>
        {chunks.map((chunk, index) => (
          <div key={index} className={style.container}>
            {chunk.map((titleItem) => (
              <RankingIndex
                key={titleItem}
                title={titleItem}
                data={
                  isMobile
                    ? rankingData[titleItem]?.data.slice(0, 5)
                    : rankingData[titleItem]?.data.slice(0, 10)
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
