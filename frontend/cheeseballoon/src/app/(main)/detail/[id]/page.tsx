import DetailViewer from "src/containers/detail/DetailViewer";
import style from "src/app/(main)/detail/[id]/page.module.scss";

export default function DetailPage() {
  return (
    <div>
      <div className={style.content}>
        <DetailViewer />
      </div>
    </div>
  );
}
