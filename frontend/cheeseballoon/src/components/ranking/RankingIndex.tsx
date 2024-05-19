import style from "src/components/ranking/RankingIndex.module.scss";
import Card from "src/components/ranking/RankingIndexCard";
import Link from "next/link";
import {
  FollowRankData,
  AvgRankData,
  TopviewRankData,
  TimeRankData,
  RatingRankData,
  LiveRankData,
} from "src/types/type";

type Props = {
  title: string;
  data:
    | FollowRankData[]
    | AvgRankData[]
    | TopviewRankData[]
    | TimeRankData[]
    | RatingRankData[]
    | LiveRankData[];
};

export default function Rank({ title, data }: Props) {
  const mapping: Record<string, string> = {
    "팔로워 수": "follow",
    "평균 시청자 수": "average",
    "최고 시청자 수": "topview",
    "총 방송시간": "time",
    시청률: "rating",
    "실시간 LIVE": "live",
  };

  const subtitle = mapping[title];
  return (
    <div className={style.rankbox}>
      <div className={style.maintitle}>{title}</div>
      {data?.map((item, index) => (
        <div key={index} className={style.item}>
          <Card number={index + 1} item={item} title={title} />
        </div>
      ))}
      <div className={style.divisionline}></div>
      <div className={style.morecontent}>
        <Link href={`/ranking/detail/${subtitle}`} className={style.link}>
          더보기
        </Link>
      </div>
    </div>
  );
}
