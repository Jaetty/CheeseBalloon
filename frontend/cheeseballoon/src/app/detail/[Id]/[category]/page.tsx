import DetailSelectedContent from "@/src/containers/detail/detailSelectedContent";
import style from "./page.module.scss"

export default function CategoryPage() {
  return (
    <div className={style.content}>
      <DetailSelectedContent />
    </div>
  );
}
