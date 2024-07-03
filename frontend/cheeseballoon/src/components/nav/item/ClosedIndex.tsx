"use client";

import style from "src/components/nav/item/ClosedIndex.module.scss";
import Shortcut from "src/components/nav/item/ShortCut";
import Fav from "src/components/nav/item/FavIndex";
import Recomend from "src/components/nav/item/RecomendIndex";

interface ValueProps {
  value: boolean;
}

export default function Closed({ value }: ValueProps) {
  return (
    <div className={style.body}>
      <Shortcut value={value} />
      <Fav value={value} />
      <Recomend value={value} />
    </div>
  );
}
