import style from "./liveCard.module.scss";

interface LiveInfo {
  liveinfo: {
    name: string;
    profilePictureUrl: string;
    platformIcon: string;
    platformUrl: string;
    channelUrl: string;
    category: string;
    title: string;
    viewers: number;
    videoUrl: string;
    thumbnail: string;
  };
}

export default function LiveCard({ liveinfo }: LiveInfo) {
  return (
    <div className={style.livecard}>
      <div className={style.content}>
        <div className={style.thumbnail}>
          <a href={liveinfo.videoUrl} target="_blank" rel="noopener noreferrer">
            <img src={liveinfo.thumbnail} alt="/svgs/liveicon.png" />
          </a>
        </div>
        <div className={style.iconnamecategory}>
          <a
            href={liveinfo.platformUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={liveinfo.platformIcon}
              alt="/svgs/liveicon.png"
              className={style.platformicon}
            />
          </a>
          <a
            href={liveinfo.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className={style.name}>{liveinfo.name}</p>
          </a>
          <p className={style.category}>{liveinfo.category}</p>
        </div>
        <div className={style.channeltitle}>
          <a
            href={liveinfo.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={liveinfo.profilePictureUrl}
              alt="/svgs/liveicon.png"
              className={style.channel}
            />
          </a>
          <a
            href={liveinfo.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className={style.title}>{liveinfo.title}</p>
          </a>
        </div>
        <div className={style.iconviewers}>
          <img src="/svgs/viewericon.svg" alt="" className={style.viewericon} />
          <p className={style.viewers}>{liveinfo.viewers}</p>
        </div>
      </div>
    </div>
  );
}
