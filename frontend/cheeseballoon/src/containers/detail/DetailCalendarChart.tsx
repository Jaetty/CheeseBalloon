"use client";

import CalendarHeatmap from "react-calendar-heatmap";
import style from "src/containers/detail/DetailChart.module.scss";

export default function DetailCalendarChart() {
  return (
    <div className={style.container}>
      <CalendarHeatmap
        startDate={new Date("2016-01-01")}
        endDate={new Date("2016-04-01")}
        values={[
          { date: "2016-01-01", count: 12 },
          { date: "2016-01-22", count: 122 },
          { date: "2016-01-30", count: 38 },
        ]}
      />
    </div>
  );
}
