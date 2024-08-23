"use client";

import styles from "src/components/nav/item/FavIndex.module.scss";
import FavCard from "src/components/nav/item/FavCard";
import Image from "next/image";
import arrow from "public/svgs/down_arrow.png";
import { useState, useEffect } from "react";
import customFetch from "src/lib/CustomFetch";

interface ValueProps {
  value: boolean;
}

export interface FavState {
  bookmarkId: number;
  streamerId: number;
  name: string;
  platform: string;
  streamUrl: string;
  profileUrl: string;
  followerCnt: number;
  isLive: boolean;
}

export default function Fav({ value }: ValueProps) {
  const [favData, setFavData] = useState<FavState[] | null>(null);
  const [toggle1, setToggle] = useState(false);

  const switchToggle = () => {
    setToggle(!toggle1);
  };

  const fetchData = async () => {
    const response = await customFetch(
      `${process.env.NEXT_PUBLIC_MYPAGE_BOOK}`,
      {
        method: "GET",
      }
    );

    if (response && response.status === 401) {
      // 401 에러가 발생한 경우 null을 반환하여 아무것도 렌더링하지 않음
      setFavData(null);
      return;
    }

    // response가 null인 경우, 데이터를 설정하지 않고 반환
    if (response === null) {
      setFavData(null);
      return;
    }

    const responseData = await response.json();
    const sortedData = responseData.data.sort((a: FavState, b: FavState) => {
      if (a.isLive === b.isLive) {
        return b.followerCnt - a.followerCnt;
      }
      return a.isLive ? -1 : 1;
    });

    setFavData(sortedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // favData가 null이면 아무것도 렌더링하지 않음
  if (favData === null) {
    return null;
  }

  const visibleData = favData.slice(0, 5);
  const hiddenData = favData.length > 5 ? favData.slice(5) : null;

  return (
    <div className={value ? styles.open_container : styles.closed_container}>
      <div
        className={value ? styles.open_description : styles.closed_description}
      >
        즐겨찾기
      </div>
      {visibleData.map((item, index) => (
        <div key={index}>
          <FavCard data={item} />
        </div>
      ))}
      {toggle1 && hiddenData && (
        <>
          {hiddenData.map((item, index1) => (
            <div key={index1}>
              <FavCard data={item} />
            </div>
          ))}
        </>
      )}
      {hiddenData !== null && (
        <>
          {!toggle1 && (
            <div
              className={
                value ? styles.open_morecontent : styles.closed_morecontent
              }
              onClick={switchToggle}
              onKeyDown={switchToggle}
              role="presentation"
            >
              {value ? "더보기" : ""}
              &nbsp;
              <Image src={arrow} alt="" />
            </div>
          )}
          {toggle1 && (
            <div
              className={
                value ? styles.open_morecontent : styles.closed_morecontent
              }
              onClick={switchToggle}
              onKeyDown={switchToggle}
              role="presentation"
            >
              {value ? "접기" : ""}
              <div
                className={
                  value ? styles.open_image_rotate : styles.closed_image_rotate
                }
              >
                <Image src={arrow} alt="" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
