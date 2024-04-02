"use client";

// import ReactApexChart from "react-apexcharts";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function DetailCategoryChart() {
  const chartData = {
    options: {
      title: {
        align: "center",
        text: "카테고리",
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
    <div>
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
