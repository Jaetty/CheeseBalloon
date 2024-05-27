import styles from "src/containers/notice/DetailNotice.module.scss";
import Link from "next/link";

export default function DetailNoticeIndex() {
  return (
    <div className={styles.wrapper}>
      <div>
        <p className={styles.title}>Notice</p>
        <div className={styles.subtitle}>
          치즈벌룬의 업데이트 및 다양한 소식을 알려드립니다.
        </div>
      </div>
      <div className={styles.linkto}>
        <Link href="/notice" className={styles.cardlink}>
          ◀️ 전체 목록
        </Link>
      </div>
      <div className={styles.titlebox}>
        <div className={styles.wrap}>
          <div className={styles.date}>2024/05/20</div>
          <div className={styles.maintitle}>첫번째 업데이트 공지</div>
        </div>
      </div>
      <div className={styles.bodybox}>
        <p>크롤링 관련 이슈로 인하여 점검이 예정되어 있습니다.</p> 너그러운 양해
        부탁드리며 자세한 점검시간과 작업영향은 아래 내용을 확인해 주시기
        바랍니다.
        <p>
          <br></br>▣ 점검시간과 작업영향{" "}
        </p>
        <p>
          <br></br>- 오전 6시 ~ 오전 9시(3시간)
        </p>
        : 서비스 이용이 불가합니다.
        <p>
          <br></br>감사합니다.
        </p>
      </div>
      <div className={styles.endline}>
        <div className={styles.lineItem}>
          <span className={styles.leftText}>&uarr;이전글</span>
          <span className={styles.rightText}>이전 글이 없습니다</span>
        </div>
        <div className={styles.lineItem}>
          <span className={styles.leftText}>&darr;다음글</span>
          <span className={styles.rightText}>다음 글이 없습니다</span>
        </div>
      </div>
    </div>
  );
}
