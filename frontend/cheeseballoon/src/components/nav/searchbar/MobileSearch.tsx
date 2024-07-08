"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "src/components/nav/searchbar/MobileSearch.module.scss";

interface Props {
  onClose: () => void;
}

export default function SearchModal({ onClose }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/searchresult?query=${query}`);
      setQuery("");
      onClose();
    }
  };

  const handleDivClick = () => {
    if (query.trim()) {
      router.push(`/searchresult?query=${query}`);
      setQuery("");
      onClose();
    }
  };

  return (
    <div className={styles.modal}>
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
        </div>
      </form>
    </div>
  );
}
