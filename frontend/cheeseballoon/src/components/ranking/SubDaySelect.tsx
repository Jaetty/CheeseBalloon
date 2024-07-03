"use client";

import { useState, useEffect } from "react";
import style from "src/components/ranking/CommonSelect.module.scss";

interface DaySelectProps {
  date: number;
  setDate: (date: number) => void;
}

export default function DaySelect({ date, setDate }: DaySelectProps) {
  const [selectedOption, setSelectedOption] = useState(date.toString());

  useEffect(() => {
    if (selectedOption !== date.toString()) {
      setSelectedOption(date.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    setDate(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <select
        id="data-dropdown"
        value={selectedOption}
        onChange={handleSelectChange}
        className={style.dayselect}
      >
        <option value="0">어제</option>
        <option value="1">최근 7일</option>
        <option value="2">최근 14일</option>
        <option value="3">최근 30일</option>
      </select>
    </div>
  );
}
