import LiveHeader from "@/src/containers/live/liveheader";
import LiveCards from "@/src/containers/live/livecards";
import LiveSearch from "@/src/containers/live/livesearch";
import LiveLayout from "./layout";
import style from "./page.module.scss";

export default function LivePage() {
  return (
    <LiveLayout>
      <LiveHeader />
      <hr className={style.line} />
      <LiveSearch />
      <hr className={style.line} />
      <LiveCards />
      <hr className={style.line} />
    </LiveLayout>
  );
}
