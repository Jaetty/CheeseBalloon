"use client";

import { useState, useEffect } from "react";
import style from "src/components/ranking/CommonSelect.module.scss";

interface PlatformSelectProps {
  platform: string;
  setPlatform: (platform: string) => void;
}

export default function PlatformSelect({
  platform,
  setPlatform,
}: PlatformSelectProps) {
  const [selectedOption, setSelectedOption] = useState(platform);

  useEffect(() => {
    if (selectedOption !== platform) {
      setSelectedOption(platform);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platform]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    setPlatform(event.target.value);
  };

  return (
    <div>
      <select
        id="platform-dropdown"
        value={selectedOption}
        onChange={handleSelectChange}
        className={style.platformselect}
      >
        <option value="T">전체 랭킹</option>
        <option value="S">아프리카TV 랭킹</option>
        <option value="C">치지직 랭킹</option>
      </select>
    </div>
  );
}
