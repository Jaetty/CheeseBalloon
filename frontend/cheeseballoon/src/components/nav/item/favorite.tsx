"use client";

import styles from "src/components/nav/item/favorite.module.scss";
import FavCard from "src/components/nav/item/favcard";
import Image from "next/legacy/image";
import arrow from "public/svgs/down_arrow.png";
import useToggleState from "src/stores/store";
import { useState, useEffect } from "react";

export default function Fav() {
  const { value } = useToggleState();
  const [data, setData] = useState([]);
  const [toggle1, setToggle] = useState(false);
  const switchToggle = () => {
    setToggle(!toggle1);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LIVE_API}?offset=10&limit=20`
      );
      const responseData = await response.json();
      setData(responseData.data);
    };

    fetchData();
  }, []);

  const visibleData = data.slice(0, 5);
  const hiddenData = data.slice(5, 15);

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
                더보기
                <Image src={arrow} alt="" />
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
