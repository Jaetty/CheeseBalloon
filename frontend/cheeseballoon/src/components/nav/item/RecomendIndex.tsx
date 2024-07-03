"use client";

import styles from "src/components/nav/item/RecomendIndex.module.scss";
import RecomendCard from "src/components/nav/item/RecomendCard";
import Image from "next/image";
import arrow from "public/svgs/down_arrow.png";
import { useState, useEffect } from "react";
import { RecommendState } from "src/stores/store";

interface ValueProps {
  value: boolean;
}

export default function Recomend({ value }: ValueProps) {
  const { data, setData, lastFetchTime, setLastFetchTime } = RecommendState();
  const [toggle2, setToggle] = useState(false);

  const switchToggle = () => {
    setToggle(!toggle2);
  };
  useEffect(() => {
    const fetchData = async () => {
      const currentTime = new Date().getTime();
      const localData = JSON.parse(
        localStorage.getItem("recomend-state") ||
          '{"state": {"data": [], "lastFetchTime": null}}'
      ).state;

      if (
        !localData ||
        !localData.data ||
        !localData.lastFetchTime ||
        currentTime - localData.lastFetchTime >= 600000
      ) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LIVE_API}?offset=0&limit=15`
        );
        const responseData = await response.json();
        const fetchedData = responseData.data;

        setData(fetchedData);
        setLastFetchTime(currentTime);
      } else {
        setData(localData.data);
      }
    };

    fetchData();
  }, [setData, setLastFetchTime]);

  const visibleData = data.slice(0, 5);
  const hiddenData = data.slice(5, 15);

  return (
    <div className={styles.container}>
      <div className={value ? styles.description : styles.closed_description}>
        추천
      </div>
      {visibleData.map((item, index) => (
        <div key={index}>
          <RecomendCard data={item} />
        </div>
      ))}
      {toggle2 && (
        <>
          {hiddenData.map((item, index1) => (
            <div key={index1}>
              <RecomendCard data={item} />
            </div>
          ))}
        </>
      )}
      {!toggle2 && (
        <div
          className={value ? styles.morecontent : styles.closed_morecontent}
          onClick={switchToggle}
          onKeyDown={switchToggle}
          role="presentation"
        >
          {value && "더보기"}&nbsp; <Image src={arrow} alt="" />
        </div>
      )}
      {toggle2 && (
        <div
          className={value ? styles.morecontent : styles.closed_morecontent}
          onClick={switchToggle}
          onKeyDown={switchToggle}
          role="presentation"
        >
          {value && "접기"}
          <div className={styles.image_rotate}>
            <Image src={arrow} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}
