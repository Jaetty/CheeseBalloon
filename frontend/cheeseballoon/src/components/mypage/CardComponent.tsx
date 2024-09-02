import { useState } from "react";
import styles from "src/components/mypage/CardComponent.module.scss";
import Image from "next/image";
import { FavState } from "src/types/type";
import aflogo from "src/stores/afreeca.ico";
import chzlogo from "public/svgs/chzzk.svg";
import fav from "public/svgs/fav.svg";
import nofav from "public/svgs/nofav.svg";
import Link from "next/link";
import { useNotification } from "src/lib/NotificationContext";
import customFetch from "src/lib/CustomFetch";
import { useAlertStore } from "src/stores/store";

type CardProps = {
  data: FavState;
};

export default function Card({ data }: CardProps) {
  const [isFav, setIsFav] = useState(true);
  const { showNotification } = useNotification();
  const showConfirm = useAlertStore((state) => state.showConfirm);

  const handleFavClick = async () => {
    if (isFav) {
      const confirmed = await showConfirm("삭제하시겠습니까?");
      if (!confirmed) return;

      await customFetch(`${process.env.NEXT_PUBLIC_MYPAGE_BOOK}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookmarkId: data.bookmarkId,
        }),
      });
      showNotification("즐겨찾기가 삭제되었습니다.");
    } else {
      await customFetch(`${process.env.NEXT_PUBLIC_MYPAGE_BOOK}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          streamerId: data.streamerId,
        }),
      });
      showNotification("즐겨찾기가 추가되었습니다.");
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
        <div className={styles.name}>{data.name}</div>
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
          <Link href={data.streamUrl} className={styles.link} target="blank">
            <div className={styles.liveButton}>LIVE</div>
          </Link>
        ) : (
          <div className={styles.disabledButton}>LIVE</div>
        )}
        <Link href={`/detail/${data.streamerId}`} className={styles.link}>
          <div className={styles.detailButton}>상세</div>
        </Link>
      </div>
    </div>
  );
}
