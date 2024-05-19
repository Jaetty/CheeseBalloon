import { useState } from "react";
import style from "src/components/ranking/CommonSelect.module.scss";

interface DaySelectProps {
  setDate: (date: number) => void;
}

export default function DaySelect({ setDate }: DaySelectProps) {
  const [selectedOption, setSelectedOption] = useState("1");

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
