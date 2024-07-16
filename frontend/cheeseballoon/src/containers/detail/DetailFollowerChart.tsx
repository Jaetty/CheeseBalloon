"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import style from "src/containers/detail/DetailFollowerChart.module.scss";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type AlignType = "center";
type XaxisType = "datetime"


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
  const [followerArray, setFollowerArray] = useState<FollowerArrayType>([]);
  const [dateXaxis, setDateXaxis] = useState<DateArrayType | null>([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getData(id as string, date as string);
      const dailyData = responseData.data;
      const dates = dailyData.map((item: DailyDataType) => item.date);
      const followers = dailyData.map((item: DailyDataType) =>
        parseInt(item.follower, 10)
      );

      setFollowerArray(followers);
      setDateXaxis(dates);
      setFollowerData(responseData.data);
    };
    fetchData();
  }, [id, date]);

  const yaxis = () => {
    const diff = Math.max(...followerArray) - Math.min(...followerArray);
    const digit = 10 ** (diff.toString().length - 1);

    const maxYaxis =
      Math.ceil(Math.max(...followerArray) / digit) * digit + digit;
    const minYaxis =
      Math.floor(Math.min(...followerArray) / digit) * digit - digit;
    const tickAmount = Math.ceil(diff / digit);
    const stepSize = digit;

    return { maxYaxis, minYaxis, tickAmount, stepSize };
  };
  const { maxYaxis, minYaxis, tickAmount, stepSize } = yaxis();

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
        defaultLocale: 'ko',
        locales: [{
          name: 'ko',
          options: {
            shortDays: ['일', '월', '화', '수', '목', '금', '토']
          }
        }],
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
      tooltip: {
        x: {
          show: true,
          format: 'MM.dd (ddd)'
        }
      },
      xaxis: {
        type: "datetime" as XaxisType,
        categories: dateXaxis,
        labels: {
          style: {
            colors: "white",
            fontWeight: "bold",
          },
          rotate: 0,
          hideOverlappingLabels: true,
          format: 'MM.dd (ddd)'
        },
        tooltip: {
          enabled: false
        }
      },
      yaxis: [
        {
          min: minYaxis,
          max: maxYaxis,
          tickAmount: tickAmount as number,
          stepSize: stepSize as number,
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
        padding: {
          left: 10,
          right: 40
        },
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
        className={style.chart}
        height="265%"
        width="100%"
      />
    </div>
  );
}
