"use client";

import styles from "src/components/nav/item/FavIndex.module.scss";
import FavCard from "src/components/nav/item/FavCard";
import Image from "next/image";
import arrow from "public/svgs/down_arrow.png";
import { useState, useEffect } from "react";

interface ValueProps {
  value: boolean;
}

export default function Fav({ value }: ValueProps) {
  const [favData, setFavData] = useState([]);
  const [toggle1, setToggle] = useState(false);

  const switchToggle = () => {
    setToggle(!toggle1);
  };

  const fetchData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MYPAGE_BOOK}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_AUTH}`,
      },
    });
    const responseData = await response.json();
    setFavData(responseData.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
