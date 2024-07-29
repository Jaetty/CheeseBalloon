"use client";

import React, { useEffect, useState, useRef } from "react";
import ViewLogCard from "src/components/mypage/ViewLogCard";
import PeriodPicker from "./PeriodPicker";
import styles from "./ViewLog.module.scss";

interface LogItem {
  viewLogId: number;
  streamerId: number;
  name: string;
  profileUrl: string;
  category: string;
  title: string;
  regDt: Date;
}

const testData: LogItem[] = [
  {
    viewLogId: 1,
    streamerId: 101,
    name: "Streamer1",
    profileUrl:
      "https://profile.img.afreecatv.com/LOGO/af/affifaonline/affifaonline.jpg",
    category: "Gaming",
    title: "Stream Title 1",
    regDt: new Date(),
  },
  {
    viewLogId: 2,
    streamerId: 102,
    name: "Streamer2",
    profileUrl:
      "https://profile.img.afreecatv.com/LOGO/af/affifaonline/affifaonline.jpg",
    category: "Music",
    title: "Stream Title 2",
    regDt: new Date(),
  },
  {
    viewLogId: 3,
    streamerId: 103,
    name: "Streamer3",
    profileUrl:
      "https://profile.img.afreecatv.com/LOGO/af/affifaonline/affifaonline.jpg",
    category: "Education",
    title: "Stream Title 3",
    regDt: new Date(),
  },
  {
    viewLogId: 4,
    streamerId: 104,
    name: "Streamer4",
    profileUrl:
      "https://profile.img.afreecatv.com/LOGO/af/affifaonline/affifaonline.jpg",
    category: "Talk Show",
    title: "Stream Title 4",
    regDt: new Date(),
  },
  {
    viewLogId: 5,
    streamerId: 105,
    name: "Streamer5",
    profileUrl:
      "https://profile.img.afreecatv.com/LOGO/af/affifaonline/affifaonline.jpg",
    category: "Cooking",
    title: "Stream Title 5",
    regDt: new Date(),
  },
];

export default function ViewLog() {
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [selectedLogs, setSelectedLogs] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const endInputRef = useRef<HTMLInputElement | null>(null);

  const fetchLogs = async (starti: string, endi: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MYPAGE_VIEW}?start=${starti}&end=${endi}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_AUTH}`,
        },
      }
    );
    const responseData = await response.json();
    setLogs(responseData.data);
  };

  const deleteLogs = async (viewLogs: number[]) => {
    await Promise.all(
      viewLogs.map(async (logId) => {
        await fetch(`${process.env.NEXT_PUBLIC_MYPAGE_VIEW}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_AUTH}`,
          },
          body: JSON.stringify({
            viewLogId: logId,
          }),
        });
      })
    );
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

  return (
    <div>
      <div className={styles.periodPicker}>
        <PeriodPicker
          setStart={setStart}
          setEnd={setEnd}
          start={start}
          end={end}
          endInputRef={endInputRef}
        />
      </div>
      <div className={styles.container}>
        {(!start || !end) && (
          <div className={styles.centerMessage}>
            <p className={styles.centerMessageText}>기간을 설정해주세요</p>
          </div>
        )}
        {start && end && logs.length === 0 ? (
          <div className={styles.centerMessage}>
            <p className={styles.loading}>시청 기록이 없습니다</p>
          </div>
        ) : (
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
            {testData.map((item, index) => (
              <ViewLogCard
                key={index}
                item={item}
                selectedLogs={selectedLogs}
                setSelectedLogs={setSelectedLogs}
                allSelected={allSelected}
              />
            ))}
          </>
        )}
        {selectedLogs.length !== 0 && (
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
        )}
      </div>
    </div>
  );
}
