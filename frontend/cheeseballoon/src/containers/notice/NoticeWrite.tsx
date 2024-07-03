"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "src/containers/notice/NoticeWrite.module.scss";
import TinyMCE from "src/components/notice/TextEditor";

const AUTH = process.env.NEXT_PUBLIC_BEARER_AUTH;
const NOTICE_API = process.env.NEXT_PUBLIC_NOTICE_API_URL;
const IMAGE_UPLOAD_API = process.env.NEXT_PUBLIC_NOTICE_IMAGE_UPLOAD_API_URL;

export default function NoticeWrite() {
  const [title, setTitle] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const router = useRouter();

  const shakeElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add(styles.shake);
      setTimeout(() => {
        element.classList.remove(styles.shake);
      }, 300);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setTitle(text);
  };

  const handleThumbnailChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imgFiles = event.target.files;
    const MAX_FILE_SIZE = 1024 * 1024;

    if (!imgFiles || imgFiles.length === 0) {
      return;
    }
    const imgFile = imgFiles[0];
    if (imgFile.size > MAX_FILE_SIZE) {
      // eslint-disable-next-line no-alert
      alert("이미지 파일 크기가 너무 큽니다!");
      return;
    }

    const formData = new FormData();
    formData.append("file", imgFile);

    try {
      const res = await fetch(`${IMAGE_UPLOAD_API}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AUTH}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Image upload failed");
      }

      const data = await res.json();
      setThumbnail(data.data.imgUrl);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert("이미지 파일 업로드에 실패했습니다");
    }
  };

  const handleSubmit = async () => {
    const requestBody = { title, content, thumbnail };

    let isError = false;

    if (!title) {
      shakeElement("titleInput");
      isError = true;
    }
    if (!content) {
      shakeElement("editorContainer");
      isError = true;
    }

    if (!thumbnail) {
      shakeElement("thumbnailInput");
      isError = true;
    }

    if (isError) {
      return;
    }
    const response = await fetch(`${NOTICE_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      router.push("/notice");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles["title-container"]}>
          <div className={styles["title-subtitle"]}>제목</div>
          <input
            id="titleInput"
            type="text"
            className={styles["title-input"]}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <div className={styles["thumbnail-container"]}>
            <div className={styles["thumbnail-subtitle"]}>썸네일</div>
            <input
              id="thumbnailInput"
              type="file"
              accept=".jpg, .jpeg, .png"
              className={styles["thumbnail-input"]}
              onChange={handleThumbnailChange}
            />
          </div>
          {thumbnail && (
            <img
              src={thumbnail || ""}
              alt="썸네일"
              className={styles["thumbnail-preview"]}
            />
          )}
        </div>
        <div id="editorContainer" className={styles["editor-container"]}>
          <TinyMCE setContentProps={setContent} />
        </div>

        <div className={styles["submit-container"]}>
          <button type="button" onClick={handleSubmit}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
