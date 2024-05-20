import styles from "src/containers/notice/NoticeIndex.module.scss";
import NoticeCard from "src/components/notice/NoticeCard";
import Link from "next/link";

export default function NoticeIndex() {
  return (
    <div className={styles.wrapper}>
      <div>
        <p className={styles.title}>Notice</p>
        <div className={styles.subtitle}>
          치즈벌룬의 업데이트 및 다양한 소식을 알려드립니다.
        </div>
      </div>
      <Link href="/notice/1" className={styles.cardlink}>
        <div className={styles.card}>
          <NoticeCard />
        </div>
      </Link>
      <div className={styles.pagination}>
        <div className={styles.pageNumber}>1</div>
      </div>
    </div>
  );
}
