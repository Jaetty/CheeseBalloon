"use client";

import React, { useEffect, useRef, useState } from "react";
import logo from "public/svgs/chzzk.svg";
import Image from "next/image";
import styles from "./DatePicker.module.scss";

interface DatePickerProps {
  onDateChange: (start: string, end: string) => void;
}

export default function DatePicker({ onDateChange }: DatePickerProps) {
  const datepickerRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [picker, setPicker] = useState<any>(null); // picker 인스턴스를 상태로 저장

  const handleClick = () => {
    if (picker) {
      picker.show(); // picker가 존재하면 show() 메서드 호출
    }
  };

  useEffect(() => {
    // 클라이언트에서만 실행되도록 import
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
                const kstOffset = 9 * 60; // UTC+9 시간 차이(분 단위)
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
        setPicker(newPicker); // picker 인스턴스를 상태에 저장

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
