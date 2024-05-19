import DetailLive from "src/containers/detail/detailLive";
import DetailProfile from "src/containers/detail/detailProfile";
import DetailSummary from "src/containers/detail/detailSummary";
import DetailSelect from "src/containers/detail/detailSelect";
import style from "src/app/(main)/detail/[id]/layout.module.scss";

export default function DetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.profile}>
          <DetailProfile />
        </div>
        <hr />
        <div className={style.live}>
          <DetailLive />
        </div>
        <div className={style.summary}>
          <DetailSummary />
        </div>
        <hr />
        <div>
          <DetailSelect />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
