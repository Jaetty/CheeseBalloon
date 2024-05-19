import LivePopularCategories from "./tmplivePopularCategories";
import LiveSelectedCategories from "./tmpliveSelectedCategories";
import LiveSearch from "./tmpliveSearch";
import style from "./tmpliveCategory.module.scss";

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
