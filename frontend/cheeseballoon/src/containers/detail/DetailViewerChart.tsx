import dynamic from "next/dynamic";
import { isMobileState } from "@/src/stores/store";
import style from "src/containers/detail/DetailViewerChart.module.scss";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type AlignType = "center";
type XaxisType = "datetime";

type DateArrayType = string[];
type ViewerArrayType = number[];
type maxYaxisType = () => number;

type DetailViewerChartPropsType = {
  avgViewerArray: ViewerArrayType;
  maxViewerArray: ViewerArrayType;
  maxYaxis: maxYaxisType;
  dateXaxis: DateArrayType | null;
};

export default function DetailViewerChart({
  avgViewerArray,
  maxViewerArray,
  maxYaxis,
  dateXaxis,
}: DetailViewerChartPropsType) {
  const isMobile = isMobileState((state) => state.isMobile);

  const chartData = {
    options: {
      title: {
        text: "시청자",
        align: "center" as AlignType,
        style: {
          fontSize: isMobile ? "10px" : "15px",
          fontWeight: "bold",
          color: "white",
        },
      },

      chart: {
        defaultLocale: "ko",
        locales: [
          {
            name: "ko",
            options: {
              shortDays: ["일", "월", "화", "수", "목", "금", "토"],
            },
          },
        ],
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
        size: isMobile ? 2 : 3,
      },
      tooltip: {
        x: {
          show: true,
          format: "MM.dd (ddd)",
        },
      },
      xaxis: {
        type: "datetime" as XaxisType,

        categories: dateXaxis,
        labels: {
          style: {
            colors: "white",
            fontWeight: "bold",
            fontSize: isMobile ? "8" : "12",
          },
          offsetY: isMobile ? -3 : -2,
          rotate: 0,
          hideOverlappingLabels: true,
          format: "MM.dd (ddd)",
        },
        tooltip: {
          enabled: false,
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
            fontSize: isMobile ? "8" : "12",
          },
          formatter: (value: number) =>
            value === null ? `0명` : `${value.toLocaleString()}명`,
        },
      },
      grid: {
        show: true,
        strokeDashArray: 5,
        borderColor: "#bcbcbc",
        padding: {
          left: 10,
          right: 40,
        },
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
      colors: ["#F5AB00", "#FFD470"],
      legend: {
        labels: {
          colors: "white",
        },
        fontSize: isMobile ? "8" : "12",
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
          className={style.chart}
          options={chartData.options}
          series={chartData.series}
          height={isMobile ? "150%" : "250%"}
          width="100%"
        />
      </div>
    </div>
  );
}
