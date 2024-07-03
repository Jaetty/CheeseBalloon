"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "src/containers/detail/DetailCategoryChart.module.scss";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type AlignType = "center";

type CategoryDataType = {
  totalTime: number;
  dailyCategories: [category: string, time: number, avgViewer: number];
};

type DailyCategoryType = {
  category: string;
  time: number;
  avgViewer: number;
};

interface Accumulator {
  seriesData: number[];
  labelsData: string[];
}

type listType = {
  title: string;
  time: number;
  viewer: number;
}[];

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

export default function DetailCategoryChart() {
  const { id, date } = useParams();
  const [categoryData, setCategoryData] = useState<CategoryDataType | null>(
    null
  );
  const [series, setSeries] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [lists, setLists] = useState<listType>([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getData(id as string, date as string);
      const categoriesData = responseData.data.dailyCategories;
      categoriesData.sort(
        (a: DailyCategoryType, b: DailyCategoryType) => b.time - a.time
      );
      const { seriesData, labelsData } = categoriesData.reduce(
        (acc: Accumulator, item: DailyCategoryType) => {
          acc.seriesData.push(item.time);
          if (item.category === "") {
            acc.labelsData.push("카테고리 없음");
          } else {
            acc.labelsData.push(item.category);
          }
          return acc;
        },
        { seriesData: [], labelsData: [] }
      );

      setSeries(seriesData);
      setLabels(labelsData);

      const listData = categoriesData.map((item: DailyCategoryType) => ({
        title: item.category,
        time: item.time,
        viewer: item.avgViewer,
      }));

      setLists(listData);
      setCategoryData(responseData.data);
    };
    fetchData();
  }, [id, date]);

  const chartData = {
    series: series as number[],

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
      labels: labels as string[],
      tooltip: {
        y: {
          formatter: (value: number) =>
            `${(Math.floor((value / 3600) * 10) / 10).toLocaleString()}시간`,
        },
      },
      legend: {
        labels: {
          colors: "white",
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
      },
    },
  };

  return (
    <div className={style.wrapper}>
      <div className={style["chart-container"]}>
        <ApexChart
          type="pie"
          options={chartData.options}
          series={chartData.series}
          height="265%"
          width="100%"
        />
      </div>
      <div className={style["list-container"]}>
        <div className={style.label}>
          <div className={style.rank}>#</div>
          <div className={style.name}>카테고리</div>
          <div className={style.time}>
            <div>시간</div>
          </div>
          <div className={style.viewer}>평균 시청자수</div>
        </div>
        <hr />
        {categoryData &&
          lists &&
          lists.map((item, idx: number) => (
            <div className={style.list} key={idx}>
              <div className={style.rank}>{idx + 1}</div>
              <div className={style.name}>
                {item.title === "" ? "카테고리 없음" : item.title}
              </div>
              <div className={style.time}>
                <div>
                  {(Math.floor((item.time / 3600) * 10) / 10).toLocaleString()}
                  시간
                </div>
                <div>
                  {`(${((item.time * 100) / categoryData.totalTime).toFixed(1)}%)`}
                </div>
              </div>
              <div className={style.viewer}>
                {item.viewer.toLocaleString()}명
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
