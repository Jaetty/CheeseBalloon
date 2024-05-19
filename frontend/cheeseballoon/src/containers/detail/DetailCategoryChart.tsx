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

type TreemapType = {
  x: string;
  y: number;
  z: number;
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
  const [treemapData, setTreemapData] = useState<TreemapType>([
    { x: "1", y: 1, z: 1 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getData(id as string, date as string);
      const dailyData = responseData.data.dailyCategories;
      dailyData.sort(
        (a: DailyCategoryType, b: DailyCategoryType) => b.time - a.time
      );

      const seriesData = dailyData.map((item: DailyCategoryType) => ({
        x: item.category,
        y: item.time,
        z: item.avgViewer,
      }));

      setTreemapData(seriesData);
      setCategoryData(responseData.data);
    };
    fetchData();
  }, [id, date]);

  const chartData = {
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
      tooltip: {
        x: {
          show: false,
        },
        y: {
          formatter: (value: number) => `${value.toLocaleString()}시간`,
        },
        z: {
          title: "평균 시청자수: ",
          formatter: (value: number) => `${value.toLocaleString()}명`,
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
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: true,
        },
      },
    },
    series: [
      {
        data: treemapData,
      },
    ],
  };

  return (
    <div className={style.wrapper}>
      <div className={style["chart-container"]}>
        <ApexChart
          type="treemap"
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
          <div className={style.viewer}>시청자수</div>
        </div>
        <hr />
        {categoryData &&
          treemapData &&
          treemapData.map((item, idx: number) => (
            <div className={style.list} key={idx}>
              <div className={style.rank}>{idx + 1}</div>
              <div className={style.name}>{item.x}</div>
              <div className={style.time}>
                <div>{item.y.toLocaleString()}시간</div>
                <div>
                  {`(${((item.y * 100) / categoryData.totalTime).toFixed(1)}%)`}
                </div>
              </div>
              <div className={style.viewer}>{item.z.toLocaleString()}명</div>
            </div>
          ))}
      </div>
    </div>
  );
}
