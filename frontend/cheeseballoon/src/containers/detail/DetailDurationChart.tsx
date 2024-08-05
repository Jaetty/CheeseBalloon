import dynamic from "next/dynamic";
import { isMobileState } from "@/src/stores/store";
import style from "src/containers/detail/DetailDurationChart.module.scss";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type AlignType = "center";
type XaxisType = "datetime";

type DateArrayType = string[];
type TimeArrayType = number[];

type DetailDurationChartPropsType = {
  timeArray: TimeArrayType;
  dateXaxis: DateArrayType;
};

export default function DetailDurationChart({
  timeArray,
  dateXaxis,
}: DetailDurationChartPropsType) {
  const isMobile = isMobileState((state) => state.isMobile);

  const chartData = {
    options: {
      title: {
        text: "방송시간",
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
        size: 3,
      },
      tooltip: {
        x: {
          show: true,
          format: "MM.dd (ddd)",
        },
      },
      xaxis: {
        type: "datetime" as XaxisType,
        tickPlacement: "on",

        categories: dateXaxis,
        labels: {
          style: {
            colors: "white",
            fontWeight: "bold",
            fontSize: isMobile ? "8" : "12",
          },
          offsetY: isMobile ? -3 : 0,

          rotate: 0,
          hideOverlappingLabels: true,
          format: "MM.dd (ddd)",
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: [
        {
          min: 0,
          max: 24,
          tickAmount: 6,
          labels: {
            style: {
              colors: "white",
              fontWeight: "bold",
              fontSize: isMobile ? "8" : "12",
            },
            formatter: (value: number) =>
              value === null ? "0시간" : `${value.toLocaleString()}시간`,
          },
        },
      ],
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
      colors: ["#F0BD53"],
      legend: {
        labels: {
          colors: "white",
        },
      },
    },

    series: [
      {
        name: "방송시간",
        type: "bar",
        data: timeArray as number[],
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
          className={style.chart}
          height={isMobile ? "120%" : "252%"}
          width="100%"
        />
      </div>
    </div>
  );
}
