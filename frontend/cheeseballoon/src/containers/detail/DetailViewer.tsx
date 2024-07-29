"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { isMobileState } from "@/src/stores/store";
import DetailViewerChart from "src/containers/detail/DetailViewerChart";
import styles from "./DetailViewer.module.scss";

type ViewerDataType = {
  maxViewer: number;
  maxDiff: number;
  avgViewer: number;
  avgDiff: number;
  dailyAvgViewers: [date: string, viewer: number, maxViewer: number];
};

type DateArrayType = string[];
type ViewerArrayType = number[];
type dailyViewersType = {
  date: string;
  viewer: number;
  maxViewer: number;
};

const API_URL = process.env.NEXT_PUBLIC_VIEWER_API_URL;

async function getData(streamerId: string, date: string) {
  let res;
  if (date) {
    res = await fetch(`${API_URL}streamerId=${streamerId}&date=${date}`);
  } else {
    res = await fetch(`${API_URL}streamerId=${streamerId}&date=1`);
  }

  return res.json();
}

export default function DetailViewer() {
  const { id, date } = useParams();
  const [viewerData, setViewerData] = useState<ViewerDataType | null>(null);
  const [avgViewerArray, setAvgViewerArray] = useState<ViewerArrayType>([]);
  const [maxViewerArray, setMaxViewerArray] = useState<ViewerArrayType>([]);
  const [dateXaxis, setDateXaxis] = useState<DateArrayType | null>([]);
  const isMobile = isMobileState((state) => state.isMobile);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getData(id as string, date as string);
      const dailyData = responseData.data.dailyAvgViewers;
      const dates = dailyData.map((item: dailyViewersType) => item.date);
      const avgViewers = dailyData.map((item: dailyViewersType) =>
        item.viewer === 0 ? null : item.viewer
      );
      const maxViewers = dailyData.map(
        (item: dailyViewersType) => item.maxViewer
      );

      setAvgViewerArray(avgViewers);
      setMaxViewerArray(maxViewers);
      setDateXaxis(dates);
      setViewerData(responseData.data);
    };
    fetchData();
  }, [id, date]);

  const maxYaxis = () => {
    const maxViewer = viewerData?.maxViewer;

    if (maxViewer !== undefined) {
      switch (true) {
        case maxViewer < 20:
          return 20;
        case maxViewer < 100:
          return 100;
        case maxViewer < 250:
          return 250;
        case maxViewer < 500:
          return 500;
        case maxViewer < 1000:
          return 1000;
        case maxViewer < 2500:
          return 2500;
        default:
          return Math.ceil(maxViewer / 5000) * 5000;
      }
    } else {
      return 100000;
    }
  };

  return (
    viewerData &&
    (isMobile ? (
      <div className={styles.wrapper}>
        <div className={styles.viewer}>
          <div className={styles["viewer-container"]}>
            <div className={styles["viewer-title"]}>최고 시청자수</div>
            <div className={styles["viewer-cnt"]}>
              {viewerData.maxViewer.toLocaleString()}명
            </div>
            <div
              className={`${styles["viewer-diff"]} ${viewerData.maxDiff >= 0 ? styles.positive : styles.negative}`}
            >
              {Math.abs(viewerData.maxDiff).toLocaleString()}명{" "}
              {viewerData.maxDiff >= 0 ? "상승 ↑" : "하락 ↓"}
            </div>
          </div>
          <div className={styles["viewer-container"]}>
            <div className={styles["viewer-title"]}>평균 시청자수</div>
            <div className={styles["viewer-cnt"]}>
              {viewerData.avgViewer.toLocaleString()}명
            </div>
            <div
              className={`${styles["viewer-diff"]} ${viewerData.avgDiff >= 0 ? styles.positive : styles.negative}`}
            >
              {Math.abs(viewerData.avgDiff).toLocaleString()}명{" "}
              {viewerData.avgDiff >= 0 ? "상승 ↑" : "하락 ↓"}
            </div>
          </div>
        </div>
        <div className={styles.chart}>
          <DetailViewerChart
            avgViewerArray={avgViewerArray}
            maxViewerArray={maxViewerArray}
            maxYaxis={maxYaxis}
            dateXaxis={dateXaxis}
          />
        </div>
      </div>
    ) : (
      <div className={styles.wrapper}>
        <div className={styles.chart}>
          <DetailViewerChart
            avgViewerArray={avgViewerArray}
            maxViewerArray={maxViewerArray}
            maxYaxis={maxYaxis}
            dateXaxis={dateXaxis}
          />
        </div>
        <div className={styles.viewer}>
          <div className={styles["viewer-container"]}>
            <div className={styles["viewer-title"]}>최고 시청자수</div>
            <div className={styles["viewer-cnt"]}>
              {viewerData.maxViewer.toLocaleString()}명
            </div>
            <div
              className={`${styles["viewer-diff"]} ${viewerData.maxDiff >= 0 ? styles.positive : styles.negative}`}
            >
              {Math.abs(viewerData.maxDiff).toLocaleString()}명{" "}
              {viewerData.maxDiff >= 0 ? "상승 ↑" : "하락 ↓"}
            </div>
          </div>
          <div className={styles["viewer-container"]}>
            <div className={styles["viewer-title"]}>평균 시청자수</div>
            <div className={styles["viewer-cnt"]}>
              {viewerData.avgViewer.toLocaleString()}명
            </div>
            <div
              className={`${styles["viewer-diff"]} ${viewerData.avgDiff >= 0 ? styles.positive : styles.negative}`}
            >
              {Math.abs(viewerData.avgDiff).toLocaleString()}명{" "}
              {viewerData.avgDiff >= 0 ? "상승 ↑" : "하락 ↓"}
            </div>
          </div>
        </div>
      </div>
    ))
  );
}
