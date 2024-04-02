import styles from "src/components/ranking/rankingIndexCard.module.scss";
import Image from "next/image";
import ArrowUp from "public/svgs/uparrow.png";
import ArrowDown from "public/svgs/downarrow.png";
import Test from "public/svgs/test1.png";

type Props = {
  number: number;
};

export default function RankCard({ number }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.number}>{number}</div>
      <div className={styles.image}>
        <Image src={Test} alt="" width={44} height={44} />
      </div>
      <div className={styles.name}>울프 Wolf</div>
      <div className={styles.rank}>
        <Image src={ArrowUp} alt="" width={7} height={11} />
        {number}
      </div>
    </div>
  );
}
