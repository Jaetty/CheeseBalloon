import Subranking from "src/containers/ranking/SubrankingIndex";
import { Metadata } from "next";

const rankingTitles: { [key: string]: string } = {
  follow: "치즈벌룬 - 팔로워 랭킹",
  average: "치즈벌룬 - 평균 시청자 랭킹",
  topview: "치즈벌룬 - 최고 시청자 랭킹",
  time: "치즈벌룬 - 방송시간 랭킹",
  rating: "치즈벌룬 - 시청률 랭킹",
  live: "치즈벌룬 - 실시간 방송 랭킹",
};

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const title = rankingTitles[params.id] || "치즈벌룬 - 랭킹";

  return {
    title,
    description: `치즈벌룬에서 ${title}을 확인해보세요.`,
  };
}

export default function SubrankingPage() {
  return (
    <div>
      <Subranking />
    </div>
  );
}
