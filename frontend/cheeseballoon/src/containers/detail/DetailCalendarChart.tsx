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

const API_URL = process.env.NEXT_PUBLIC_RECORD_API_URL;

async function getData(streamerId: string) {
  const res = await fetch(`${API_URL}${streamerId}`);

  return res.json();
}

export default function DetailCalendarChart() {
  const { id } = useParams();
  const [chartData, setChartData] = useState<ChartDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getData(id as string);
      setChartData(responseData.data);
    };
    fetchData();
  }, [id]);

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
          <strong>
            {Math.floor(parseInt(value, 10) / 60)}시간{" "}
            {parseInt(value, 10) % 60}분
          </strong>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div id="calendar-container" className={styles.container}>
        <div className={styles.name}>방송 기록</div>
        <ResponsiveCalendar
          data={chartData}
          from={startOfYear}
          to={endOfYear}
          // emptyColor="#EFF0F2"
          emptyColor="#4e4e4e"
          // colors={[
          //   "#FFFBEB",
          //   "#FEF2C3",
          //   "#FDE99B",
          //   "#FCE173",
          //   "#FBD84B",
          //   "#FBCF23",
          //   "#F0C105",
          //   "#C8A104",
          // ]}
          // colors={[
          //   "#F6EEA2",
          //   "#F5EA8F",
          //   "#F3E77C",
          //   "#F1E46A",
          //   "#EFE057",
          //   "#EEDD44",
          //   "#ECD932",
          //   "#EAD51C",
          // ]}
          colors={[
            "#FDFCEC",
            "#FAF5C7",
            "#F6EEA2",
            "#F5EA8F",
            "#F3E77C",
            "#F1E46A",
            "#EEDD44",
            "#EAD51C",
          ]}
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
          // legends={[
          //   {
          //     anchor: "top",
          //     direction: "row",
          //     translateY: 36,
          //     itemCount: 8,
          //     itemWidth: 34,
          //     itemHeight: 36,
          //     itemDirection: "top-to-bottom",
          //   },
          // ]}
          minValue={0}
          maxValue={1440}
          tooltip={customTooltip}
        />
      </div>
    </div>
  );
}