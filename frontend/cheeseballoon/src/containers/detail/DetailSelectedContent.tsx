"use client";

import { useParams } from "next/navigation";
import DetailViewer from "src/containers/detail/DetailViewer";
import DetailCategory from "src/containers/detail/DetailCategory";
import DetailDuration from "src/containers/detail/DetailDuration";
import DetailRating from "src/containers/detail/DetailRating";
import DetailFollower from "src/containers/detail/DetailFollower";
import styles from "./DetailSelectedContent.module.scss"

export default function DetailSelectedContent() {
  const { category } = useParams();

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
      default:
        return null;
    }
  };

  return <div className={styles.wrapper}>{selectedContent()}</div>;
}
