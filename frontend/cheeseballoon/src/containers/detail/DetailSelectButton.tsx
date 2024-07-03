"use client";

import { useParams, useRouter } from "next/navigation";
import style from "src/containers/detail/DetailSelectButton.module.scss";

export default function DetailSelectButton() {
  const { id, category } = useParams();
  const router = useRouter();
  const handleSelectContent = (content: string) => {
    router.replace(`/detail/${id}/${content}`);
  };

  return (
    <div className={style.wrapper}>
      <button
        onClick={() => {
          handleSelectContent("viewer");
        }}
        onKeyDown={() => {
          handleSelectContent("viewer");
        }}
        type="button"
        className={`${style.button} ${category === "viewer" || !category ? style.select : null}`}
      >
        시청자
      </button>

      <button
        onClick={() => {
          handleSelectContent("category");
        }}
        onKeyDown={() => {
          handleSelectContent("category");
        }}
        id="category"
        type="button"
        className={`${style.button} ${category === "category" ? style.select : null}`}
      >
        카테고리
      </button>

      <button
        onClick={() => {
          handleSelectContent("duration");
        }}
        onKeyDown={() => {
          handleSelectContent("duration");
        }}
        type="button"
        className={`${style.button} ${category === "duration" ? style.select : null}`}
      >
        방송시간
      </button>

      <button
        onClick={() => {
          handleSelectContent("rating");
        }}
        onKeyDown={() => {
          handleSelectContent("rating");
        }}
        type="button"
        className={`${style.button} ${category === "rating" ? style.select : null}`}
      >
        시청률
      </button>

      <button
        onClick={() => {
          handleSelectContent("follower");
        }}
        onKeyDown={() => {
          handleSelectContent("follower");
        }}
        type="button"
        className={`${style.button} ${category === "follower" ? style.select : null}`}
      >
        팔로워
      </button>
    </div>
  );
}
