"use client";

import style from "src/containers/ranking/RankingIndex.module.scss";
import DaySelect from "src/components/ranking/DaySelect";
import PlatformSelect from "src/components/ranking/PlatformSelect";
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
  LiveData,
} from "src/types/type";

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
    name: item.name,
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
    name: item.name,
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
    name: item.name,
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
  let result = parseInt(hr + min + sec, 10);
  if (isNegative) {
    result *= -1;
  }
  return result;
}

function transformTimeData(data: TimeRankData[]): RankingData[] {
  return data.map((item) => ({
    streamerId: item.streamerId,
    profileUrl: item.profileUrl,
    name: item.name,
    platform: item.platform,
    diff: timeConvert(item.diff),
    rankDiff: item.rankDiff,
    value: `${item.totalAirTime.substring(0, 2)}h ${item.totalAirTime.substring(3, 5)}m`,
    bookmark: item.bookmark,
  }));
}

function transformRatingData(data: RatingRankData[]): RankingData[] {
  return data.map((item) => ({
    streamerId: item.streamerId,
    profileUrl: item.profileUrl,
    name: item.name,
    platform: item.platform,
    diff: item.diff,
    rankDiff: item.rankDiff,
    value: `${item.rating.toFixed(2)} %`,
    bookmark: item.bookmark,
  }));
}

function transformLiveData(data: LiveData[]): RankingData[] {
  return data.map((item) => ({
    streamerId: item.streamId,
    profileUrl: item.profileUrl,
    name: item.name,
    platform: item.platform,
    diff: item.viewerCnt,
    value: item.title,
    category: item.category,
    streamUrl: item.streamUrl,
  }));
}
export default function Ranking() {
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
    let queryString = `date=${date}&platform=${platform}`;
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
        apiUrl = process.env.NEXT_PUBLIC_LIVE_API;
        queryString = `offset=1&limit=300&date=${date}&platform=${platform}`;
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
    setLoading(true);
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

  if (loading) {
    return (
      <>
        <div className={style.ranking}>
          <p className={style.title}>{mapping[pathname]}</p>
          {pathname !== "live" ? (
            <div className={style.detail_menu}>
              <DaySelect setDate={setDate} />
              <PlatformSelect setPlatform={setPlatform} />
            </div>
          ) : (
            <>
              <br></br>
              <br></br>
            </>
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
          <DaySelect setDate={setDate} />
          <PlatformSelect setPlatform={setPlatform} />
        </div>
      ) : (
        <>
          <br></br>
          <br></br>
        </>
      )}
      <TopThreeRanking data={subrankData as RankingData[]} />
      <RestRanking data={subrankAllData as RankingData[]} />
      {allDataLoaded && <p className={style.DataLoaded}></p>}
      <div id="bottom" style={{ height: "1px" }} />
    </div>
  );
}
