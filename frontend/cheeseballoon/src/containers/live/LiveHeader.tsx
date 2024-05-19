import style from "src/containers/live/LiveHeader.module.scss";

export default function LiveHeader() {
  return (
    <div className={style.wrapper}>
      <div className={style["icon-container"]}>
        <img className={style.icon} src="svgs/liveicon.png" alt="" />
        <div className={style["page-name"]}>모아보기</div>
      </div>
      <p className={style["page-introduce"]}>
        현재 실시간 방송중인 방송들을 원하는대로 한눈에 모아보기
      </p>
    </div>
  );
}
