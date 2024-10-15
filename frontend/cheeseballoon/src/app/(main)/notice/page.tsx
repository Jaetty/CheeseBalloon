import { Metadata } from "next";
import Notice from "src/containers/notice/NoticeIndex";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "치즈벌룬 - 공지사항",
  description:
    "치지직과 SOOP TV 방송인들의 주요 데이터들을 수집하여 제공합니다.",
  icons: {
    icon: "/svgs/cheese.png",
  },
};

export default function NoticePage() {
  return (
    <div className={styles.wrapper}>
      <Notice />
    </div>
  );
}
