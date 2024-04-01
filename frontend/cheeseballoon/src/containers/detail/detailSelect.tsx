"use client";

import DetailSelectButton from "./detailSelectButton";
import style from "./detailSelect.module.scss";

export default function DetailSelect() {
  return (
    <div>
      <div className={style.select}>
        <DetailSelectButton />
      </div>
    </div>
  );
}
