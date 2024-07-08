import style from "src/containers/live/LiveHeader.module.scss";
import live from "src/stores/on_air.png";

export default function LiveHeader() {
  return (
    <div className={style.wrapper}>
      <div className={style["icon-container"]}>
        <img className={style.icon} src={live.src} alt="ON AIR" />
        <div className={style["page-name"]}>실시간 방송</div>
      </div>
      <p className={style["page-introduce"]}>
        현재 실시간 방송중인 방송들을 원하는대로 한눈에 모아보기
      </p>
    </div>
  );
}
