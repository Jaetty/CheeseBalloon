import DetailViewer from "@/src/containers/detail/detailViewer";
import DetailCategory from "./detailCategory";
import DetailDuration from "./detailDuration";
import DetailRating from "./detailRating";
import DetailFollower from "./detailFollower";
import DetailCalendar from "./detailCalendar";

export default function DetailSelectedContent({
  selected,
}: {
  selected: {
    content: string;
    date: number;
  };
}) {
  switch (selected.content) {
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
      return null;
  }
}
