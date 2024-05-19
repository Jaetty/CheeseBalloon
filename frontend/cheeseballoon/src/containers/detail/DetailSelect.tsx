"use client";

import DetailSelectButton from "src/containers/detail/DetailSelectButton";
import style from "src/containers/detail/DetailSelect.module.scss";

export default function DetailSelect() {
  return (
    <div>
      <div className={style.select}>
        <DetailSelectButton />
      </div>
    </div>
  );
}
