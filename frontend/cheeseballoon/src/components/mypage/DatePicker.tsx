"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./DatePicker.module.scss";

interface DatePickerProps {
  onDateChange: (start: string, end: string) => void;
}

export default function DatePicker({ onDateChange }: DatePickerProps) {
  const datepickerRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [picker, setPicker] = useState<any>(null);

  const handleClick = () => {
    if (picker) {
      picker.show();
    }
  };

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    import("litepicker").then(({ default: Litepicker }) => {
      if (datepickerRef.current) {
        const koreaTime = new Date();
        const newPicker = new Litepicker({
          element: datepickerRef.current,
          singleMode: false,
          maxDate: koreaTime,
          minDate: "2020-01-01",
          position: "bottom right",
          lang: "ko-KR",
          setup: (picker1) => {
            picker1.on("selected", (startDate, endDate) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const formatDateToKST = (date: any) => {
                const kstOffset = 9 * 60;
                const localDate = new Date(
                  date.dateInstance.getTime() + kstOffset * 60 * 1000
                );
                return localDate.toISOString().substring(0, 10);
              };

              const formattedStartDate = formatDateToKST(startDate);
              const formattedEndDate = formatDateToKST(endDate);
              onDateChange(formattedStartDate, formattedEndDate);
            });
          },
        });
        newPicker.gotoDate(koreaTime);
        setPicker(newPicker);

        return () => {
          newPicker.destroy();
        };
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datepickerRef]);

  return (
    <div className={styles.picker}>
      <input
        ref={datepickerRef}
        type="image"
        id="datepicker"
        src="/svgs/calendar.svg"
        alt="Date Picker"
        onClick={handleClick}
        className="border-b"
      />
    </div>
  );
}
