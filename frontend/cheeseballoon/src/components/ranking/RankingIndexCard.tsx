"use client";

import styles from "src/components/ranking/rankingIndexCard.module.scss";
import Image from "next/legacy/image";
import ArrowUp from "public/svgs/uparrow.png";
import ArrowDown from "public/svgs/downarrow.png";
import aflogo from "public/svgs/afreeca.svg";
import chzlogo from "public/svgs/chzzk.svg";
import Link from "next/link";
import noimage from "public/svgs/blank_profile.png";
import { useState } from "react";
import {
  FollowRankData,
  AvgRankData,
  TopviewRankData,
  TimeRankData,
  RatingRankData,
  LiveRankData,
} from "src/types/type";

type Props = {
  item:
    | FollowRankData
    | AvgRankData
    | TopviewRankData
    | TimeRankData
    | RatingRankData
    | LiveRankData;
  title: string;
  number: number;
};

export default function RankCard({ item, title, number }: Props) {
  let logo = null;
  if (item.platform === "A" || item.platform === "S") {
    logo = aflogo;
  } else if (item.platform === "C") {
    logo = chzlogo;
  }
  const RenderRank = title !== "실시간 LIVE";
  const [imageUrl, setImageUrl] = useState(item.profileUrl || noimage);

  const handleError = () => {
    setImageUrl(noimage);
  };
  return (
    <div className={styles.container}>
      <div className={styles.number}>{number}</div>
      <div className={styles.image}>
        <Link href={`/detail/${item.streamerId}`}>
          <Image
            src={imageUrl}
            alt=""
            width={44}
            height={44}
            onError={handleError}
          />
        </Link>
      </div>
      <div className={styles.name}>
        <Link href={`/detail/${item.streamerId}`} className={styles.link}>
          {item.name}
        </Link>{" "}
        {logo && <Image src={logo} alt="" width={16} height={16} />}
      </div>
      {RenderRank && (
        <div className={styles.rank}>
          {item.rankDiff > 0 && (
            <>
              <Image src={ArrowUp} alt="" width={7} height={12} />
              <span>{Math.abs(item.rankDiff)}</span>
            </>
          )}
          {item.rankDiff < 0 && (
            <>
              <Image src={ArrowDown} alt="" width={7} height={12} />
              <span>{Math.abs(item.rankDiff)}</span>
            </>
          )}
          {item.rankDiff === 0 && <div className={styles.zero}>-</div>}
        </div>
      )}
    </div>
  );
}
