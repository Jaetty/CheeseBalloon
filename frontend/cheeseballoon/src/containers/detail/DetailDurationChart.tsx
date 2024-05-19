"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "src/containers/detail/DetailDurationChart.module.scss";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type AlignType = "center";

type TimeDataType = {
  totalTime: number;
  timeDiff: number;
  dailyTimes: [date: string, time: number];
};

type DateArrayType = string[];
type TimeArrayType = number[];
type DairyTimesType = {
  date: string;
  time: string;
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

export default function DetailDurationChart() {
  const { id, date } = useParams();
  const [timeData, setTimeData] = useState<TimeDataType | null>(null);
  const [timeArray, setTimeArray] = useState<TimeArrayType | null>([1]);
  // const [totalTimeArray, setTotalTimeArray] = useState<TimeArrayType | null>([
  //   1,
  // ]);
  // const [dateArray, setDateArray] = useState<DateArrayType | null>(null);
  const [dateXaxis, setDateXaxis] = useState<DateArrayType | null>(["1"]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getData(id as string, date as string);
      const dailyData = responseData.data.dailyTimes;
      const dates = dailyData.map((item: DairyTimesType) => item.date);
      const times = dailyData.map((item: DairyTimesType) =>
        parseInt(item.time, 10)
      );
      // const totalTime = () => {
      //   let timeSum = 0;
      //   const resultArray = [];
      //   for (let i = 0; i < times.length; i += 1) {
      //     timeSum += times[i];
      //     resultArray.push(timeSum);
      //   }
      //   return resultArray;
      // };
      const datesChange = dates.map((dateString: string) => {
        const parts = dateString.split("-");
        const [year, month, day] = parts.map(Number);
        const dateObj = new Date(year, month - 1, day);
        const dayOfWeek = dateObj.toLocaleDateString("ko-KR", {
          weekday: "short",
        });
        return `${year}.${month}.${day} (${dayOfWeek})`;
      });

      // setTotalTimeArray(totalTime());
      // setDateArray(dates);
      setTimeArray(times);
      setDateXaxis(datesChange);
      setTimeData(responseData.data);
    };
    fetchData();
  }, [id, date]);

  const chartData = {
    options: {
      title: {
        text: "방송시간",
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
          tickAmount: 5,
          labels: {
            style: {
              colors: "white",
              fontWeight: "bold",
            },
            formatter: (value: number) => `${value.toLocaleString()}시간`,
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
      legend: {
        labels: {
          colors: "white",
        },
      },
    },

    series: [
      {
        name: "방송시간",
        type: "bar",
        data: timeArray as number[],
      },
      // {
      //   name: "총 방송시간",
      //   type: "line",
      //   data: totalTimeArray as number[],
      // },
    ],
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <ApexChart
          type="line"
          options={chartData.options}
          series={chartData.series}
          height="325%"
          width="100%"
        />
      </div>
      {timeData && (
        <div className={style.time}>
          <div className={style["time-container"]}>
            <div className={style["time-title"]}>총 방송시간</div>
            <div className={style["time-cnt"]}>
              {timeData.totalTime.toLocaleString()}시간
            </div>
            <div
              className={`${style["time-diff"]} ${timeData.timeDiff >= 0 ? style.positive : style.negative}`}
            >
              {Math.abs(timeData.timeDiff).toLocaleString()}시간{" "}
              {timeData.timeDiff >= 0 ? "증가 ↑" : "감소 ↓"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
