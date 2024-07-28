import dynamic from "next/dynamic";
import { isMobileState } from "@/src/stores/store";
import style from "src/containers/detail/DetailCategoryChart.module.scss";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type AlignType = "center";

type listType = {
  title: string;
  time: number;
  viewer: number;
}[];

type DetailViewerChartProps = {
  series: number[];
  labels: string[];
};

const API_URL = process.env.NEXT_PUBLIC_CATEGORY_API_URL;

async function getData(streamerId: string, date: string) {
  let res;
  if (date) {
    res = await fetch(`${API_URL}streamerId=${streamerId}&date=${date}`);
  } else {
    res = await fetch(`${API_URL}streamerId=${streamerId}&date=1`);
  }

  return res.json();
}

export default function DetailCategoryChart({
  series,
  labels,
}: DetailViewerChartProps) {
  const isMobile = isMobileState((state) => state.isMobile);

  const chartColors = [
    "#008ffb",
    "#00e396",
    "#feb019",
    "#ff4560",
    "#8176a7",
    "#98DF8A",
    "#D62728",
    "#FF9896",
    "#9467BD",
    "#F7B6D2",
    "#C7C7C7",
  ];

  const chartData = {
    series: series as number[],

    options: {
      title: {
        text: "카테고리",
        align: "center" as AlignType,
        style: {
          fontSize: isMobile ? "10px" : "15px",
          fontWeight: "bold",
          color: "white",
        },
      },
      labels: labels as string[],
      dataLabels: {
        style: {
          fontSize: isMobile ? "10px" : "15px",
        },
      },
      tooltip: {
        y: {
          formatter: (value: number) =>
            `${(Math.floor((value / 3600) * 10) / 10).toLocaleString()}시간`,
        },
      },
      legend: {
        fontSize: isMobile ? "6rem" : "12rem",
        width: isMobile ? 80 : 150,
        labels: {
          colors: "white",
        },
        markers: isMobile
          ? {
              width: 5,
              height: 5,
            }
          : {
              width: 10,
              height: 10,
            },
        itemMargin: {
          vertical: 2,
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
        events: {
          mounted() {
            if (isMobile) {
              const legendSeries = document.querySelectorAll(
                ".apexcharts-legend-series"
              );
              legendSeries.forEach((element) => {
                const el = element as HTMLElement;
                el.style.display = "flex";
                el.style.alignItems = "center";
              });
              const legendMarkers = document.querySelectorAll(
                ".apexcharts-legend-marker"
              );
              legendMarkers.forEach((element) => {
                const el = element as HTMLElement;
                el.style.flexShrink = "0";
              });
            }
          },
          updated() {
            if (isMobile) {
              const legendSeries = document.querySelectorAll(
                ".apexcharts-legend-series"
              );
              legendSeries.forEach((element) => {
                const el = element as HTMLElement;
                el.style.display = "flex";
                el.style.alignItems = "center";
              });
              const legendMarkers = document.querySelectorAll(
                ".apexcharts-legend-marker"
              );
              legendMarkers.forEach((element) => {
                const el = element as HTMLElement;
                el.style.flexShrink = "0";
              });
            }
          },
        },
      },
      colors: chartColors,
    },
  };

  return (
    <div className={style.wrapper}>
      <div className={style["chart-container"]}>
        <ApexChart
          type="pie"
          options={chartData.options}
          series={chartData.series}
          height={isMobile ? "100%" : "265%"}
          width="100%"
          className={style.chart}
        />
      </div>
    </div>
  );
}
