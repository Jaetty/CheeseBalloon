import Link from "next/link";
import { useParams } from "next/navigation";
import error from "public/svgs/cheese3.png";
import styles from "src/components/notice/NoticeCard.module.scss";

interface NoticeDataType {
  noticeInfo: {
    noticeId: number;
    title: string;
    content: string;
    thumbnail: string;
    regDt: string;
    nickname: string;
  };
}

export default function NoticeCard({ noticeInfo }: NoticeDataType) {
  const { page } = useParams();

  const dateRegDt = new Date(noticeInfo.regDt);
  const date = dateRegDt.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <div className={styles.wrap}>
      <Link
        key={noticeInfo.noticeId}
        href={
          page
            ? `/notice/${page}/${noticeInfo.noticeId}`
            : `/notice/1/${noticeInfo.noticeId}`
        }
        className={styles.cardlink}
      >
        <div className={styles.box}>
          <div className={styles["image-container"]}>
            <img
              src={noticeInfo.thumbnail || ""}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = error.src;
              }}
              alt="이미지"
              className={styles.image}
            />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.update}>업데이트</div>
            <div className={styles.title}>{noticeInfo.title}</div>
            <div className={styles.date}>{date}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
