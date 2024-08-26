"use client";

import React from "react";
import { useAlertStore } from "src/stores/store";
import styles from "src/styles/CustomAlert.module.scss";

export default function CustomAlert() {
  const message = useAlertStore((state) => state.message);
  const isVisible = useAlertStore((state) => state.isVisible);
  const hideAlert = useAlertStore((state) => state.hideAlert);

  if (!isVisible) return null;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    hideAlert();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      hideAlert();
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={styles.modalContent}>
        <div className={styles.modalText}>{message}</div>
        <button
          className={styles.modalButton}
          onClick={hideAlert}
          type="button"
        >
          확인
        </button>
      </div>
    </div>
  );
}
