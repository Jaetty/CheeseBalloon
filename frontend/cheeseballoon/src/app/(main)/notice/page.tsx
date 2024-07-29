import Notice from "src/containers/notice/NoticeIndex";
import styles from "./page.module.scss";

export default function NoticePage() {
  return (
    <div className={styles.wrapper}>
      <Notice />
    </div>
  );
}
