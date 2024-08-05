"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { isMobileState } from "@/src/stores/store";
import DetailDurationChart from "src/containers/detail/DetailDurationChart";
import styles from "./DetailDuration.module.scss";

type XaxisType = "datetime";

type TimeDataType = {
  totalTime: number;
  timeDiff: number;
  dailyTimes: [date: string, totalAirTime: number];
};

type DateArrayType = string[];
type TimeArrayType = number[];
type DairyTimesType = {
  date: string;
  totalAirTime: string;
};

const API_URL = process.env.NEXT_PUBLIC_TIME_API_URL;

async function getData(streamerId: string, date: string) {
  let res;
  if (date) {
    res = await fetch(`${API_URL}streamerId=${streamerId}&date=${date}`);
  } else {
    res = await fetch(`${API_URL}streamerId=${streamerId}&date=1`);
  }

  return res.json();
}

export default function DetailDuration() {
  const { id, date } = useParams();
  const [timeData, setTimeData] = useState<TimeDataType | null>(null);
  const [timeArray, setTimeArray] = useState<TimeArrayType>([]);
  const [dateXaxis, setDateXaxis] = useState<DateArrayType>([]);
  const isMobile = isMobileState((state) => state.isMobile);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getData(id as string, date as string);
      const dailyData = responseData.data.dailyTimes;
      const dates = dailyData.map((item: DairyTimesType) => item.date);
      const times = dailyData.map((item: DairyTimesType) =>
        parseInt(item.totalAirTime, 10) === 0
          ? null
          : Math.floor((parseInt(item.totalAirTime, 10) / 3600) * 10) / 10
      );
      const datesChange = dates.map((dateString: string) => {
        const parts = dateString.split("-");
        const [year, month, day] = parts.map(Number);
        const dateObj = new Date(year, month - 1, day);
        const dayOfWeek = dateObj.toLocaleDateString("ko-KR", {
          weekday: "short",
        });
        return `${month}.${day} (${dayOfWeek})`;
      });
      setTimeArray(times);
      setDateXaxis(dates);
      setTimeData(responseData.data);
    };
    fetchData();
  }, [id, date]);

  return (
    timeData &&
    (isMobile ? (
      <div className={styles.wrapper}>
        <div className={styles.time}>
          <div className={styles["time-container"]}>
            <div className={styles["time-title"]}>총 방송시간</div>
            <div className={styles["time-cnt"]}>
              {(
                Math.floor((timeData.totalTime / 3600) * 10) / 10
              ).toLocaleString()}
              시간
            </div>
            <div
              className={`${styles["time-diff"]} ${timeData.timeDiff >= 0 ? styles.positive : styles.negative}`}
            >
              {(
                Math.floor((timeData.timeDiff / 3600) * 10) / 10
              ).toLocaleString()}
              시간 {timeData.timeDiff >= 0 ? "증가 ↑" : "감소 ↓"}
            </div>
          </div>
        </div>
        <DetailDurationChart timeArray={timeArray} dateXaxis={dateXaxis} />
      </div>
    ) : (
      <div className={styles.wrapper}>
        <DetailDurationChart timeArray={timeArray} dateXaxis={dateXaxis} />
        <div className={styles.time}>
          <div className={styles["time-container"]}>
            <div className={styles["time-title"]}>총 방송시간</div>
            <div className={styles["time-cnt"]}>
              {(
                Math.floor((timeData.totalTime / 3600) * 10) / 10
              ).toLocaleString()}
              시간
            </div>
            <div
              className={`${styles["time-diff"]} ${timeData.timeDiff >= 0 ? styles.positive : styles.negative}`}
            >
              {(
                Math.floor((timeData.timeDiff / 3600) * 10) / 10
              ).toLocaleString()}
              시간 {timeData.timeDiff >= 0 ? "증가 ↑" : "감소 ↓"}
            </div>
          </div>
        </div>
      </div>
    ))
  );
}
