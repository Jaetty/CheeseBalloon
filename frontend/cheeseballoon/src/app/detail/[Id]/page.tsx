import DetailViewer from "@/src/containers/detail/detailViewer";
import style from "./page.module.scss"

export default function DetailPage() {
  return (
    <div className={style.viewer}>
      <DetailViewer />
    </div>
  );
}
