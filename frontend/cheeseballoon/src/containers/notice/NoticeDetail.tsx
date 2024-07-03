"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import Link from "next/link";
import styles from "src/containers/notice/NoticeDetail.module.scss";

const API_URL = process.env.NEXT_PUBLIC_NOTICE_API_URL;

interface NoticeDataType {
  noticeId: number;
  title: string;
  content: string;
  thumbnail: string;
  regDt: Date;
  nickname: string;
}

async function getData(api: string, id: string) {
  const res = await fetch(`${api}?noticeId=${id}`);

  return res.json();
}

export default function NoticeDetail() {
  const [noticeData, setNoticeData] = useState<NoticeDataType>();
  const [sanitizedHtml, setSanitizedHtml] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const router = useRouter();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(API_URL as string, id.toString());
      setNoticeData(res.data);
      if (res.status === "OK") {
        const sanitizedContent = DOMPurify.sanitize(res.data.content);
        setSanitizedHtml(sanitizedContent);

        const dateObj = new Date(res.data.regDt);
        const dayOfWeek = dateObj.toLocaleDateString("ko-KR", {
          weekday: "short",
        });
        const formattedDate = `${dateObj.getFullYear()}/${(dateObj.getMonth() + 1).toString().padStart(2, "0")}/${dateObj.getDate().toString().padStart(2, "0")} (${dayOfWeek})`;
        setDate(formattedDate);
      } else {
        router.push("/error");
      }
    };
    fetchData();
  }, [id, router]);

  return (
    noticeData && (
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
            {noticeData && <div className={styles.date}>{date}</div>}
            {noticeData && noticeData.title && (
              <div className={styles.maintitle}>{noticeData.title}</div>
            )}
          </div>
        </div>
        <div className={styles.bodybox}>
          {noticeData && (
            // eslint-disable-next-line react/no-danger
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizedHtml,
              }}
            ></div>
          )}
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
    )
  );
}
