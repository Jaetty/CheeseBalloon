"use client";

import { useEffect, useState } from "react";
import style from "./livePopularCategories.module.scss";

const API_URL = process.env.NEXT_PUBLIC_HOT_CATEGORY_API_URL;

type categoriesType = string[];

async function getData() {
  const res = await fetch(`${API_URL}`);

  return res.json();
}

export default function LivePopularCategories() {
  const [categories, setCategories] = useState<categoriesType | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getData();
  //     setCategories(data.data.categories);
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className={style.categories}>
        {categories
          ? categories.map((category: string, idx: number) => (
              <div className={style.category} key={idx}>
                {category}
              </div>
            ))
          : null}
    </div>
  );
}
