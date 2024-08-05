"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { isMobileState } from "@/src/stores/store";
import DetailRatingChart from "src/containers/detail/DetailRatingChart";
import styles from "./DetailRating.module.scss";

type RatingDataType = {
  totalRating: number;
  platformRating: number;
  dailyRates: [total: number, platform: number, date: string];
};

type DateArrayType = string[];
type RatingArrayType = number[];
type DailyRatingType = {
  total: number;
  platform: number;
  date: string;
};

const API_URL = process.env.NEXT_PUBLIC_RATING_API_URL;

async function getData(streamerId: string, date: string) {
  let res;
  if (date) {
    res = await fetch(`${API_URL}streamerId=${streamerId}&date=${date}`);
  } else {
    res = await fetch(`${API_URL}streamerId=${streamerId}&date=1`);
  }

  return res.json();
}

export default function DetailRating() {
  const { id, date } = useParams();
  const [ratingData, setRatingData] = useState<RatingDataType | null>(null);
  const [totalRatingArray, setTotalRatingArray] = useState<RatingArrayType>([]);
  const [platformRatingArray, setplatformRatingArray] =
    useState<RatingArrayType>([]);
  const [dateXaxis, setDateXaxis] = useState<DateArrayType | null>([]);
  const isMobile = isMobileState((state) => state.isMobile);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getData(id as string, date as string);
      const dailyData = responseData.data.dailyRates;
      const dates = dailyData.map((item: DailyRatingType) => item.date);
      const totalRatings = dailyData.map((item: DailyRatingType) => item.total);
      const platformRatings = dailyData.map(
        (item: DailyRatingType) => item.platform
      );

      setTotalRatingArray(totalRatings);
      setplatformRatingArray(platformRatings);
      setDateXaxis(dates);
      setRatingData(responseData.data);
    };
    fetchData();
  }, [id, date]);

  const maxYaxis = () => {
    const maxRating = Math.max(...platformRatingArray);

    switch (true) {
      case maxRating < 0.05:
        return 0.05;
      case maxRating < 0.1:
        return 0.1;
      case maxRating < 0.5:
        return 0.5;
      case maxRating < 1:
        return 1;
      case maxRating < 5:
        return 5;
      case maxRating < 10:
        return 10;
      case maxRating < 25:
        return 25;
      default:
        return Math.max(Math.floor(maxRating), 30);
    }
  };

  return (
    ratingData &&
    (isMobile ? (
      <div className={styles.wrapper}>
        <div className={styles.rating}>
          <div className={styles["rating-container"]}>
            <div className={styles["rating-title"]}>플랫폼 시청률</div>
            <div className={styles["rating-cnt"]}>
              {ratingData.platformRating.toFixed(1)}%
            </div>
          </div>
          <div className={styles["rating-container"]}>
            <div className={styles["rating-title"]}>통합 시청률</div>
            <div className={styles["rating-cnt"]}>
              {ratingData.totalRating.toFixed(1)}%
            </div>
          </div>
        </div>
        <DetailRatingChart
          totalRatingArray={totalRatingArray}
          platformRatingArray={platformRatingArray}
          dateXaxis={dateXaxis}
          maxYaxis={maxYaxis}
        />
      </div>
    ) : (
      <div className={styles.wrapper}>
        <DetailRatingChart
          totalRatingArray={totalRatingArray}
          platformRatingArray={platformRatingArray}
          dateXaxis={dateXaxis}
          maxYaxis={maxYaxis}
        />
        <div className={styles.rating}>
          <div className={styles["rating-container"]}>
            <div className={styles["rating-title"]}>플랫폼 시청률</div>
            <div className={styles["rating-cnt"]}>
              {ratingData.platformRating.toFixed(1)}%
            </div>
          </div>
          <div className={styles["rating-container"]}>
            <div className={styles["rating-title"]}>통합 시청률</div>
            <div className={styles["rating-cnt"]}>
              {ratingData.totalRating.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    ))
  );
}
