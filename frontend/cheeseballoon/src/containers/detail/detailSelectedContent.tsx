"use client";

import { useParams, useRouter } from "next/navigation";
import DetailViewer from "@/src/containers/detail/detailViewer";
import DetailCategory from "./detailCategory";
import DetailDuration from "./detailDuration";
import DetailRating from "./detailRating";
import DetailFollower from "./detailFollower";
import DetailCalendar from "./detailCalendar";

// 임시
export default function DetailSelectedContent() {
  const { category } = useParams();
  const router = useRouter()

  switch (category) {
    case "viewer":
      return <DetailViewer />;
    case "category":
      return <DetailCategory />;
    case "duration":
      return <DetailDuration />;
    case "rating":
      return <DetailRating />;
    case "follwer":
      return <DetailFollower />;
    case "calendar":
      return <DetailCalendar />;
    default:
      router.push("/404");
  }
}
