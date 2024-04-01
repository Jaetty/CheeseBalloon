"use client";

// import { useState } from "react";
// import DetailSelectedContent from "./detailSelectedContent";
import DetailSelectButton from "./detailSelectButton";
import DetailSelectDate from "./detailSelectDate";
import style from "./detailSelect.module.scss";

export default function DetailSelect() {
  // const [content, setContent] = useState<string>("viewer");
  // const [date, setDate] = useState<number>(30);

  // const handleContent = (selectedContent: string) => {
  //   setContent(selectedContent);
  // };
  // const handleDate = (selectedDate: number) => {
  //   setDate(selectedDate);
  // };

  // const selected: { content: string; date: number } = {
  //   content,
  //   date,
  // };

  return (
    <div>
      <div className={style.select}>
        {/* <DetailSelectButton handleContent={handleContent} /> */}
        <DetailSelectButton />
      </div>
      <div className={style.date}>
        {/* <DetailSelectDate handleDate={handleDate} /> */}
        <DetailSelectDate/>
      </div>
      {/* <div className={style.content}>
        <DetailSelectedContent selected={selected} />
      </div> */}
    </div>
  );
}
