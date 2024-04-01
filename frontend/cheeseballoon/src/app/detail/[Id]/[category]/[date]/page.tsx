"use client";

import { useParams, useRouter } from "next/navigation";

export default function DatePage() {
  const { id, category, date } = useParams();
  const router = useRouter();

  return <div>날짜 선택</div>;
}
