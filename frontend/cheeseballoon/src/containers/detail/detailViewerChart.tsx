"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import style from "./detailViewerChart.module.scss";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type AlignType = "center";

type ViewerDataType = {
  maxViewer: number;
  maxDiff: number;
  avgViewer: number;
  avgDiff: number;
  dailyAvgViewers: [date: string, viewer: number];
};

type DateArrayType = string[];
type ViewerArrayType = number[];
type dailyAvgViewersType = {
  date: string;
  avgViewer: string;
};

const API_URL = process.env.NEXT_PUBLIC_VIEWER_API_URL;

async function getData(streamerId: string, date: string) {
  let res;
  if (date) {
    res = await fetch(`${API_URL}streamerId=${streamerId}&date=${date}`);
  } else {
    res = await fetch(`${API_URL}streamerId=${streamerId}&date=7`);
  }

  return res.json();
}

export default function DetailViewerChart() {
  const { id, date } = useParams();
  const [viewerData, setViewerData] = useState<ViewerDataType | null>(null);
  const [dateArray, setDateArray] = useState<DateArrayType | null>(null);
  const [viewerArray, setViewerArray] = useState<ViewerArrayType | null>(null);
  const [dateXaxis, setDateXaxis] = useState<DateArrayType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getData(id as string, date as string);
      const dairyData = responseData.data.dailyAvgViewers;
      if (dairyData && dairyData.length > 0) {
        const dates = dairyData.map((item: dailyAvgViewersType) => item.date);
        const viewers = dairyData.map((item: dailyAvgViewersType) =>
          parseInt(item.avgViewer, 10)
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
        setDateArray(dates);
        setViewerArray(viewers);
        setDateXaxis(datesChange);
      }
      setViewerData(responseData.data);
    };
    fetchData();
  }, [id, date]);

  const chartData = {
    options: {
      title: {
        text: "시청자",
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
      yaxis: {
        labels: {
          style: {
            colors: "white",
            fontWeight: "bold",
          },
          formatter: (value: number) => `${value}명`,
        },
      },
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
        name: "평균 시청자수",
        type: "column",
        data: viewerArray as number[],
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
          height="auto"
          width="100%"
        />
      </div>
      {viewerData && (
        <div className={style.viewer}>
          <div className={style["viewer-container"]}>
            <div className={style["viewer-title"]}>최고 시청자수</div>
            <div className={style["viewer-cnt"]}>{viewerData.maxViewer}</div>
            <div
              className={`${style["viewer-diff"]} ${viewerData.maxDiff >= 0 ? style.positive : style.negative}`}
            >
              {Math.abs(viewerData.maxDiff)}명{" "}
              {viewerData.maxDiff >= 0 ? "상승 ↑" : "하락 ↓"}
            </div>
          </div>
          <div className={style["viewer-container"]}>
            <div className={style["viewer-title"]}>평균 시청자수</div>
            <div className={style["viewer-cnt"]}>{viewerData.avgViewer}</div>
            <div
              className={`${style["viewer-diff"]} ${viewerData.avgDiff >= 0 ? style.positive : style.negative}`}
            >
              {Math.abs(viewerData.avgDiff)}명{" "}
              {viewerData.avgDiff >= 0 ? "상승 ↑" : "하락 ↓"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
