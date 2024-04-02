import style from "src/components/ranking/rankingindex.module.scss";
import Link from "next/link";

export default function Rank() {
  const numbers = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div className={style.rankbox}>
      <div className={style.maintitle}>팔로워 수</div>
      {numbers.map((number) => (
        <div key={number} className={style.item}>
          {number}
        </div>
      ))}
      <div className={style.divisionline}></div>
      <div className={style.morecontent}>
        <Link href="/ranking/detail/12341234" className={style.link}>
          더보기
        </Link>
      </div>
    </div>
  );
}
