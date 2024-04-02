"use client";

import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = e.currentTarget.query.value; // query를 현재 대상 요소에서 가져옴
    router.push(`/searchresult?query=${query}`);
  };

  return (
    <div className="search__input">
      <form onSubmit={handleSearch}>
        <input type="text" name="query" placeholder="검색어를 입력하세요" />
        <button type="submit">검색</button>
      </form>
    </div>
  );
}
