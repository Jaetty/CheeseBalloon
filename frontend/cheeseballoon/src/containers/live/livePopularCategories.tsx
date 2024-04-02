"use client";

// import { useEffect } from "react";
import style from "./livePopularCategories.module.scss";

// const API_URL = process.env.NEXT_PUBLIC_LIVE_CATEGORY_API_URL;

// async function getData() {
//   const res = await fetch(`${API_URL}`);

//   return res.json();
// }

const data = { data: { categories: ["1", "2", "3"] } };

export default function LivePopularCategories() {
  // const data = await getData();
  return (
    <div className={style.categories}>
      {data.data.categories.map((category: string) => (
        <div className={style.category} key={category}>
          {category}
        </div>
      ))}
    </div>
  );
}
