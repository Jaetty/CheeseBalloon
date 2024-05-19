import DetailViewer from "src/containers/detail/DetailViewer";
import DetailSelectDate from "src/containers/detail/DetailSelectDate";
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
