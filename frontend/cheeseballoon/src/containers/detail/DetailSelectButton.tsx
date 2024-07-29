"use client";

import { useParams, useRouter } from "next/navigation";
import { isMobileState } from "@/src/stores/store";
import style from "src/containers/detail/DetailSelectButton.module.scss";

export default function DetailSelectButton() {
  const { id, category } = useParams();
  const isMobile = isMobileState((state) => state.isMobile);
  const router = useRouter();
  const handleSelectContent = (content: string) => {
    router.replace(`/detail/${id}/${content}`);
  };

  return isMobile ? (
    <div className={style["wrapper-responsive"]}>
      <select
        onChange={(e) => {
          handleSelectContent(e.target.value);
        }}
        className={style["button-responsive"]}
        value={category || "viewer"}
      >
        <option value="viewer">시청자</option>
        <option value="category">카테고리</option>
        <option value="duration">방송시간</option>
        <option value="rating">시청률</option>
        <option value="follower">팔로워</option>
      </select>
    </div>
  ) : (
    <div className={style.wrapper}>
      <div className={style.container}>
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
    </div>
  );
}
