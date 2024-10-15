import { Metadata } from "next";
import NoticeDetail from "src/containers/notice/NoticeDetail";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "치즈벌룬 - 공지사항",
  description:
    "치지직과 SOOP TV 방송인들의 주요 데이터들을 수집하여 제공합니다.",
  icons: {
    icon: "/svgs/cheese.png",
  },
  robots: "noindex, nofollow",
};

export default function NoticeDetailPage() {
  return (
    <div className={styles.wrapper}>
      <NoticeDetail />
    </div>
  );
}
