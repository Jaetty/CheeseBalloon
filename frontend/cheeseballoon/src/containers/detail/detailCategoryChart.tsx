"use client";

// import ReactApexChart from "react-apexcharts";
import dynamic from "next/dynamic";
import style from "./detailChart.module.scss";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type AlignType = "center";

export default function DetailCategoryChart() {
  const chartData = {
    options: {
      title: {
        text: "카테고리",
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
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: true,
          },
        },
      },
    },
    series: [
      {
        data: [
          {
            x: "talk",
            y: 118,
          },
          {
            x: "롤토체스",
            y: 520,
          },
          {
            x: "발로란트",
            y: 300,
          },
        ],
      },
    ],
  };

  return (
    <div className={style.container}>
      <ApexChart
        type="treemap"
        options={chartData.options}
        series={chartData.series}
        height="auto"
        width="100%"
      />
    </div>
  );
}
