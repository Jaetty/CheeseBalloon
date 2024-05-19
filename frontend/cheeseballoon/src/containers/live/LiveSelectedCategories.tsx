"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "src/containers/live/LiveSelectedCategories.module.scss";

export default function LiveSelectedCategories() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.getAll("category");

  const handleQuery = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectCategory = e.currentTarget.value;
    const newQuery = query.filter((category) => category !== selectCategory);
    let newPath;
    if (newQuery.length > 0) {
      newPath = `${pathname}?category=${newQuery.join("&category=")}`;
    } else {
      newPath = `${pathname}`;
    }
    router.push(newPath);
  };

  return (
    <div>
      {query.length > 0 && (
        <div className={style.categories}>
          {query.map((params: string, idx: number) => (
            <div key={idx} className={style.category}>
              <div className={style.hash}>#</div>
              <div className={style.name}> {params} </div>
              <button
                type="button"
                className={style.x}
                value={params}
                onClick={(e) => handleQuery(e)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
