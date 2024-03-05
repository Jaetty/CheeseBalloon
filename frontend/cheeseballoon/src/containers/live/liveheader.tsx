import header from "./liveheader.module.scss";

export default function LiveHeader() {
  return (
    <div className={header.entire}>
      <img className={header.liveicon} src="svgs/liveicon.png" alt="" />
      <div className={header.letter}>
        <p className={header.header}>모아보기</p>
        <p className={header.introduce}>
          현재 실시간 방송중인 방송들을 원하는대로 한눈에 모아보기
        </p>
      </div>
    </div>
  );
}
