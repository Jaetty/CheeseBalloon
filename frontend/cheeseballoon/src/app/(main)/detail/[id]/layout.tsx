import DetailLive from "src/containers/detail/DetailLive";
import DetailProfile from "src/containers/detail/DetailProfile";
import DetailSummary from "src/containers/detail/DetailSummary";
import DetailSelect from "src/containers/detail/DetailSelect";
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
