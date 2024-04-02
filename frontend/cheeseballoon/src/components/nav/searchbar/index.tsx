"use client";

import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    // 이벤트 객체 타입 명시
    e.preventDefault();
    const query = e.currentTarget.searchQuery.value; // 현재 대상 요소에 직접 액세스
    router.push(`/searchresult?query=${query}`);
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
