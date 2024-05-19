"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DetailViewer from "@/src/containers/detail/tmpdetailViewer";
import DetailCategory from "./tmpdetailCategory";
import DetailDuration from "./tmpdetailDuration";
import DetailRating from "./tmpdetailRating";
import DetailFollower from "./tmpdetailFollower";
import DetailCalendar from "./tmpdetailCalendar";
import DetailSelectDate from "./tmpdetailSelectDate";
import style from "./tmpdetailSelectedContent.module.scss";

export default function DetailSelectedContent() {
  const { category } = useParams();
  const router = useRouter();
  const [isRendered, setIsRendered] = useState<boolean>(false);

  useEffect(() => {
    if (category) {
      setIsRendered(true);
    } else {
      setIsRendered(false);
    }
  }, [category]);

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
        return null;
    }
  };

  return (
    <div>
      <div className={style.date}>
        <DetailSelectDate />
      </div>
      <div className={`${isRendered ? style.rendered : null}`}>
        {selectedContent()}
      </div>
    </div>
  );
}
