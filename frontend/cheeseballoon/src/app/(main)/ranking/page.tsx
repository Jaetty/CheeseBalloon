import Ranking from "src/containers/ranking/RankingIndex";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "치즈벌룬 - 랭킹",
  description:
    "치지직과 SOOP TV 방송인들의 주요 데이터들을 수집하여 제공합니다.",
  icons: {
    icon: "/svgs/cheese.png",
  },
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

export default function RankingPage() {
  return (
    <div>
      <Ranking />
    </div>
  );
}
