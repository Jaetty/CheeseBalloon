import DetailProfile from "@/src/containers/detail/detailProfile";
import DetailSummary from "@/src/containers/detail/detailSummary";
import DetailSelect from "@/src/containers/detail/detailSelect";
import style from "@/src/app/detail/[Id]/page.module.scss";

export default function DetailPage() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.profile}>
          <DetailProfile />
        </div>
        <hr />
        <div className={style.summary}>
          <DetailSummary />
        </div>
        <hr />
        <div className={style.contents}>
          <DetailSelect />
        </div>
      </div>
    </div>
  );
}
