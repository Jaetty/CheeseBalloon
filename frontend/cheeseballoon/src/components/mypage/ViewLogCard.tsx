import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./ViewLogCard.module.scss";

interface ViewLogCardProps {
  item: {
    viewLogId: number;
    streamerId: number;
    name: string;
    profileUrl: string;
    category: string;
    title: string;
    regDt: Date;
  };
  selectedLogs: number[];
  setSelectedLogs: React.Dispatch<React.SetStateAction<number[]>>;
  allSelected: boolean;
}

export default function ViewLogCard({
  item,
  selectedLogs,
  setSelectedLogs,
  allSelected,
}: ViewLogCardProps) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedLogs((prev) => [...prev, item.viewLogId]);
    } else {
      setSelectedLogs((prev) => prev.filter((id) => id !== item.viewLogId));
    }
  };

  useEffect(() => {
    if (allSelected) {
      setSelectedLogs((prev) => {
        if (!prev.includes(item.viewLogId)) {
          return [...prev, item.viewLogId];
        }
        return prev;
      });
    } else {
      setSelectedLogs((prev) => prev.filter((id) => id !== item.viewLogId));
    }
  }, [allSelected, item.viewLogId, setSelectedLogs]);

  return (
    <div className={styles.cardContainer}>
      <input
        type="checkbox"
        onChange={handleCheckboxChange}
        checked={selectedLogs.includes(item.viewLogId)}
        className={styles.liveinput}
      />
      <div className={styles.livenameinfo}>
        <div className={styles.image}>
          <div className={styles.imageWrapper}>
            <Image
              src={item.profileUrl}
              alt=""
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 6vw, 48px"
            />
          </div>
        </div>
        <div className={styles.livename}>{item.name}</div>
      </div>
      <div className={styles.livetitleinfo}>{item.title}</div>
      <div className={styles.livesubinfo}>{item.category}</div>
      <div className={styles.livedate}>{item.regDt.toLocaleDateString()}</div>
    </div>
  );
}
