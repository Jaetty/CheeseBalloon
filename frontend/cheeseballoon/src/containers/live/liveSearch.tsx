"use client";

import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import style from "./liveSearch.module.scss";
import searchIcon from "../../stores/search_glass.png";

const API_URL = process.env.NEXT_PUBLIC_CATEGORY_API_URL;

type searchType = string[];

async function getData(query: string) {
  const res = await fetch(`${API_URL}${query}`);

  return res.json();
}

export default function LiveSearch() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResponse, setSearchResponse] = useState<searchType>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(searchInput);
      setSearchResponse(data.data.categories);
    };

    fetchData();
  }, [searchInput]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className={style.container}>
      <div className={style.icon}>
        <Image src={searchIcon} alt="" layout="responsive" />
      </div>
      <input
        type="search"
        placeholder="카테고리를 입력해주세요"
        className={style.input}
        value={searchInput}
        onChange={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      ></input>
      {isFocused && searchInput && (
        <div className={style["dropdown-container"]}>
          {searchResponse.length ? (
            <div className={style.dropdown}>
              {searchResponse.map((item, index) => (
                <div key={index} className={style.dropdownItem}>
                  {item}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
