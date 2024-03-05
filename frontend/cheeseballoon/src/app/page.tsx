import styles from "src/styles/page.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.description}>
        {/* app/layout.tsx는 전체 글로벌하게 작동할 레이아웃을 작성 */}
        <p>main page입니다&nbsp;</p>
      </div>
    </div>
  );
}
