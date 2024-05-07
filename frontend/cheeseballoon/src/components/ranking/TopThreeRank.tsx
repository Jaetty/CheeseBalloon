import style from "src/components/ranking/TopThree.module.scss";
import Image from "next/image";
import aflogo from "public/svgs/afreeca.svg";
import chzlogo from "public/svgs/chzzk.svg";
import first from "public/svgs/1st.svg";
import second from "public/svgs/2nd.svg";
import third from "public/svgs/3rd.svg";
import nofav from "public/svgs/nofav.svg";
import Link from "next/link";

type RankingData = {
  streamerId: number;
  profileUrl: string;
  name: string;
  platform: string;
  diff: number;
  value: string;
};

type Props = {
  data: RankingData[] | undefined;
};

export default function TopThreeRanking({ data }: Props) {
  const reorderedData = data && [data[1], data[0], data[2]];
  const rankImages = [second, first, third];

  return (
    <div className={style.wrapper}>
      {reorderedData &&
        reorderedData.map((item, index) => (
          <div key={index} className={style.box}>
            <div className={style.image}>
              <Link href={`/detail/${item.streamerId}`}>
                <Image src={item.profileUrl} alt="" width={70} height={70} />
              </Link>
            </div>
            <div className={style.rankimage}>
              <Image src={rankImages[index]} alt="" width={28} height={28} />
            </div>
            <div className={style.favimage}>
              <Image src={nofav} alt="" width={20} height={20} />
            </div>
            <div className={style.name}>
              <Link href={`/detail/${item.streamerId}`} className={style.link}>
                {item.name}
              </Link>{" "}
              {item.platform === "A" || item.platform === "S" ? (
                <Image src={aflogo} alt="" width={14} height={14} />
              ) : (
                <Image src={chzlogo} alt="" width={14} height={14} />
              )}
            </div>
            <div className={style.info}>
              {item.value}{" "}
              {item.diff > 0 && (
                <span className={style.positive}>
                  ( + {Math.abs(item.diff).toLocaleString()} )
                </span>
              )}
              {item.diff < 0 && (
                <span className={style.negative}>
                  ( - {Math.abs(item.diff).toLocaleString()} )
                </span>
              )}
              {item.diff === 0 && <span className={style.zero}>( - )</span>}
            </div>
          </div>
        ))}
    </div>
  );
}
