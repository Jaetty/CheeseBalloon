import { useState } from "react";
import styles from "src/components/mypage/CardComponent.module.scss";
import Image from "next/image";
import { FavState } from "src/types/type";
import aflogo from "src/stores/afreeca.ico";
import chzlogo from "public/svgs/chzzk.svg";
import fav from "public/svgs/fav.svg";
import nofav from "public/svgs/nofav.svg";
import Link from "next/link";

type CardProps = {
  data: FavState;
};

export default function Card({ data }: CardProps) {
  const [isFav, setIsFav] = useState(true);

  const handleFavClick = () => {
    if (isFav) {
      fetch(`${process.env.NEXT_PUBLIC_MYPAGE_BOOK}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_AUTH}`,
        },
        body: JSON.stringify({
          streamerId: data.streamerId,
        }),
      });
    } else {
      fetch(`${process.env.NEXT_PUBLIC_MYPAGE_BOOK}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_AUTH}`,
        },
        body: JSON.stringify({
          streamerId: data.streamerId,
        }),
      });
    }
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
        <Link href={`/detail/${data.streamerId}`} className={styles.link}>
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
      <div className={styles.buttonsWrapper}>
        {data.isLive ? (
          <Link
            href={`/detail/${data.streamerId}`}
            className={styles.link}
            passHref
          >
            <div className={styles.liveButton}>LIVE</div>
          </Link>
        ) : (
          <div className={styles.disabledButton}>LIVE</div>
        )}
        <Link href="/detail/3" className={styles.link}>
          <div className={styles.detailButton}>상세</div>
        </Link>
      </div>
    </div>
  );
}
