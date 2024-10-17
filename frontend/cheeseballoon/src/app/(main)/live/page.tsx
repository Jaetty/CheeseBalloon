import { Metadata } from "next";
import LiveHeader from "src/containers/live/LiveHeader";
import LiveList from "src/containers/live/LiveList";
import LiveCategory from "src/containers/live/LiveCategory";
import style from "src/app/(main)/live/page.module.scss";

export const metadata: Metadata = {
  title: "치즈벌룬 - 실시간 방송",
  description:
    "치지직과 SOOP TV 방송인들의 주요 데이터들을 수집하여 제공합니다.",
  keywords: [
    "치즈벌룬",
    "아프리카tv",
    "SOOP TV",
    "숲",
    "치지직",
    "방송 통계",
    "랭킹",
    "실시간 방송",
    "인터넷 방송",
    "시청자수",
    "시청률",
    "팔로워",
    "방송 시간",
  ],
};

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
