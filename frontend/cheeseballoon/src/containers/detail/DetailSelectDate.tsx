"use client";

import { useParams, useRouter } from "next/navigation";
import style from "src/containers/detail/DetailSelectDate.module.scss";

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
        value={date || 1}
      >
        <option value={1}>7일</option>
        <option value={2}>14일</option>
        <option value={3}>30일</option>
      </select>
    </div>
  );
}
