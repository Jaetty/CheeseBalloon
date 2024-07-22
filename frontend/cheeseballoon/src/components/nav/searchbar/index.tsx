"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import searchBtn from "src/stores/search_button.png";
import styles from "./index.module.scss";
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/searchresult?query=${query}`);
      setQuery("");
    }
  };

  const handleDivClick = () => {
    if (query.trim()) {
      router.push(`/searchresult?query=${query}`);
      setQuery("");
    }
  };

  return (
    <div className={styles.search_box}>
      <form className={styles.search_box} onSubmit={handleSearch}>
        <div className={styles.search__input_container}>
          <input
            className={styles.search__input}
            type="text"
            name="query"
            placeholder="스트리머, 방송 제목 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className={styles.search_btn} onClick={handleDivClick}>
            <img src={searchBtn.src} alt="Search Button" />
          </div>
        </div>
      </form>
    </div>
  );
}
