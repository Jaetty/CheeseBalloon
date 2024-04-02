"use client";

import { useParams, useRouter } from "next/navigation";
import DetailViewer from "@/src/containers/detail/detailViewer";
import DetailCategory from "./detailCategory";
import DetailDuration from "./detailDuration";
import DetailRating from "./detailRating";
import DetailFollower from "./detailFollower";
import DetailCalendar from "./detailCalendar";
import DetailSelectDate from "./detailSelectDate";
import style from "./detailSelectedContent.module.scss";

export default function DetailSelectedContent() {
  const { category } = useParams();
  const router = useRouter();

  const selectedContent = () => {
    switch (category) {
      case "viewer":
        return <DetailViewer />;
      case "category":
        return <DetailCategory />;
      case "duration":
        return <DetailDuration />;
      case "rating":
        return <DetailRating />;
      case "follower":
        return <DetailFollower />;
      case "calendar":
        return <DetailCalendar />;
      default:
        router.push("/404");
        return null;
    }
  };

  return (
    <div>
      <div className={style.date}>
        <DetailSelectDate />
      </div>
      <div className={style.content}>{selectedContent()}</div>
    </div>
  );
}
