import DetailProfile from "@/src/containers/detail/detailProfile";
import DetailOverview from "@/src/containers/detail/detailOverview";
import DetailSelect from "@/src/containers/detail/detailSelect";
import style from "@/src/app/detail/[Id]/page.module.scss";

export default function DetailPage() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.profile}>
          <DetailProfile />
        </div>
        <div>
          <hr />
        </div>
        <div>
          <DetailOverview />
        </div>
        <div>
          <hr />
        </div>
        <div>
          <DetailSelect />
        </div>
      </div>
    </div>
  );
}
