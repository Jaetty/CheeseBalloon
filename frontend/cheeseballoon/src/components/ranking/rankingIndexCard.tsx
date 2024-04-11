import styles from "src/components/ranking/rankingIndexCard.module.scss";
import Image from "next/legacy/image";
import ArrowUp from "public/svgs/uparrow.png";
// import ArrowDown from "public/svgs/downarrow.png";
import aflogo from "public/svgs/afreeca.svg";
import chzlogo from "public/svgs/chzzk.svg";
import Link from "next/link";

type Props = {
  number: number;
  name: string;
  profileUrl: string;
  platform: string;
  id: number;
  title: string;
};

export default function RankCard({
  number,
  name,
  profileUrl,
  platform,
  id,
  title,
}: Props) {
  let logo = null;
  if (platform === "A" || platform === "S") {
    logo = aflogo;
  } else if (platform === "C") {
    logo = chzlogo;
  }
  const RenderRank = title !== "실시간 LIVE";
  return (
    <div className={styles.container}>
      <div className={styles.number}>{number}</div>
      <div className={styles.image}>
        <Link href={`/detail/${id}`}>
          <Image src={profileUrl} alt="" width={44} height={44} />
        </Link>
      </div>
      <div className={styles.name}>
        <Link href={`/detail/${id}`} className={styles.link}>
          {name}
        </Link>{" "}
        {logo && <Image src={logo} alt="" width={16} height={16} />}
      </div>
      {RenderRank && (
        <div className={styles.rank}>
          <Image src={ArrowUp} alt="" width={7} height={11} />
          {number}
        </div>
      )}
    </div>
  );
}
