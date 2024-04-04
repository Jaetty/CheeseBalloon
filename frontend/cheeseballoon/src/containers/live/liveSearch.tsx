"use client";

import { useEffect, useState } from "react";
import style from "./liveSearch.module.scss";

const API_URL = process.env.NEXT_PUBLIC_CATEGORY_API_URL;

async function getData() {
  const res = await fetch(`${API_URL}`);

  return res.json();
}

export default function LiveSearch() {
  const [categoriesInput, setCategoriesInput] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setCategoriesInput(data.data.categories);
    };

    fetchData();
  }, []);

  return (
    <div className={style.container}>
      <input type="text" id="1" defaultValue="1"></input>
    </div>
  );
}
