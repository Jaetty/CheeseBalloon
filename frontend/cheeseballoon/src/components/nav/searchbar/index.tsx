"use client";

import { useRouter } from "next/navigation"; // 수정: next/router에서 useRouter 가져오기

export default function Search() {
  const router = useRouter(); // 수정: useRouter 사용

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.searchQuery.value;
    router.push(`/searchresult?query=${query}`); // 수정: router.push 사용
  };

  return (
    <div className="search__input">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="searchQuery"
          placeholder="검색어를 입력하세요"
        />
        <button type="submit">검색</button>
      </form>
    </div>
  );
}
