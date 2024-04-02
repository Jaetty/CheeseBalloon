import style from "src/components/ranking/rankingindex.module.scss";
import Card from "src/components/ranking/rankingIndexCard";
import Link from "next/link";

type Props = {
  title:
    | "팔로워 수"
    | "평균 시청자 수"
    | "최고 시청자 수"
    | "총 방송시간"
    | "시청률"
    | "실시간 LIVE";
};

export default function Rank({ title }: Props) {
  const numbers = Array.from({ length: 10 }, (_, index) => index + 1);
  const mapping = {
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
      {numbers.map((number) => (
        <div key={number} className={style.item}>
          <Card number={number} />
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
