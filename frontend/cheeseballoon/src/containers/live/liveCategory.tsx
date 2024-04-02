<<<<<<< HEAD
import LivePopularCategories from "./livePopularCategories";
import LiveSelectedCategories from "./liveSelectedCategories";
import LiveSearch from "./liveSearch";
=======
import LiveSearch from "./liveSearch";
import LivePopularCategories from "./livePopularCategories";
import LiveSelectedCategories from "./liveSelectedCategories";
>>>>>>> ac51269add7b7511c14ac32c724f421166ad45ff
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
