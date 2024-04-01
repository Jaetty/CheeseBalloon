import LiveSearch from "./liveSearch";
import LivePopularCategories from "./livePopularCategories";
import LiveSelectedCategories from "./liveSelectedCategories";
import style from "./liveCategory.module.scss";

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
