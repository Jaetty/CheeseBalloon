"use client";

import { useParams, useRouter } from "next/navigation";
import style from "./detailSelectButton.module.scss";

export default function DetailSelectButton() {
  const { Id, category } = useParams();
  const router = useRouter();
  const handleSelectContent = (content: string) => {
    router.push(`/detail/${Id}/${content}`);
  };

  return (
    <div className={style.wrapper}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          handleSelectContent("viewer");
        }}
        onKeyDown={() => {
          handleSelectContent("viewer");
        }}
        className={`${style["button-container"]} ${category === "viewer" || !category ? style.select : null}`}
      >
        <button type="button" className={style.button}>
          시청자 수
        </button>
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          handleSelectContent("category");
        }}
        onKeyDown={() => {
          handleSelectContent("category");
        }}
        className={`${style["button-container"]} ${category === "category" ? style.select : null}`}
      >
        <button id="category" type="button" className={style.button}>
          카테고리
        </button>
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          handleSelectContent("duration");
        }}
        onKeyDown={() => {
          handleSelectContent("duration");
        }}
        className={`${style["button-container"]} ${category === "duration" ? style.select : null}`}
      >
        <button type="button" className={style.button}>
          방송시간
        </button>
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          handleSelectContent("rating");
        }}
        onKeyDown={() => {
          handleSelectContent("rating");
        }}
        className={`${style["button-container"]} ${category === "rating" ? style.select : null}`}
      >
        <button type="button" className={style.button}>
          시청률
        </button>
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          handleSelectContent("follower");
        }}
        onKeyDown={() => {
          handleSelectContent("follower");
        }}
        className={`${style["button-container"]} ${category === "follower" ? style.select : null}`}
      >
        <button type="button" className={style.button}>
          팔로워
        </button>
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          handleSelectContent("calendar");
        }}
        onKeyDown={() => {
          handleSelectContent("calendar");
        }}
        className={`${style["button-container"]} ${category === "calendar" ? style.select : null}`}
      >
        <button type="button" className={style.button}>
          방송기록
        </button>
      </div>
    </div>
  );
}
