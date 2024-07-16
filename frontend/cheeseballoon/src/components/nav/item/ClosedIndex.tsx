"use client";

import style from "src/components/nav/item/ClosedIndex.module.scss";
import Shortcut from "src/components/nav/item/ShortCut";
import Fav from "src/components/nav/item/FavIndex";
import Recomend from "src/components/nav/item/RecomendIndex";
import { useState } from "react";

interface ValueProps {
  value: boolean;
}

export default function Closed({ value }: ValueProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${style.body} ${isHovered ? style.hovered : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Shortcut value={value} />
      <Fav value={value} />
      <Recomend value={value} />
    </div>
  );
}
