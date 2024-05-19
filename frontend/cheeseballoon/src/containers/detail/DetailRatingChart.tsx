"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "src/containers/detail/DetailRatingChart.module.scss";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type AlignType = "center";

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

export default function DetailRatingChart() {
  const { id, date } = useParams();
  const [ratingData, setRatingData] = useState<RatingDataType | null>(null);
  const [totalRatingArray, setTotalRatingArray] = useState<RatingArrayType>([
    1,
  ]);
  const [platformRatingArray, setplatformRatingArray] =
    useState<RatingArrayType>([1]);
  const [dateXaxis, setDateXaxis] = useState<DateArrayType | null>(["1"]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getData(id as string, date as string);
      const dailyData = responseData.data.dailyRates;
      const dates = dailyData.map((item: DailyRatingType) => item.date);
      const totalRatings = dailyData.map((item: DailyRatingType) => item.total);
      const platformRatings = dailyData.map(
        (item: DailyRatingType) => item.platform
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
      setTotalRatingArray(totalRatings);
      setplatformRatingArray(platformRatings);
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
      colors: ["#77B6EA", "#F8DB46"],
      markers: {
        size: 3,
      },
      legend: {
        show: true,
        labels: {
          colors: "white",
        },
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
          max: Math.max(Math.floor(Math.max(...platformRatingArray) * 1.5), 30),
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
    },

    series: [
      {
        name: "플랫폼 시청률",
        type: "line",
        data: platformRatingArray as number[],
      },
      {
        name: "통합 시청률",
        type: "line",
        data: totalRatingArray as number[],
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
            <div className={style["rating-title"]}>플랫폼 시청률</div>
            <div className={style["rating-cnt"]}>
              {ratingData.platformRating.toFixed(1)}%
            </div>
          </div>
          <div className={style["rating-container"]}>
            <div className={style["rating-title"]}>통합 시청률</div>
            <div className={style["rating-cnt"]}>
              {ratingData.totalRating.toFixed(1)}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
