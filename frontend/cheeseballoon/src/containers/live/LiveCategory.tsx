"use client";

import { isMobileState } from "@/src/stores/store";
import LivePopularCategories from "src/containers/live/LivePopularCategories";
import LiveSelectedCategories from "src/containers/live/LiveSelectedCategories";
import LiveSearch from "src/containers/live/LiveSearch";
import style from "src/containers/live/LiveCategory.module.scss";

export default function LiveCategory() {
  const isMobile = isMobileState((state) => state.isMobile);

  return isMobile ? (
    <div className={style.wrapper}>
      <div className={style.tags}>
        <LiveSelectedCategories />
      </div>
      <div className={style["search-container"]}>
        <LiveSearch />
      </div>
    </div>
  ) : (
    <div className={style.wrapper}>
      <div className={style["search-container"]}>
        <LiveSearch />
        <div>
          <LivePopularCategories />
        </div>
      </div>
      <div className={style.tags}>
        <LiveSelectedCategories />
      </div>
    </div>
  );
}
