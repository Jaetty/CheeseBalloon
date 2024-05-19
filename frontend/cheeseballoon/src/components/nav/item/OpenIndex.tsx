"use client";

import style from "src/components/nav/item/tmpopenIndex.module.scss";
import Shortcut from "src/components/nav/item/tmpshorcut";
import Fav from "src/components/nav/item/tmpfavorite";
import Recomend from "./tmprecomend";

export default function Open() {
  return (
    <div className={style.body}>
      <Shortcut />
      <Fav />
      <Recomend />
    </div>
  );
}
