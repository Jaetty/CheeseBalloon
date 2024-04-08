import style from "src/components/ranking/subrank.module.scss";
import Image from "next/image";
import aflogo from "public/svgs/afreeca.svg";
import chzlogo from "public/svgs/chzzk.svg";
import ArrowUp from "public/svgs/uparrow.png";
import first from "public/svgs/1st.svg";
import second from "public/svgs/2nd.svg";
import third from "public/svgs/3rd.svg";
// import ArrowDown from "public/svgs/downarrow.png";
import Link from "next/link";
import { LiveData } from "src/types/type";

type Props = {
  data: LiveData[] | undefined;
  title: string;
};
export default function Subrank({ data, title }: Props) {
  const reorderedData = data && [data[1], data[0], data[2]];
  const RenderRank = title === "실시간 LIVE";
  return (
    <div className={style.wrapper}>
      {reorderedData &&
        reorderedData.map((item, index) => (
          <div key={index} className={style.box}>
            {!RenderRank && (
              <div className={style.image}>
                <Link href={`/detail/${item.streamId}`}>
                  <Image src={item.profileUrl} alt="" width={70} height={70} />
                </Link>
              </div>
            )}
            {RenderRank && (
              <div className={style.liveimage}>
                <Link href={`/detail/${item.streamId}`}>
                  <Image src={item.profileUrl} alt="" width={70} height={70} />
                </Link>
              </div>
            )}
            {!RenderRank && (
              <div className={style.rankimage}>
                {index === 0 && (
                  <Image src={second} alt="" width={28} height={28} />
                )}
                {index === 1 && (
                  <Image src={first} alt="" width={28} height={28} />
                )}
                {index === 2 && (
                  <Image src={third} alt="" width={28} height={28} />
                )}
              </div>
            )}
            {RenderRank && (
              <div className={style.liverankimage}>
                {index === 0 && (
                  <Image src={second} alt="" width={28} height={28} />
                )}
                {index === 1 && (
                  <Image src={first} alt="" width={28} height={28} />
                )}
                {index === 2 && (
                  <Image src={third} alt="" width={28} height={28} />
                )}
              </div>
            )}
            <div className={style.name}>
              <Link href={`/detail/${item.streamId}`} className={style.link}>
                {item.name}
              </Link>{" "}
              {item.platform === "A" || item.platform === "S" ? (
                <Image src={aflogo} alt="" width={14} height={14} />
              ) : (
                <Image src={chzlogo} alt="" width={14} height={14} />
              )}
            </div>
            {RenderRank && (
              <>
                <div className={style.liveinfo}>
                  {item?.title || ""}
                  <div className={style.subinfo}>
                    {item?.category || "리그 오브 레전드"}
                  </div>
                </div>
                <div className={style.livecntinfo}>
                  {item.viewerCnt.toLocaleString()} 명
                </div>
              </>
            )}
            {!RenderRank && (
              <div className={style.info}>
                {item.viewerCnt.toLocaleString()} 명
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
