import styles from "src/components/notice/NoticeCard.module.scss";
import MainImage from "src/stores/no_image_profile.png";
import Image from "next/image";

export default function NoticeCard() {
  return (
    <div className={styles.wrap}>
      <div className={styles.box}>
        <Image
          src={MainImage}
          alt="Main Image"
          width={200}
          height={130}
          className={styles.image}
        />
        <div className={styles.textContainer}>
          <div className={styles.update}>업데이트</div>
          <div className={styles.title}>첫번째 업데이트</div>
          <div className={styles.date}>2024/05/20</div>
        </div>
      </div>
    </div>
  );
}
