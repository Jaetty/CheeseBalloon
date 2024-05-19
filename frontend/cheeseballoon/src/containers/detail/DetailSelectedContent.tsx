"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DetailViewer from "src/containers/detail/DetailViewer";
import DetailCategory from "src/containers/detail/DetailCategory";
import DetailDuration from "src/containers/detail/DetailDuration";
import DetailRating from "src/containers/detail/DetailRating";
import DetailFollower from "src/containers/detail/DetailFollower";
import DetailCalendar from "src/containers/detail/DetailCalendar";
import DetailSelectDate from "src/containers/detail/DetailSelectDate";
import style from "src/containers/detail/DetailSelectedContent.module.scss";

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
