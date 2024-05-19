"use client";

import style from "src/components/nav/item/openIndex.module.scss";
import Shortcut from "src/components/nav/item/shorcut";
import Fav from "src/components/nav/item/favorite";
import Recomend from "./recomend";

export default function Open() {
  return (
    <div className={style.body}>
      <Shortcut />
      <Fav />
      <Recomend />
    </div>
  );
}
