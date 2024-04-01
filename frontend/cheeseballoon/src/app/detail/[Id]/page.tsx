import DetailViewer from "@/src/containers/detail/detailViewer";
import DetailSelectDate from "@/src/containers/detail/detailSelectDate";
import style from "./page.module.scss"

export default function DetailPage() {
  return (
    <div>
      <div className={style.date}>
        <DetailSelectDate />
      </div>
      <div className={style.content}>
        <DetailViewer />;
      </div>
    </div>
  );
}
