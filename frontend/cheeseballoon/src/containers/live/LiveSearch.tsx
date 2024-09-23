"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/legacy/image";
import style from "./LiveSearch.module.scss";
import searchIcon from "../../stores/search_glass.png";

const API_URL = process.env.NEXT_PUBLIC_LIVE_CATEGORY_API_URL;

type searchType = string[];

async function getData(query: string) {
  const res = await fetch(`${API_URL}${query}`);

  return res.json();
}

export default function LiveSearch() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResponse, setSearchResponse] = useState<searchType>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [isKeyboardNavigation, setIsKeyboardNavigation] =
    useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.getAll("category");
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isKeyboardNavigation) {
      const selected = selectRef?.current?.querySelector(`.${style.hover}`);
      if (selected) {
        selected?.scrollIntoView({
          block: "center",
        });
      }
    }
  }, [selectedItemIndex, isKeyboardNavigation]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getData(searchInput);
      const data = responseData.data.categories.filter(
        (category: string) => category !== ""
      );
      setSearchResponse(data);
    };
    if (searchInput) {
      fetchData();
    } else {
      setSearchResponse([]);
    }
  }, [searchInput]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setSelectedItemIndex(0);
    setIsKeyboardNavigation(false);
  };

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
    setSearchInput("");
    setSelectedItemIndex(0);
    setIsKeyboardNavigation(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setIsKeyboardNavigation(true);
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedItemIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedItemIndex((prevIndex) =>
        prevIndex < searchResponse.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "Enter") {
      let newQuery;
      const newCategory = searchResponse[selectedItemIndex];
      if (newCategory && !query.includes(newCategory)) {
        if (query.length > 0) {
          newQuery = `${query.join("&category=")}&category=${newCategory}`;
        } else {
          newQuery = newCategory;
        }
        const newPath = `${pathname}?category=${newQuery}`;
        router.push(newPath);
        setSearchInput("");
        setSelectedItemIndex(0);
        setIsKeyboardNavigation(false);
      }
    }
  };

  return (
    <div className={style.container}>
      <div className={style.icon}>
        <Image src={searchIcon} alt="" />
      </div>
      <input
        type="search"
        placeholder="카테고리를 입력해주세요"
        className={style.input}
        value={searchInput}
        onChange={handleInput}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          setTimeout(() => {
            setIsOpen(false);
          }, 100);
        }}
        onKeyDown={handleKeyDown}
      ></input>
      {isOpen && (
        <div className={style["dropdown-container"]}>
          {searchResponse.length ? (
            <div className={style.dropdown} ref={selectRef}>
              {searchResponse.map((item, index) => (
                <div key={index}>
                  <button
                    type="button"
                    className={`${style.dropdownItem} ${selectedItemIndex === index ? style.hover : null}`}
                    onClick={(e) => {
                      handleQuery(e);
                    }}
                    onMouseEnter={() => {
                      setSelectedItemIndex(index);
                      setIsKeyboardNavigation(false);
                    }}
                  >
                    {item}
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
