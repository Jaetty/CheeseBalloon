"use client";

import { useAlertStore } from "src/stores/store";
import styles from "src/styles/CustomAlert.module.scss";

export default function CustomAlert() {
  const message = useAlertStore((state) => state.message);
  const isVisible = useAlertStore((state) => state.isVisible);
  const isConfirm = useAlertStore((state) => state.isConfirm);
  const hideAlert = useAlertStore((state) => state.hideAlert);
  const resolveConfirm = useAlertStore((state) => state.resolveConfirm);

  if (!isVisible) return null;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    hideAlert();
    if (isConfirm) resolveConfirm(false); // Confirm의 취소
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      hideAlert();
      if (isConfirm) resolveConfirm(false); // Confirm의 취소
    }
  };

  const handleConfirm = () => {
    hideAlert();
    resolveConfirm(true); // Confirm의 확인
  };

  const handleCancel = () => {
    hideAlert();
    resolveConfirm(false); // Confirm의 취소
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
        {isConfirm ? (
          <div className={styles.modalButtons}>
            <button
              className={styles.modalButton}
              onClick={handleConfirm}
              type="button"
            >
              확인
            </button>
            <button
              className={styles.modalButton}
              onClick={handleCancel}
              type="button"
            >
              취소
            </button>
          </div>
        ) : (
          <button
            className={styles.modalButton}
            onClick={hideAlert}
            type="button"
          >
            확인
          </button>
        )}
      </div>
    </div>
  );
}
