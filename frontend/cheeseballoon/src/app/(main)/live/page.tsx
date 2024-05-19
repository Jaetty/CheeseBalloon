import LiveHeader from "src/containers/live/LiveHeader";
import LiveList from "src/containers/live/LiveList";
import LiveCategory from "src/containers/live/LiveCategory";
import style from "src/app/(main)/live/page.module.scss";

export default function LivePage() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.header}>
          <LiveHeader />
        </div>
        <hr />
        <div className={style.search}>
          <LiveCategory />
        </div>
        <hr />
        <div className={style.live}>
          <LiveList />
        </div>
      </div>
    </div>
  );
}
