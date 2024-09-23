"use client";

import DetailSelectButton from "src/containers/detail/DetailSelectButton";
import DetailSelectDate from "src/containers/detail/DetailSelectDate";
import style from "src/containers/detail/DetailSelect.module.scss";

export default function DetailSelect() {
  return (
    <div className={style.wrapper}>
      <div className={style.select}>
        <DetailSelectButton />
      </div>
      <div className={style.date}>
        <DetailSelectDate />
      </div>
    </div>
  );
}
