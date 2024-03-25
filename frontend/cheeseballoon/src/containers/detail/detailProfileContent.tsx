"use client";

import { useEffect } from "react";

export default function DetailProfileContent() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  

  return (
    <div>
      <div>프로필 사진</div>
      <div>
        <div>
          <div>치지직 마크</div>
          <div>이름</div>
          <div>순위</div>
        </div>
        <div>
          <div>프로필 소개</div>
          <div>순위 변동</div>
        </div>
      </div>
    </div>
  );
}
