import DetailViewer from "src/containers/detail/tmpdetailViewer";
import DetailSelectDate from "src/containers/detail/tmpdetailSelectDate";
import style from "src/app/(main)/detail/[id]/page.module.scss";

export default function DetailPage() {
  return (
    <div>
      <div className={style.date}>
        <DetailSelectDate />
      </div>
      <div className={style.content}>
        <DetailViewer />
      </div>
    </div>
  );
}
