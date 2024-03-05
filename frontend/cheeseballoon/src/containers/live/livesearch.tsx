"use client";

import { useState } from "react";
import style from "./livesearch.module.scss";

export default function LiveSearch() {
  const [isInputFocus, setIsInputFocus] = useState(false);

  return (
    <div className={style.search}>
      <input
        type="text"
        placeholder={isInputFocus ? "" : "카테고리를 입력해주세요"}
        onFocus={() => setIsInputFocus(true)}
        onBlur={() => setIsInputFocus(false)}
      />
    </div>
  );
}
