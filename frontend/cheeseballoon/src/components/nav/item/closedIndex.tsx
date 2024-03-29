"use client";

import style from "src/components/nav/item/closedIndex.module.scss";
import Shortcut from "src/components/nav/item/shorcut";
import Fav from "src/components/nav/item/favorite";
import Recomend from "./recomend";

export default function Closed() {
  return (
    <div className={style.body}>
      <Shortcut />
      <Fav />
      <Recomend />
    </div>
  );
}
