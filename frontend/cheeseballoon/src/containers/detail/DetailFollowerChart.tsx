"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import style from "src/containers/detail/DetailChart.module.scss";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type AlignType = "center";

type FollowerDataType = {
  data: [date: string, follower: number];
};

type DateArrayType = string[];
type FollowerArrayType = number[];
type DailyDataType = {
  date: string;
  follower: string;
};

const API_URL = process.env.NEXT_PUBLIC_FOLLOW_API_URL;

async function getData(streamerId: string, date: string) {
  let res;
  if (date) {
    res = await fetch(`${API_URL}streamerId=${streamerId}&date=${date}`);
  } else {
    res = await fetch(`${API_URL}streamerId=${streamerId}&date=1`);
  }

  return res.json();
}

export default function DetailFollowerChart() {
  const { id, date } = useParams();
  const [followerData, setFollowerData] = useState<FollowerDataType | null>(
    null
  );
  const [followerArray, setFollowerArray] = useState<FollowerArrayType>([1]);
  const [dateXaxis, setDateXaxis] = useState<DateArrayType | null>(["1"]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getData(id as string, date as string);
      const dailyData = responseData.data;
      const dates = dailyData.map((item: DailyDataType) => item.date);
      const followers = dailyData.map((item: DailyDataType) =>
        parseInt(item.follower, 10)
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
      setFollowerArray(followers);
      setDateXaxis(datesChange);
      setFollowerData(responseData.data);
    };
    fetchData();
  }, [id, date]);

  const chartData = {
    options: {
      title: {
        text: "팔로워",
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
            formatter: (value: number) => {
              if (value > 100000) {
                const formattedValue = (value / 10000).toFixed(1);
                return `${formattedValue}만명`;
              }
              return `${value.toLocaleString()}명`;
            },
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
        data: followerArray as number[],
      },
    ],
  };

  return (
    <div className={style.container}>
      <ApexChart
        type="line"
        options={chartData.options}
        series={chartData.series}
        height="265%"
        width="100%"
      />
    </div>
  );
}
