import Notice from "src/containers/notice/NoticeIndex";
import styles from "./page.module.scss";

export default function NoticeIndexPage() {
  return (
    <div className={styles.wrapper}>
      <Notice />
    </div>
  );
}
