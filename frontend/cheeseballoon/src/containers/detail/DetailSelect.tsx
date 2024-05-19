"use client";

import DetailSelectButton from "./tmpdetailSelectButton";
import style from "./tmpdetailSelect.module.scss";

export default function DetailSelect() {
  return (
    <div>
      <div className={style.select}>
        <DetailSelectButton />
      </div>
    </div>
  );
}
