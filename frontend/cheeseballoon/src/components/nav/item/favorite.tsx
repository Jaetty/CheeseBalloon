"use client";

import styles from "src/components/nav/item/favorite.module.scss";
import FavCard from "src/components/nav/item/favcard";
import Image from "next/image";
import arrow from "public/svgs/down_arrow.png";
import useToggleState from "src/stores/store";
import { useState } from "react";

export default function Fav() {
  const { value } = useToggleState();
  const [toggle1, setToggle] = useState(false);
  const switchToggle = () => {
    setToggle(!toggle1);
  };
  return (
    <div>
      {value && (
        <div>
          <div className={styles.open_container}>
            <div className={styles.open_description}>즐겨찾기</div>
            <FavCard />
            <FavCard />
            <FavCard />
            <FavCard />
            <FavCard />
            {toggle1 && (
              <>
                <FavCard />
                <FavCard />
                <FavCard />
                <FavCard />
                <FavCard />
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
                <div className={styles.image_rotate}>
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
            <FavCard />
            <FavCard />
            <FavCard />
            <FavCard />
            <FavCard />
            {toggle1 && (
              <>
                <FavCard />
                <FavCard />
                <FavCard />
                <FavCard />
                <FavCard />
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
