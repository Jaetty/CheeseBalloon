"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import style from "./detailChart.module.scss";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function DetailViewerChart() {
  const { id, category, date } = useParams()
  

  const chartData = {
    options: {
      title: {
        text: "시청자수",
        align: "center",
      },
      chart: {
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
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },

    series: [
      {
        name: "최고 시청자수",
        type: "line",
        data: [40, 50, 45, 60, 69, 70, 80, 101, 135],
      },
      {
        name: "평균 시청자수",
        type: "column",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
  };

  return (
    <div className={style.container}>
      <ApexChart
        type="line"
        options={chartData.options}
        series={chartData.series}
        height={500}
        width={500}
      />
    </div>
  );
}
