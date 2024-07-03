"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import style from "src/containers/detail/DetailSummaryContent.module.scss";

interface SummaryContentData {
  avgViewer: number;
  viewerDiff: number;
  totalAirTime: number;
  timeDiff: number;
  follow: number;
  followDiff: number;
  rating: number;
  ratingDiff: number;
}

const SUMMARY_API_URL = process.env.NEXT_PUBLIC_SUMMARY_API_URL;

async function getData(streamerId: string) {
  const res = await fetch(`${SUMMARY_API_URL}${streamerId}`);

  return res.json();
}

export default function DetailSummaryContent() {
  const [summaryData, setSummaryData] = useState<SummaryContentData | null>(
    null
  );
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getData(id.toString());
      setSummaryData(responseData.data);
    };

    fetchData();
  }, [id]);

  const contentBox = (name: string, num: number, diff: number) => {
    let mod: string = "%";
    let updown: string = "상승";

    switch (name) {
      case "평균 시청자수":
        mod = "명";
        if (diff >= 0) {
          updown = "상승 ↑";
        } else {
          updown = "하락 ↓";
        }
        break;
      case "평균 방송시간":
        mod = "시간";
        if (diff >= 0) {
          updown = "증가 ↑";
        } else {
          updown = "감소 ↓";
        }
        break;
      case "팔로워":
        mod = "명";
        if (diff >= 0) {
          updown = "상승 ↑";
        } else {
          updown = "하락 ↓";
        }
        break;
      case "평균 시청률":
        mod = "%";
        if (diff >= 0) {
          updown = "상승 ↑";
        } else {
          updown = "하락 ↓";
        }
        break;
      default:
        break;
    }

    return (
      <div className={style.content}>
        <div>
          <div className={style["content-name"]}>{name}</div>
          <div className={style["content-num"]}>
            {num.toLocaleString()}
            {mod}
          </div>
          <div
            className={`${style["content-diff"]} ${diff >= 0 ? style.positive : style.negative}`}
          >
            {Math.abs(diff).toLocaleString()}
            {mod} {updown}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={style.wrapper}>
      {summaryData && (
        <div className={style.container}>
          {contentBox(
            "평균 시청자수",
            summaryData.avgViewer,
            summaryData.viewerDiff
          )}
          {contentBox(
            "평균 방송시간",
            Math.floor((summaryData.totalAirTime / 3600) * 10) / 10,
            Math.floor((summaryData.timeDiff / 3600) * 10) / 10
          )}
          {contentBox("팔로워", summaryData.follow, summaryData.followDiff)}
          {contentBox(
            "평균 시청률",
            summaryData.rating,
            summaryData.ratingDiff
          )}
        </div>
      )}
    </div>
  );
}
