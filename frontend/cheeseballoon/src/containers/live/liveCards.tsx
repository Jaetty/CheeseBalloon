import LiveCard from "./liveCard";
import style from "./liveCards.module.scss";

const livehref = Array(10).fill({
  name: "풍월량",
  profilePictureUrl:
    "https://nng-phinf.pstatic.net/MjAyMzEyMjBfNzgg/MDAxNzAyOTk5MDU4NTQ1.q74UANafs4egu_GflqIXrKZvqweabjdsqb3q7F-vEPEg.0DlZf3Myopu6ITUmTkOYLU-GKcBLotgKn61A0o9ZAN4g.PNG/7d354ef2-b2a8-4276-8c12-5be7f6301ae0-profile_image-600x600.png?type=f120_120_na",
  platformIcon: "https://ssl.pstatic.net/static/nng/glive/icon/favicon.png",
  platformUrl: "https://chzzk.naver.com/",
  channelUrl: "https://chzzk.naver.com/7ce8032370ac5121dcabce7bad375ced",
  category: "리듬세상",
  title: "잠깐 메운디",
  viewers: 12345,
  videoUrl: "https://chzzk.naver.com/7ce8032370ac5121dcabce7bad375ced",
  thumbnail:
    "https://video-phinf.pstatic.net/20240305_4/1709583268163HXyPs_JPEG/96e2576b-da62-11ee-a2fb-a0369ffdb924_03.jpg?type=o500x280_blur",
});
interface LiveInfo {
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
}

export default function LiveCards() {
  return (
    <div>
      {livehref.map((liveinfo: LiveInfo) => (
        <div className={style.livecard} key={liveinfo.name}>
          <LiveCard liveinfo={liveinfo} />
        </div>
      ))}
    </div>
  );
}
