"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NoticeCard from "src/components/notice/NoticeCard";
import styles from "src/containers/notice/NoticeIndex.module.scss";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [pageNum, setPageNum] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>();

  const { page } = useParams();
  const router = useRouter();

  const pageSize = 5;
  const pageNumbers = [];

  if (noticeData) {
    for (let i = 1; i <= Math.ceil(noticeData.length / pageSize); i += 1) {
      pageNumbers.push(i);
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageNum]);

  useEffect(() => {
    if (page && typeof page === "string") {
      setPageNum(parseInt(page, 10));
    }
  }, [page]);

  useEffect(() => {
    if (Array.isArray(page)) {
      router.push("/notice");
      return;
    }
    if (page && lastPage) {
      const pageInt = parseInt(page, 10);
      if (Number.isNaN(pageInt) || pageInt < 1 || pageInt > lastPage) {
        router.push("/notice");
      }
    }
  }, [lastPage, page, router]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}?limit=1000&offset=0`);
        const data = await res.json();
        setNoticeData(data.data);
        setLastPage(Math.ceil(data.data.length / pageSize));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePage = (num: number) => {
    router.push(`/notice/${num}`);
  };

  const handlePageKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    num: number
  ) => {
    if (event.key === "Enter") {
      handlePage(pageNum);
    }
  };

  let content;

  if (loading) {
    content = <div className={styles.loading}>Loading...</div>;
  } else if (noticeData && noticeData.length > 0) {
    content = noticeData
      .slice((pageNum - 1) * pageSize, pageNum * pageSize)
      .map((noticeInfo) => (
        <div className={styles.card} key={noticeInfo.noticeId}>
          <NoticeCard noticeInfo={noticeInfo} />
        </div>
      ));
  } else {
    content = (
      <div className={styles["no-notice"]}>아직 공지사항이 없습니다!</div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <p className={styles.title}>Notice</p>
        <div className={styles.subtitle}>
          치즈벌룬의 업데이트 및 다양한 소식을 알려드립니다.
        </div>
      </div>
      {content}
      <div className={styles.pagination}>
        {pageNumbers.map((num) => (
          <div
            key={num}
            role="button"
            tabIndex={0}
            onClick={() => handlePage(num)}
            onKeyDown={(event) => handlePageKeyDown(event, num)}
            className={`${styles.pageNumber} ${num === pageNum ? styles.active : ""}`}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}
