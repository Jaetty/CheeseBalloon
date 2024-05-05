"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./detailRatingChart.module.scss";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type AlignType = "center";

type RatingDataType = {
  avgRating: number;
  dailyRates: [date: string, rating: number];
};

type DateArrayType = string[];
type RatingArrayType = number[];
type DailyRatingType = {
  date: string;
  rating: string;
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

export default function DetailRatingChart() {
  const { id, date } = useParams();
  const [ratingData, setRatingData] = useState<RatingDataType | null>(null);
  const [ratingArray, setRatingArray] = useState<RatingArrayType>([1]);
  const [dateXaxis, setDateXaxis] = useState<DateArrayType | null>(["1"]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getData(id as string, date as string);
      const dailyData = responseData.data.dailyRates;
      const dates = dailyData.map((item: DailyRatingType) => item.date);
      const ratings = dailyData.map((item: DailyRatingType) =>
        parseInt(item.rating, 10)
      );
      const datesChange = dates.map((dateString: string) => {
        const parts = dateString.split("-");
        const [year, month, day] = parts.map(Number);
        const dateObj = new Date(year, month - 1, day);
        const dayOfWeek = dateObj.toLocaleDateString("ko-KR", {
          weekday: "short",
        });
        return `${year}.${month}.${day} (${dayOfWeek})`;
      });
      setRatingArray(ratings);
      setDateXaxis(datesChange);
      setRatingData(responseData.data);
    };
    fetchData();
  }, [id, date]);

  const chartData = {
    options: {
      title: {
        text: "시청률",
        align: "center" as AlignType,
        style: {
          fontSize: "15px",
          fontWeight: "bold",
          color: "white",
        },
      },
      chart: {
        animations: {
          enabled: false,
        },
        toolbar: {
          show: false,
          tools: {
            download: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
          },
        },
      },
      markers: {
        size: 3,
      },
      xaxis: {
        categories: dateXaxis,
        labels: {
          style: {
            colors: "white",
            fontWeight: "bold",
          },
        },
      },
      yaxis: [
        {
          min: 0,
          max: Math.max(Math.floor(Math.max(...ratingArray) * 1.5), 30),
          tickAmount: 5,
          labels: {
            style: {
              colors: "white",
              fontWeight: "bold",
            },
            formatter: (value: number) => `${value}%`,
          },
        },
      ],
      grid: {
        show: true,
        strokeDashArray: 5,
        borderColor: "#bcbcbc",
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      colors: ["#F0BD53"],
    },

    series: [
      {
        name: "시청률",
        type: "line",
        data: ratingArray as number[],
      },
    ],
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <ApexChart
          type="line"
          options={chartData.options}
          series={chartData.series}
          height="215%"
          width="100%"
        />
      </div>
      {ratingData && (
        <div className={style.rating}>
          <div className={style["rating-container"]}>
            <div className={style["rating-title"]}>최고 시청률</div>
            <div className={style["rating-cnt"]}>
              {Math.max(...ratingArray)}%
            </div>
          </div>
          <div className={style["rating-container"]}>
            <div className={style["rating-title"]}>평균 시청률</div>
            <div className={style["rating-cnt"]}>{ratingData.avgRating}%</div>
          </div>
        </div>
      )}
    </div>
  );
}
