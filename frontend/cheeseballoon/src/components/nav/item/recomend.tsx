"use client";

import styles from "src/components/nav/item/recomend.module.scss";
import FavCard from "src/components/nav/item/favcard";
import Image from "next/image";
import arrow from "public/svgs/down_arrow.png";
import { useState } from "react";
import useToggleState from "src/stores/store";

export default function Recomend() {
  const { value } = useToggleState();
  const [toggle2, setToggle] = useState(false);
  const switchToggle = () => {
    setToggle(!toggle2);
  };
  return (
    <div className={styles.container}>
      <div className={value ? styles.description : styles.closed_description}>
        추천
      </div>
      <FavCard />
      <FavCard />
      <FavCard />
      <FavCard />
      <FavCard />
      {toggle2 && (
        <>
          <FavCard />
          <FavCard />
          <FavCard />
          <FavCard />
          <FavCard />
          <FavCard />
          <FavCard />
          <FavCard />
          <FavCard />
          <FavCard />
        </>
      )}
      {!toggle2 && (
        <div
          className={value ? styles.morecontent : styles.closed_morecontent}
          onClick={switchToggle}
          onKeyDown={switchToggle}
          role="presentation"
        >
          {value && "더보기"}
          <Image src={arrow} alt="" />
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
