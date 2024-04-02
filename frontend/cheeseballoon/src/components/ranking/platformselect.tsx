import { useState } from "react";
import style from "src/components/ranking/select.module.scss";

interface PlatformSelectProps {
  setPlatform: (platform: string) => void;
}

export default function PlatformSelect({ setPlatform }: PlatformSelectProps) {
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    setPlatform(event.target.value);
  };

  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(`/api/data?option=${selectedOption}`);
  //     const newData = await response.json();
  //     setData(newData);
  //   };

  //   fetchData();
  // }, [selectedOption]);
  return (
    <div>
      <select
        id="platform-dropdown"
        value={selectedOption}
        onChange={handleSelectChange}
        className={style.platformselect}
      >
        <option value="option1">전체 랭킹</option>
        <option value="option2">아프리카TV 랭킹</option>
        <option value="option3">치지직 랭킹</option>
      </select>
    </div>
  );
}
