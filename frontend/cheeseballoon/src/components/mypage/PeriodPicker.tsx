import styles from "./PeriodPicker.module.scss";

interface PeriodPickerProps {
  setStart: React.Dispatch<React.SetStateAction<string | null>>;
  setEnd: React.Dispatch<React.SetStateAction<string | null>>;
  start: string | null;
  end: string | null;
  endInputRef: React.RefObject<HTMLInputElement>;
}

export default function PeriodPicker({
  setStart,
  setEnd,
  start,
  end,
  endInputRef,
}: PeriodPickerProps) {
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStart(e.target.value);
  };

  const handleStartClick = () => {
    if (start !== null) {
      setStart(null);
      setEnd(null);
    }
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnd(e.target.value);
  };

  const today = new Date();
  today.setHours(today.getHours() + 9);
  const formattedToday = today.toISOString().split("T")[0];

  return (
    <div className={styles.periodPickerContainer}>
      <input
        type="date"
        onChange={handleStartChange}
        onClick={handleStartClick}
        max={formattedToday}
        className={styles.dateInput}
      />
      <input
        type="date"
        onChange={handleEndChange}
        ref={endInputRef}
        min={start || ""}
        max={formattedToday}
        disabled={!start}
        value={end || ""}
        className={styles.dateInput}
      />
    </div>
  );
}
