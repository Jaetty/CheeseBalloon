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
<<<<<<< HEAD
        text: "카테고리",
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
