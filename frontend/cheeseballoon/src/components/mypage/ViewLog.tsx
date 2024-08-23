"use client";

import React, { useEffect, useState } from "react";
import ViewLogCard from "src/components/mypage/ViewLogCard";
import history from "public/svgs/history.svg";
import Image from "next/image";
import DatePicker from "src/components/mypage/DatePicker";
import styles from "src/components/mypage/ViewLog.module.scss";
import { isMobileState } from "src/stores/store";
import customFetch from "src/lib/CustomFetch";

interface LogItem {
  viewLogId: number;
  streamerId: number;
  name: string;
  profileUrl: string;
  category: string;
  title: string;
  regDt: string;
}

export default function ViewLog() {
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [selectedLogs, setSelectedLogs] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const isMobile = isMobileState((state) => state.isMobile);

  const fetchLogs = async (starti: string, endi: string) => {
    const response = await customFetch(
      `${process.env.NEXT_PUBLIC_MYPAGE_VIEW}?start=${starti}&end=${endi}`,
      {
        method: "GET",
      }
    );
    const responseData = await response.json();
    setLogs(responseData.data);
  };

  const deleteLogs = async (viewLogs: number[]) => {
    await Promise.all(
      viewLogs.map(async (logId) => {
        await customFetch(`${process.env.NEXT_PUBLIC_MYPAGE_VIEW}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            viewLogId: logId,
          }),
        });
      })
    );
    setSelectedLogs([]);
    setAllSelected(false);
  };

  useEffect(() => {
    if (start && end) {
      fetchLogs(start, end);
    }
  }, [start, end]);

  const handleDelete = async () => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    if (confirm("삭제하시겠습니까?")) {
      await deleteLogs(selectedLogs);
      if (start && end) {
        fetchLogs(start, end);
      }
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedLogs(logs.map((log) => log.viewLogId));
      setAllSelected(true);
    } else {
      setSelectedLogs([]);
      setAllSelected(false);
    }
  };

  const handleDateChange = (startDate: string, endDate: string) => {
    setStart(startDate);
    setEnd(endDate);
  };

  const containerClassName = `${styles.container} ${
    start && end && logs.length > 0 ? styles.nonCenteredContainer : ""
  }`;

  return (
    <div className={styles.box}>
      <div className={styles.flexbox}>
        <div className={styles.viewtitle}>
          <div className={styles.image}>
            <div className={styles.imageWrapper}>
              <Image
                src={history}
                alt=""
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 6vw, 22px"
              />
            </div>
          </div>
          <span> 시청기록</span>
          {!isMobile && (
            <span className={styles.subexp}>
              실시간 LIVE 랭킹과 실시간 방송에서 이동한 것만 기록됩니다
            </span>
          )}
        </div>
        <DatePicker onDateChange={handleDateChange} />
      </div>
      <div className={containerClassName}>
        {(!start || !end) && (
          <div className={styles.centerMessage}>
            <p className={styles.centerMessageText}>기간을 설정해주세요</p>
          </div>
        )}
        {start && end && logs.length === 0 && (
          <div className={styles.centerMessage}>
            <p className={styles.loading}>시청 기록이 없습니다</p>
          </div>
        )}
        {start && end && logs.length > 0 && (
          <>
            <div className={styles.overview}>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={allSelected}
                className={styles.overviewInput}
              />
              <p className={styles.overviewName}>이름</p>
              <p className={styles.overviewTitle}>제목</p>
              <p className={styles.overviewCategory}>카테고리</p>
              <p className={styles.overviewDate}>날짜</p>
            </div>
            {logs.map((item, index) => (
              <ViewLogCard
                key={index}
                item={item}
                selectedLogs={selectedLogs}
                setSelectedLogs={setSelectedLogs}
                allSelected={allSelected}
              />
            ))}
            <div className={styles.deleteButtonContainer}>
              <button
                type="button"
                onClick={handleDelete}
                disabled={selectedLogs.length === 0}
                className={`${styles.deleteButton} ${
                  selectedLogs.length > 0 ? styles.deleteButtonActive : ""
                }`}
              >
                삭제
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
