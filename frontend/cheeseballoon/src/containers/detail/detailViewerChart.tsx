"use client";

import dynamic from "next/dynamic";
import style from "./detailChart.module.scss";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function DetailViewerChart() {
<<<<<<< HEAD
=======
  const { id, category, date } = useParams();

>>>>>>> ac51269add7b7511c14ac32c724f421166ad45ff
  const chartData = {
    options: {
      title: {
        align: "center",
<<<<<<< HEAD
        text: "시청자",
        style: {
          fontSize: "15px",
=======
        style: {
          fontSize: "20px",
>>>>>>> ac51269add7b7511c14ac32c724f421166ad45ff
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
      yaxis: {
        labels: {
          style: {
            colors: "white",
            fontWeight: "bold",
          },
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
<<<<<<< HEAD
        height="auto"
        width="100%"
=======
        height={"auto"}
        width={"100%"}
>>>>>>> ac51269add7b7511c14ac32c724f421166ad45ff
      />
    </div>
  );
}
