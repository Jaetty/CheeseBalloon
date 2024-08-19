import React, { useEffect, useState } from "react";
import styles from "src/components/mypage/Notification.module.scss";

type NotificationProps = {
  message: string;
  duration: number;
};

export default function Notification({ message, duration }: NotificationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      setVisible(false);
    }
  };

  if (!visible) return null;

  return (
    <div className={styles.notification}>
      <div className={styles.notificationHeader}>
        <div className={styles.notificationTitle}>{message}</div>
        <i
          className={styles.notificationClose}
          onClick={() => setVisible(false)}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
        >
          &times;
        </i>
      </div>
    </div>
  );
}
