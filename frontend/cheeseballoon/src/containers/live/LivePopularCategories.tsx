"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "src/containers/live/LivePopularCategories.module.scss";

const API_URL = process.env.NEXT_PUBLIC_HOT_CATEGORY_API_URL;

type categoriesType = string[];

async function getData() {
  const res = await fetch(`${API_URL}`);

  return res.json();
}

export default function LivePopularCategories() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.getAll("category");
  const [categories, setCategories] = useState<categoriesType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getData();
      const data = responseData.data.categories.filter(
        (category: string) => category !== ""
      );
      setCategories(data);
    };

    fetchData();
  }, []);

  const handleQuery = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (query.length >= 10) {
      return;
    }

    const newCategory = e.currentTarget.textContent;
    let newQuery;
    if (newCategory && !query.includes(newCategory)) {
      if (query.length > 0) {
        newQuery = `${query.join("&category=")}&category=${newCategory}`;
      } else {
        newQuery = newCategory;
      }
      const newPath = `${pathname}?category=${newQuery}`;
      router.push(newPath);
    }
  };

  return (
    <div className={style.categories}>
      {categories
        ? categories.map((category: string, idx: number) => (
            <button
              type="button"
              className={style.category}
              key={idx}
              onClick={handleQuery}
            >
              {category}
            </button>
          ))
        : null}
    </div>
  );
}
