"use client";

import { useParams } from "next/navigation";

// interface DetailSelectButtonProps {
//   handleContent: (selectedContent: string) => void;
// }

export default function DetailSelectButton() {
  const { id, category, date } = useParams();

  //   {
  //   handleContent,
  // }: DetailSelectButtonProps
  return (
    <div>
      {/* <button type="button" onClick={() => handleContent("viewer")}> */}
      <button type="button">시청자 수</button>
      {/* <button type="button" onClick={() => handleContent("category")}> */}
      <button type="button">카테고리</button>
      {/* <button type="button" onClick={() => handleContent("duration")}> */}
      <button type="button">방송 시간</button>
      {/* <button type="button" onClick={() => handleContent("rating")}> */}
      <button type="button">시청률</button>
      {/* <button type="button" onClick={() => handleContent("follwer")}> */}
      <button type="button">팔로워</button>
      {/* <button type="button" onClick={() => handleContent("calendar")}> */}
      <button type="button">방송 기록</button>
    </div>
  );
}
