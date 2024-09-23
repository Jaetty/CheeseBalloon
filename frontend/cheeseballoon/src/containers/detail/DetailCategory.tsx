"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DetailCategoryChart from "src/containers/detail/DetailCategoryChart";
import styles from "./DetailCategory.module.scss";

type CategoryDataType = {
  totalTime: number;
  dailyCategories: [category: string, time: number, avgViewer: number];
};

type DailyCategoryType = {
  category: string;
  time: number;
  avgViewer: number;
};

type Accumulator = {
  seriesData: number[];
  labelsData: string[];
};

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

export default function DetailCategory() {
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

  return (
    categoryData && (
      <div>
        <div>
          <DetailCategoryChart series={series} labels={labels} />
        </div>
        <div className={styles["list-container"]}>
          <div className={styles.label}>
            <div className={styles.rank}>#</div>
            <div className={styles.name}>카테고리</div>
            <div className={styles.time}>
              <div>시간</div>
            </div>
            <div className={styles.viewer}>평균 시청자수</div>
          </div>
          <hr />
          {lists &&
            lists.map((item, idx: number) => (
              <div className={styles.list} key={idx}>
                <div className={styles.rank}>{idx + 1}</div>
                <div className={styles.name}>
                  {item.title === "" ? "카테고리 없음" : item.title}
                </div>
                <div className={styles.time}>
                  <div>
                    {(
                      Math.floor((item.time / 3600) * 10) / 10
                    ).toLocaleString()}
                    시간
                  </div>
                  <div>
                    {`(${((item.time * 100) / categoryData.totalTime).toFixed(1)}%)`}
                  </div>
                </div>
                <div className={styles.viewer}>
                  {item.viewer.toLocaleString()}명
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  );
}
