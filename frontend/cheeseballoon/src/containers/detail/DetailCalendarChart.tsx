"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ResponsiveCalendar } from "@nivo/calendar";
import styles from "./DetailCalendarChart.module.scss";

type ChartDataType = {
  value: number;
  day: string;
};

type TooltipType = {
  day: string;
  value: string;
  color: string;
};

type PeriodType = { startOfYear: string; endOfYear: string };

const API_URL = process.env.NEXT_PUBLIC_TIME_API_URL;

async function getData(streamerId: string, date: string) {
  let res;
  if (date) {
    res = await fetch(`${API_URL}streamerId=${streamerId}&date=${date}`);
  } else {
    res = await fetch(`${API_URL}streamerId=${streamerId}&date=1`);
  }

  return res.json();
}

export default function DetailCalendarChart() {
  // const { id, date } = useParams();
  // const [chartData, setChartData] = useState<ChartDataType>();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const responseData = await getData(id as string, date as string);
  //     const datae = [];
  //     responseData.data.dailyTimes.map((item) => {
  //       datae.push({
  //         value: item.totalAirTime,
  //         day: item.date,
  //       });
  //     });
  //     setChartData(datae);
  //   };
  //   fetchData();
  //   console.log(chartData);
  // }, [id, date]);

  const data = [
    {
      value: 24,
      day: "2024-06-05",
    },
    {
      value: 23,
      day: "2024-06-12",
    },
    {
      value: 13,
      day: "2024-12-27",
    },
    {
      value: 5,
      day: "2024-07-08",
    },
    {
      value: 23,
      day: "2024-12-22",
    },
    {
      value: 4,
      day: "2024-06-18",
    },
    {
      value: 2,
      day: "2024-11-10",
    },
    {
      value: 8,
      day: "2024-07-06",
    },
    {
      value: 1,
      day: "2024-04-22",
    },
    {
      value: 5,
      day: "2024-07-01",
    },
    {
      value: 22,
      day: "2024-05-14",
    },
    {
      value: 5,
      day: "2024-01-11",
    },
    {
      value: 13,
      day: "2024-06-29",
    },
    {
      value: 20,
      day: "2024-10-26",
    },
    {
      value: 19,
      day: "2024-12-11",
    },
    {
      value: 9,
      day: "2024-01-06",
    },
    {
      value: 9,
      day: "2024-05-31",
    },
    {
      value: 3,
      day: "2024-10-29",
    },
    {
      value: 3,
      day: "2024-11-14",
    },
    {
      value: 5,
      day: "2024-10-07",
    },
    {
      value: 4,
      day: "2024-07-28",
    },
    {
      value: 5,
      day: "2024-09-19",
    },
    {
      value: 9,
      day: "2024-02-10",
    },
    {
      value: 3,
      day: "2024-03-07",
    },
    {
      value: 19,
      day: "2024-03-22",
    },
    {
      value: 14,
      day: "2024-08-13",
    },
    {
      value: 19,
      day: "2024-03-06",
    },
    {
      value: 15,
      day: "2024-03-08",
    },
    {
      value: 9,
      day: "2024-06-26",
    },
    {
      value: 17,
      day: "2024-12-19",
    },
    {
      value: 9,
      day: "2024-05-18",
    },
    {
      value: 4,
      day: "2024-01-24",
    },
    {
      value: 15,
      day: "2024-08-07",
    },
    {
      value: 6,
      day: "2024-05-20",
    },
    {
      value: 7,
      day: "2024-05-09",
    },
    {
      value: 11,
      day: "2024-04-15",
    },
    {
      value: 2,
      day: "2024-10-28",
    },
    {
      value: 2,
      day: "2024-04-19",
    },
    {
      value: 9,
      day: "2024-06-13",
    },
    {
      value: 16,
      day: "2024-01-29",
    },
    {
      value: 3,
      day: "2024-12-09",
    },
    {
      value: 6,
      day: "2024-08-05",
    },
    {
      value: 7,
      day: "2024-11-15",
    },
    {
      value: 17,
      day: "2024-06-23",
    },
    {
      value: 22,
      day: "2024-05-29",
    },
    {
      value: 9,
      day: "2024-07-25",
    },
    {
      value: 11,
      day: "2024-08-23",
    },
    {
      value: 7,
      day: "2024-07-13",
    },
    {
      value: 24,
      day: "2024-01-03",
    },
    {
      value: 16,
      day: "2024-02-08",
    },
    {
      value: 10,
      day: "2024-03-12",
    },
    {
      value: 8,
      day: "2024-01-28",
    },
    {
      value: 10,
      day: "2024-10-16",
    },
    {
      value: 7,
      day: "2024-11-11",
    },
    {
      value: 8,
      day: "2024-01-22",
    },
    {
      value: 6,
      day: "2024-09-01",
    },
    {
      value: 16,
      day: "2024-07-15",
    },
    {
      value: 4,
      day: "2024-06-06",
    },
    {
      value: 2,
      day: "2024-06-16",
    },
    {
      value: 20,
      day: "2024-12-26",
    },
    {
      value: 5,
      day: "2024-08-09",
    },
    {
      value: 8,
      day: "2024-10-30",
    },
    {
      value: 12,
      day: "2024-06-27",
    },
    {
      value: 22,
      day: "2024-10-23",
    },
    {
      value: 5,
      day: "2024-10-25",
    },
    {
      value: 23,
      day: "2024-04-05",
    },
    {
      value: 24,
      day: "2024-11-02",
    },
    {
      value: 2,
      day: "2024-10-05",
    },
    {
      value: 6,
      day: "2024-03-27",
    },
    {
      value: 9,
      day: "2024-12-28",
    },
    {
      value: 17,
      day: "2024-12-01",
    },
    {
      value: 8,
      day: "2024-09-08",
    },
    {
      value: 6,
      day: "2024-06-20",
    },
    {
      value: 8,
      day: "2024-05-15",
    },
    {
      value: 1,
      day: "2024-06-09",
    },

    {
      value: 20,
      day: "2024-10-01",
    },
    {
      value: 10,
      day: "2024-08-15",
    },
    {
      value: 13,
      day: "2024-08-14",
    },
    {
      value: 7,
      day: "2024-07-11",
    },
    {
      value: 14,
      day: "2024-04-27",
    },
    {
      value: 21,
      day: "2024-03-04",
    },
    {
      value: 2,
      day: "2024-08-26",
    },
    {
      value: 16,
      day: "2024-08-25",
    },
    {
      value: 7,
      day: "2024-10-24",
    },
    {
      value: 22,
      day: "2024-03-01",
    },
    {
      value: 5,
      day: "2024-08-08",
    },
    {
      value: 15,
      day: "2024-06-14",
    },
    {
      value: 7,
      day: "2024-09-14",
    },
    {
      value: 6,
      day: "2024-03-14",
    },
    {
      value: 16,
      day: "2024-04-20",
    },
    {
      value: 5,
      day: "2024-05-06",
    },
    {
      value: 8,
      day: "2024-04-17",
    },

    {
      value: 19,
      day: "2024-01-16",
    },
    {
      value: 23,
      day: "2024-08-18",
    },
    {
      value: 12,
      day: "2024-08-03",
    },
    {
      value: 22,
      day: "2024-12-16",
    },
    {
      value: 8,
      day: "2024-11-13",
    },
    {
      value: 8,
      day: "2024-03-18",
    },
    {
      value: 23,
      day: "2024-10-13",
    },
    {
      value: 1,
      day: "2024-11-07",
    },
    {
      value: 11,
      day: "2024-01-13",
    },
    {
      value: 8,
      day: "2024-03-21",
    },
    {
      value: 23,
      day: "2024-03-31",
    },
    {
      value: 14,
      day: "2024-04-07",
    },
    {
      value: 3,
      day: "2024-09-07",
    },
    {
      value: 3,
      day: "2024-04-01",
    },
    {
      value: 8,
      day: "2024-03-03",
    },
    {
      value: 15,
      day: "2024-04-26",
    },
    {
      value: 6,
      day: "2024-11-30",
    },
    {
      value: 2,
      day: "2024-09-13",
    },
    {
      value: 8,
      day: "2024-02-25",
    },
    {
      value: 14,
      day: "2024-10-02",
    },
    {
      value: 5,
      day: "2024-08-24",
    },
    {
      value: 7,
      day: "2024-05-26",
    },
    {
      value: 8,
      day: "2024-12-12",
    },
    {
      value: 8,
      day: "2024-01-30",
    },
    {
      value: 5,
      day: "2024-04-09",
    },
    {
      value: 3,
      day: "2024-02-27",
    },
    {
      value: 20,
      day: "2024-09-18",
    },
    {
      value: 22,
      day: "2024-10-18",
    },
    {
      value: 3,
      day: "2024-02-26",
    },
    {
      value: 6,
      day: "2024-10-19",
    },
    {
      value: 4,
      day: "2024-02-04",
    },

    {
      value: 5,
      day: "2024-07-23",
    },

    {
      value: 6,
      day: "2024-03-15",
    },

    {
      value: 20,
      day: "2024-02-07",
    },

    {
      value: 13,
      day: "2024-11-05",
    },
    {
      value: 19,
      day: "2024-07-27",
    },
    {
      value: 15,
      day: "2024-12-15",
    },

    {
      value: 13,
      day: "2024-10-12",
    },

    {
      value: 3,
      day: "2024-02-28",
    },

    {
      value: 5,
      day: "2024-04-10",
    },
    {
      value: 18,
      day: "2024-12-18",
    },

    {
      value: 23,
      day: "2024-09-28",
    },
    {
      value: 13,
      day: "2024-06-24",
    },

    {
      value: 8,
      day: "2024-09-23",
    },

    {
      value: 20,
      day: "2024-08-02",
    },

    {
      value: 19,
      day: "2024-03-24",
    },
    {
      value: 8,
      day: "2024-07-05",
    },

    {
      value: 5,
      day: "2024-07-17",
    },

    {
      value: 8,
      day: "2024-07-30",
    },

    {
      value: 22,
      day: "2024-11-23",
    },
    {
      value: 21,
      day: "2024-11-01",
    },
    {
      value: 15,
      day: "2024-10-04",
    },

    {
      value: 23,
      day: "2024-05-08",
    },
    {
      value: 20,
      day: "2024-04-18",
    },
    {
      value: 10,
      day: "2024-05-27",
    },

    {
      value: 21,
      day: "2024-03-25",
    },
    {
      value: 18,
      day: "2024-07-21",
    },
    {
      value: 21,
      day: "2024-02-22",
    },

    {
      value: 11,
      day: "2024-01-14",
    },
    {
      value: 9,
      day: "2024-05-12",
    },

    {
      value: 7,
      day: "2024-04-16",
    },

    {
      value: 13,
      day: "2024-10-11",
    },

    {
      value: 23,
      day: "2024-11-28",
    },

    {
      value: 2,
      day: "2024-04-04",
    },

    {
      value: 15,
      day: "2024-02-16",
    },
    {
      value: 4,
      day: "2024-12-31",
    },
    {
      value: 8,
      day: "2024-02-20",
    },
    {
      value: 3,
      day: "2024-09-24",
    },

    {
      value: 21,
      day: "2024-03-26",
    },

    {
      value: 5,
      day: "2024-07-24",
    },

    {
      value: 20,
      day: "2024-01-19",
    },
    {
      value: 4,
      day: "2024-09-11",
    },

    {
      value: 23,
      day: "2024-12-04",
    },

    {
      value: 5,
      day: "2024-04-06",
    },

    {
      value: 13,
      day: "2024-12-13",
    },
    {
      value: 14,
      day: "2024-06-30",
    },
    {
      value: 15,
      day: "2024-05-13",
    },
    {
      value: 23,
      day: "2024-10-22",
    },

    {
      value: 22,
      day: "2024-02-19",
    },
    {
      value: 16,
      day: "2024-08-29",
    },

    {
      value: 11,
      day: "2024-05-16",
    },

    {
      value: 8,
      day: "2024-02-23",
    },

    {
      value: 23,
      day: "2024-01-01",
    },
    {
      value: 14,
      day: "2024-06-22",
    },

    {
      value: 21,
      day: "2024-06-25",
    },
    {
      value: 20,
      day: "2024-10-08",
    },

    {
      value: 14,
      day: "2024-10-09",
    },
    {
      value: 8,
      day: "2024-11-16",
    },

    {
      value: 4,
      day: "2024-04-02",
    },
    {
      value: 14,
      day: "2024-02-15",
    },
    {
      value: 20,
      day: "2024-07-12",
    },

    {
      value: 24,
      day: "2024-01-18",
    },
  ];

  const getPeriod = (): PeriodType => {
    const today = new Date();
    const year = today.getFullYear();
    const startOfYear = `${year}-01-01`;
    const endOfYear = `${year}-12-31`;
    return { startOfYear, endOfYear };
  };

  const { startOfYear, endOfYear } = getPeriod();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      #calendar-container g rect[x][y][width][height][style] {
        rx: 10;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const customTooltip = ({ value, day, color }: TooltipType) => (
    <div className={styles["tooltip-container"]}>
      <div className={styles["tooltip-content"]}>
        <div
          className={styles["tooltip-color"]}
          style={{ backgroundColor: color }}
        ></div>
        <div className={styles["tooltip-day"]}>{day}:</div>
        <div className={styles["tooltip-value"]}>
          <strong>{value}시간</strong>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div id="calendar-container" className={styles.container}>
        <div className={styles.name}>방송 기록</div>
        <ResponsiveCalendar
          data={data}
          from={startOfYear}
          to={endOfYear}
          // emptyColor="#EFF0F2"
          emptyColor="#4e4e4e"
          // colors={["#FAC975", "#EC9909"]}
          colors={["#FDEA9A", "#FCDC5F", "#FBCF23"]}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          // yearLegend={(year: number) => ""}
          yearLegendOffset={20}
          // monthBorderColor="#ffffff"
          // monthSpacing={20}
          monthBorderWidth={0}
          monthLegendPosition="after"
          monthLegendOffset={20}
          monthLegend={(year: number, month: number, chartdate: Date) =>
            `${month + 1}월`
          }
          // dayBorderWidth={3}
          // dayBorderColor="#ffffff"
          theme={{
            text: {
              fill: "white",
            },
          }}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              translateY: 36,
              itemCount: 4,
              itemWidth: 34,
              itemHeight: 36,
              itemDirection: "top-to-bottom",
            },
          ]}
          minValue={0}
          maxValue={24}
          tooltip={customTooltip}
        />
      </div>
    </div>
  );
}
