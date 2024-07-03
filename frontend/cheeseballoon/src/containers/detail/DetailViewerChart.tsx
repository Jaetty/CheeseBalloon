"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import style from "src/containers/detail/DetailViewerChart.module.scss";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type AlignType = "center";

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

export default function DetailViewerChart() {
  const { id, date } = useParams();
  const [viewerData, setViewerData] = useState<ViewerDataType | null>(null);
  const [avgViewerArray, setAvgViewerArray] = useState<ViewerArrayType>([]);
  const [maxViewerArray, setMaxViewerArray] = useState<ViewerArrayType>([]);
  // const [dateArray, setDateArray] = useState<DateArrayType | null>(null);
  const [dateXaxis, setDateXaxis] = useState<DateArrayType | null>([]);

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
      const datesChange = dates.map((dateString: string) => {
        const parts = dateString.split("-");
        const [year, month, day] = parts.map(Number);
        const dateObj = new Date(year, month - 1, day);
        const dayOfWeek = dateObj.toLocaleDateString("ko-KR", {
          weekday: "short",
        });
        return `${year}.${month}.${day} (${dayOfWeek})`;
      });
      // setDateArray(dates);
      setAvgViewerArray(avgViewers);
      setMaxViewerArray(maxViewers);
      setDateXaxis(datesChange);
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
        tickAmount: 5,
        min: 0,
        max: maxYaxis,
        labels: {
          style: {
            colors: "white",
            fontWeight: "bold",
          },
          formatter: (value: number) =>
            value === null ? `0명` : `${value.toLocaleString()}명`,
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
        padding: {
          right: 20
        }
      },
      colors: ["#F0BD53"],
      legend: {
        labels: {
          colors: "white",
        },
      },
      dataLabels: {
        enabled: false,
      },
    },

    series: [
      {
        name: "최고 시청자수",
        type: "line",
        data: maxViewerArray as number[],
      },
      {
        name: "평균 시청자수",
        type: "bar",
        data: avgViewerArray as number[],
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
          height="170%"
          width="100%"
        />
      </div>
      {viewerData && (
        <div className={style.viewer}>
          <div className={style["viewer-container"]}>
            <div className={style["viewer-title"]}>최고 시청자수</div>
            <div className={style["viewer-cnt"]}>
              {viewerData.maxViewer.toLocaleString()}명
            </div>
            <div
              className={`${style["viewer-diff"]} ${viewerData.maxDiff >= 0 ? style.positive : style.negative}`}
            >
              {Math.abs(viewerData.maxDiff).toLocaleString()}명{" "}
              {viewerData.maxDiff >= 0 ? "상승 ↑" : "하락 ↓"}
            </div>
          </div>
          <div className={style["viewer-container"]}>
            <div className={style["viewer-title"]}>평균 시청자수</div>
            <div className={style["viewer-cnt"]}>
              {viewerData.avgViewer.toLocaleString()}명
            </div>
            <div
              className={`${style["viewer-diff"]} ${viewerData.avgDiff >= 0 ? style.positive : style.negative}`}
            >
              {Math.abs(viewerData.avgDiff).toLocaleString()}명{" "}
              {viewerData.avgDiff >= 0 ? "상승 ↑" : "하락 ↓"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
