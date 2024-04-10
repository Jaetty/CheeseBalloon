"use client";

import dynamic from "next/dynamic";
import style from "./detailChart.module.scss";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type AlignType = "center";

export default function DetailDurationChart() {
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
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        labels: {
          style: {
            colors: "white",
            fontWeight: "bold",
          },
        },
      },
      yaxis: [
        {
          labels: {
            style: {
              colors: "white",
              fontWeight: "bold",
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
        name: "방송 시간",
        type: "bar",
        data: [40, 50, 45, 60, 69, 70, 80, 101, 135],
      },
    ],
  };

  return (
    <div className={style.container}>
      <ApexChart
        type="bar"
        options={chartData.options}
        series={chartData.series}
        height="auto"
        width="100%"
      />
    </div>
  );
}
