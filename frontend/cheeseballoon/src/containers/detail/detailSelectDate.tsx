"use client";

import { useParams, useRouter } from "next/navigation";
import style from "./detailSelectDate.module.scss";

export default function DetailSelectDate() {
  const { id, category, date } = useParams();
  const router = useRouter();
  const handleChangeDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = e.target.value;

    router.push(
      category
        ? `/detail/${id}/${category}/${newDate}`
        : `/detail/${id}/viewer/${newDate}`
    );
  };

  return (
    <div className={style.wrapper}>
      <select
        onChange={(e) => {
          handleChangeDate(e);
        }}
        className={style.button}
        value={date || 7}
      >
        <option value={7}>7일</option>
        <option value={14}>14일</option>
        <option value={30}>30일</option>
      </select>
    </div>
  );
}
