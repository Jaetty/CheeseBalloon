import { useState } from "react";
import styles from "src/components/mypage/CardComponent.module.scss";
import Image from "next/image";
import { LiveData } from "src/types/type";
import aflogo from "src/stores/afreeca.ico";
import chzlogo from "public/svgs/chzzk.svg";
import fav from "public/svgs/fav.svg";
import nofav from "public/svgs/nofav.svg";
import Link from "next/link";

type CardProps = {
  data: LiveData;
};

export default function Card({ data }: CardProps) {
  const [isFav, setIsFav] = useState(true);

  const handleFavClick = () => {
    setIsFav((prev) => !prev);
  };

  return (
    <div className={styles.card}>
      <div className={styles.on_image}>
        <div className={styles.imageWrapper}>
          <Image
            src={data.profileUrl}
            alt=""
            className={styles.cardimage}
            fill
            style={{ objectFit: "cover" }}
            sizes="110px"
          />
        </div>
      </div>
      <div
        className={styles.favIcon}
        onClick={handleFavClick}
        role="presentation"
      >
        <Image
          src={isFav ? fav : nofav}
          alt="fav-icon"
          width={20}
          height={20}
        />
      </div>
      <div className={styles.cardname}>
        <Link href={`/detail/${data.streamId}`} className={styles.link}>
          {data.name}
        </Link>
        <span className={styles.logo}>
          {data.platform === "A" || data.platform === "S" ? (
            <Image src={aflogo} alt="" width={16} height={16} />
          ) : (
            <Image src={chzlogo} alt="" width={16} height={16} />
          )}
        </span>
      </div>
      <div className={styles.cardfollowers}>{data.viewerCnt} followers</div>
    </div>
  );
}
