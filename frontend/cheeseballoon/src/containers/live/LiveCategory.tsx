import LivePopularCategories from "src/containers/live/LivePopularCategories";
import LiveSelectedCategories from "src/containers/live/LiveSelectedCategories";
import LiveSearch from "src/containers/live/LiveSearch";
import style from "src/containers/live/LiveCategory.module.scss";

export default function LiveCategory() {
  return (
    <div className={style.wrapper}>
      <div className={style["search-container"]}>
        <div>
          <LiveSearch />
        </div>
        <div>
          <LivePopularCategories />
        </div>
      </div>
      <div className={style.tags}>
        <div>
          <LiveSelectedCategories />
        </div>
      </div>
    </div>
  );
}
