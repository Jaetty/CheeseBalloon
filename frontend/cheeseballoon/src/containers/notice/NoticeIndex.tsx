"use client";

import styles from "src/containers/notice/NoticeIndex.module.scss";
import NoticeCard from "src/components/notice/NoticeCard";
import { useEffect, useState } from "react";

interface NoticeDataType {
  noticeId: number;
  title: string;
  content: string;
  thumbnail: string;
  regDt: string;
  nickname: string;
}

const API_URL = process.env.NEXT_PUBLIC_NOTICE_ALL_API_URL;

export default function NoticeIndex() {
  const [noticeData, setNoticeData] = useState<NoticeDataType[] | null>(null);
  const [noticePage, setNoticePage] = useState<number>(1);

  const pageSize = 5;
  const pageNumbers = [];
  if (noticeData) {
    for (let i = 2; i <= Math.ceil(noticeData.length / pageSize); i += 1) {
      pageNumbers.push(i);
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [noticePage]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}?limit=1000&offset=0`);
      const data = await res.json();

      setNoticeData(data.data);
    };
    fetchData();
  }, []);

  const handlePage = (pageNum: number) => {
    setNoticePage(pageNum);
  };

  const handlePageKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    pageNum: number
  ) => {
    if (event.key === "Enter") {
      handlePage(pageNum);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div>
        <p className={styles.title}>Notice</p>
        <div className={styles.subtitle}>
          치즈벌룬의 업데이트 및 다양한 소식을 알려드립니다.
        </div>
      </div>
      {noticeData && noticeData.length > 0 ? (
        noticeData
          .slice((noticePage - 1) * pageSize, noticePage * pageSize)
          .map((noticeInfo) => (
            <div className={styles.card} key={noticeInfo.noticeId}>
              <NoticeCard noticeInfo={noticeInfo} />
            </div>
          ))
      ) : (
        <div className={styles["no-notice"]}>아직 공지사항이 없습니다!</div>
      )}
      <div className={styles.pagination}>
        {pageNumbers.map((pageNum) => (
          <div
            key={pageNum}
            role="button"
            tabIndex={0}
            onClick={() => handlePage(pageNum)}
            onKeyDown={(event) => handlePageKeyDown(event, pageNum)}
            className={`${styles.pageNumber} ${pageNum === noticePage ? styles.active : ""}`}
          >
            {pageNum}
          </div>
        ))}
      </div>
    </div>
  );
}
