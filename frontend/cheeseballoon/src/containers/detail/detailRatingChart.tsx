"use client";

import dynamic from "next/dynamic";
import style from "./detailChart.module.scss";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function DetailRatingChart() {
  const chartData = {
    options: {
      title: {
        align: "center",
        text: "시청률",
        style: {
          fontSize: "15px",
          fontWeight: "bold",
          color: "white",
        },
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
        name: "시청률",
        type: "line",
        data: [40, 50, 45, 60, 69, 70, 80, 101, 135],
      },
    ],
  };

  return (
    <div className={style.container}>
      <ApexChart
        type="line"
        options={chartData.options}
        series={chartData.series}
        height={"auto"}
        width={"100%"}
      />
    </div>
  );
}
