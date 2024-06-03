"use client";

import styles from "src/components/nav/item/FavIndex.module.scss";
import FavCard from "src/components/nav/item/FavCard";
import Image from "next/image";
import arrow from "public/svgs/down_arrow.png";
import { FavState } from "src/stores/store";
import { useState, useEffect } from "react";

interface ValueProps {
  value: boolean;
}

export default function Fav({ value }: ValueProps) {
  const { data: favData, setData: setFavData } = FavState();
  const [toggle1, setToggle] = useState(false);
  const switchToggle = () => {
    setToggle(!toggle1);
  };

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LIVE_API}?offset=1&limit=20`
    );
    const responseData = await response.json();
    setFavData(responseData.data);
  };

  useEffect(() => {
    const localFavData = JSON.parse(
      localStorage.getItem("fav-state") || '{"state": {"data": []}}'
    ).state.data;
    if (localFavData.length === 0) {
      fetchData();
    } else {
      setFavData(localFavData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleData = favData.slice(0, 5);
  const hiddenData = favData.slice(5, 15);

  return (
    <div>
      {value && (
        <div>
          <div className={styles.open_container}>
            <div className={styles.open_description}>즐겨찾기</div>
            {visibleData.map((item, index) => (
              <div key={index}>
                <FavCard data={item} />
              </div>
            ))}
            {toggle1 && (
              <>
                {hiddenData.map((item, index1) => (
                  <div key={index1}>
                    <FavCard data={item} />
                  </div>
                ))}
              </>
            )}
            {!toggle1 && (
              <div
                className={styles.open_morecontent}
                onClick={switchToggle}
                onKeyDown={switchToggle}
                role="presentation"
              >
                더보기&nbsp; <Image src={arrow} alt="" />
              </div>
            )}
            {toggle1 && (
              <div
                className={styles.open_morecontent}
                onClick={switchToggle}
                onKeyDown={switchToggle}
                role="presentation"
              >
                접기
                <div className={styles.open_image_rotate}>
                  <Image src={arrow} alt="" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {!value && (
        <div>
          <div className={styles.closed_container}>
            <div className={styles.closed_description}>즐겨찾기</div>
            {visibleData.map((item, index) => (
              <div key={index}>
                <FavCard data={item} />
              </div>
            ))}
            {toggle1 && (
              <>
                {hiddenData.map((item, index1) => (
                  <div key={index1}>
                    <FavCard data={item} />
                  </div>
                ))}
              </>
            )}
            {!toggle1 && (
              <div
                className={styles.closed_morecontent}
                onClick={switchToggle}
                onKeyDown={switchToggle}
                role="presentation"
              >
                <Image src={arrow} alt="" />
              </div>
            )}
            {toggle1 && (
              <div
                className={styles.closed_morecontent}
                onClick={switchToggle}
                onKeyDown={switchToggle}
                role="presentation"
              >
                <div className={styles.closed_image_rotate}>
                  <Image src={arrow} alt="" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
