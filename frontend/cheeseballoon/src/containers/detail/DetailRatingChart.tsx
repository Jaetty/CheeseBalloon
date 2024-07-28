import dynamic from "next/dynamic";
import { isMobileState } from "@/src/stores/store";
import style from "src/containers/detail/DetailRatingChart.module.scss";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type AlignType = "center";
type XaxisType = "datetime";

type DateArrayType = string[];
type RatingArrayType = number[];

type DetailRatingChartPropsType = {
  totalRatingArray: RatingArrayType;
  platformRatingArray: RatingArrayType;
  dateXaxis: DateArrayType | null;
  maxYaxis: () => number;
};

export default function DetailRatingChart({
  totalRatingArray,
  platformRatingArray,
  dateXaxis,
  maxYaxis,
}: DetailRatingChartPropsType) {
  const isMobile = isMobileState((state) => state.isMobile);
  const chartData = {
    options: {
      title: {
        text: "시청률",
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
      colors: ["#77B6EA", "#F8DB46"],
      markers: {
        size: isMobile ? 2 : 3,
      },
      legend: {
        show: true,
        labels: {
          colors: "white",
        },
        fontSize: isMobile ? "8" : "12",
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
      yaxis: [
        {
          min: 0,
          max: maxYaxis,
          tickAmount: 5,
          labels: {
            style: {
              colors: "white",
              fontWeight: "bold",
              fontSize: isMobile ? "8" : "12",
            },
            formatter: (value: number) => `${value}%`,
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
    },

    series: [
      {
        name: "플랫폼 시청률",
        type: "line",
        data: platformRatingArray as number[],
      },
      {
        name: "통합 시청률",
        type: "line",
        data: totalRatingArray as number[],
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
          height={isMobile ? "150%" : "250%"}
          width="100%"
          className={style.chart}
        />
      </div>
    </div>
  );
}
