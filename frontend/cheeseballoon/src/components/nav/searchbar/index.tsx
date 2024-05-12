"use client";

import { useRouter } from "next/navigation";
import styles from "./searchIndex.module.scss";

export default function Search() {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = e.currentTarget.query.value; // query를 현재 대상 요소에서 가져옴
    router.push(`/searchresult?query=${query}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input className={styles.search__input} type="text" name="query" />
        {/* <button type="submit">검색</button> */}
      </form>
    </div>
  );
}
