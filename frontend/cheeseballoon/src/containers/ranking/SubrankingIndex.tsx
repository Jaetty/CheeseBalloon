"use client";

import style from "src/containers/ranking/RankingIndex.module.scss";
import DaySelect from "src/components/ranking/SubDaySelect";
import PlatformSelect from "src/components/ranking/SubPlatformSelect";
import TopThreeRanking from "src/components/ranking/TopThreeRank";
import RestRanking from "src/components/ranking/RestRanking";
import Loading from "src/app/loading";
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
import decodetext from "src/lib/DecodeText";
import { usePopstate } from "src/lib/PopContext";

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

function transformFollowData(data: FollowRankData[]): RankingData[] {
  return data.map((item) => ({
    streamerId: item.streamerId,
    profileUrl: item.profileUrl,
    name: decodetext(item.name),
    platform: item.platform,
    diff: item.diff,
    rankDiff: item.rankDiff,
    value: `${item.follower.toLocaleString()} 명`,
    bookmark: item.bookmark,
  }));
}

function transformTopviewData(data: TopviewRankData[]): RankingData[] {
  return data.map((item) => ({
    streamerId: item.streamerId,
    profileUrl: item.profileUrl,
    name: decodetext(item.name),
    platform: item.platform,
    diff: item.diff,
    rankDiff: item.rankDiff,
    value: `${item.topViewer.toLocaleString()} 명`,
    bookmark: item.bookmark,
  }));
}

function transformAvgData(data: AvgRankData[]): RankingData[] {
  return data.map((item) => ({
    streamerId: item.streamerId,
    profileUrl: item.profileUrl,
    name: decodetext(item.name),
    platform: item.platform,
    diff: item.diff,
    rankDiff: item.rankDiff,
    value: `${item.averageViewer.toLocaleString()} 명`,
    bookmark: item.bookmark,
  }));
}

function timeConvert(timeString: string): number {
  const isNegative = timeString.startsWith("-");
  const [hr, min, sec] = timeString.replace("-", "").split(":");
  const hoursInSeconds = parseInt(hr, 10) * 3600;
  const minutesInSeconds = parseInt(min, 10) * 60;
  const seconds = parseInt(sec, 10);
  let result = hoursInSeconds + minutesInSeconds + seconds;
  if (result < 6) {
    return 0;
  }
  if (isNegative) {
    result *= -1;
  }
  return result;
}

function transformTimeData(data: TimeRankData[]): RankingData[] {
  return data.map((item) => {
    const [hours, minutes] = item.totalAirTime.split(":");
    return {
      streamerId: item.streamerId,
      profileUrl: item.profileUrl,
      name: decodetext(item.name),
      platform: item.platform,
      diff: timeConvert(item.diff),
      rankDiff: item.rankDiff,
      value: `${hours}h ${minutes}m`,
      bookmark: item.bookmark,
    };
  });
}

function transformRatingData(data: RatingRankData[]): RankingData[] {
  return data.map((item) => ({
    streamerId: item.streamerId,
    profileUrl: item.profileUrl,
    name: decodetext(item.name),
    platform: item.platform,
    diff: item.diff,
    rankDiff: item.rankDiff,
    value: `${item.rating.toFixed(2)} %`,
    bookmark: item.bookmark,
  }));
}

function transformLiveData(data: LiveRankData[]): RankingData[] {
  return data.map((item) => ({
    streamerId: item.streamerId,
    profileUrl: item.profileUrl,
    name: decodetext(item.name),
    platform: item.platform,
    diff: item.viewerCnt,
    value: decodetext(item.title),
    category: decodetext(item.category),
    streamUrl: item.streamUrl,
    bookmark: item.bookmark,
  }));
}

export default function SubRanking() {
  const [date, setDate] = useState(1);
  const [platform, setPlatform] = useState("T");
  const [num, setNum] = useState(1);
  const [data, setData] = useState<RankingData[] | undefined>();
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [subrankAllData, setSubRankAllData] = useState<
    RankingData[] | undefined
  >();
  const pathname = usePathname()?.split("/").pop() || "";
  const { isPopstate, resetPopstate } = usePopstate();
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

  const fetchData = async (selectedDate: number, selectedPlatform: string) => {
    let apiUrl;
    let queryString = `date=${selectedDate}&platform=${selectedPlatform}`;
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
      case "time":
        apiUrl = process.env.NEXT_PUBLIC_TIME_RANK;
        break;
      case "rating":
        apiUrl = process.env.NEXT_PUBLIC_RATING_RANK;
        break;
      case "live":
        apiUrl = process.env.NEXT_PUBLIC_LIVE_RANK;
        queryString = `platform=${selectedPlatform}`;
        break;
      default:
        apiUrl = process.env.NEXT_PUBLIC_AVG_RANK;
        break;
    }
    const response = await fetch(`${apiUrl}?${queryString}`);
    const newData = await response.json();
    let transformedData: RankingData[];
    switch (pathname) {
      case "follow":
        transformedData = transformFollowData(newData.data);
        break;
      case "topview":
        transformedData = transformTopviewData(newData.data);
        break;
      case "time":
        transformedData = transformTimeData(newData.data);
        break;
      case "rating":
        transformedData = transformRatingData(newData.data);
        break;
      case "live":
        transformedData = transformLiveData(newData.data);
        break;
      default:
        transformedData = transformAvgData(newData.data);
        break;
    }

    setData(transformedData);
    setNum(1);
    setLoading(false);
  };

  useEffect(() => {
    const savedDate = isPopstate
      ? sessionStorage.getItem("subSelectedDate")
      : "1";
    const savedPlatform = isPopstate
      ? sessionStorage.getItem("subSelectedPlatform")
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
      sessionStorage.setItem("subSelectedDate", date.toString());
      sessionStorage.setItem("subSelectedPlatform", platform);
      fetchData(date, platform);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, platform, isPopstate]);

  useEffect(() => {
    if (isPopstate) {
      const savedDate = sessionStorage.getItem("subSelectedDate");
      const savedPlatform = sessionStorage.getItem("subSelectedPlatform");
      if (savedDate !== null && savedPlatform !== null) {
        const parsedDate = parseInt(savedDate, 10);
        fetchData(parsedDate, savedPlatform).then(() => {
          setDate(parsedDate);
          setPlatform(savedPlatform);
          resetPopstate();
        });
      } else {
        resetPopstate();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPopstate]);

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

  if (loading) {
    return (
      <>
        <div className={style.ranking}>
          <p className={style.title}>{mapping[pathname]}</p>
          {pathname !== "live" ? (
            <div className={style.detail_menu}>
              <DaySelect date={date} setDate={setDate} />
              <PlatformSelect platform={platform} setPlatform={setPlatform} />
            </div>
          ) : (
            <div className={style.detail_menu}>
              <PlatformSelect platform={platform} setPlatform={setPlatform} />
            </div>
          )}
        </div>
        <Loading />
        <div className={style.empty}> </div>
      </>
    );
  }

  return (
    <div className={style.ranking}>
      <p className={style.title}>{mapping[pathname]}</p>
      {pathname !== "live" ? (
        <div className={style.detail_menu}>
          <DaySelect date={date} setDate={setDate} />
          <PlatformSelect platform={platform} setPlatform={setPlatform} />
        </div>
      ) : (
        <div className={style.detail_menu}>
          <PlatformSelect platform={platform} setPlatform={setPlatform} />
        </div>
      )}
      <TopThreeRanking data={subrankData as RankingData[]} />
      <RestRanking data={subrankAllData as RankingData[]} />
      {allDataLoaded && <p className={style.DataLoaded}></p>}
      <div id="bottom" style={{ height: "1px" }} />
    </div>
  );
}
