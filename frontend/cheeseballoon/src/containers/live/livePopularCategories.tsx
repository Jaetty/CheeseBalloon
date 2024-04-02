"use client";

import style from "./livePopularCategories.module.scss"

const API_URL = process.env.NEXT_PUBLIC_API_URL;
async function getData() {
  const res = await fetch(`${API_URL}live/category/hot?limit=10`);

  if (!res.ok) {
    throw new Error("데이터 수신 실패");
  }
  return res.json();
}

export default async function LivePopularCategories() {
  const data = await getData();
  return (
    <div className={style.categories}>
      {data.data.categories.map((category: string) => (
        <div className={style.category} key={category}>{category}</div>
      ))}
    </div>
  );
}
