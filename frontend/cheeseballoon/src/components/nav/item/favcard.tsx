"use client";

import styles from "src/components/nav/item/favcard.module.scss";
import Image from "next/image";
import chzzk from "public/svgs/chzzk.svg";
import aflogo from "public/svgs/afreeca.svg";
import { useToggleState } from "src/stores/store";
import { useState, useRef, useLayoutEffect } from "react";
import { LiveData } from "src/types/type";
import noimage from "public/svgs/blank_profile.png";
import Link from "next/link";

type Props = {
  data: LiveData | undefined;
};

export default function FavCard({ data }: Props) {
  const { value } = useToggleState();
  const [isHovered, setIsHovered] = useState(false);
  const [modalStyle, setModalStyle] = useState({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState(data?.profileUrl || noimage);

  const handleError = () => {
    setImageUrl(noimage);
  };

  useLayoutEffect(() => {
    if (containerRef.current && isHovered) {
      const { top, left } = containerRef.current.getBoundingClientRect();
      setModalStyle({
        top: `${top}px`,
        left: `${left + 60}px`,
      });
    }
  }, [isHovered]);

  return (
    <div>
      {value && (
        <div className={styles.open_container}>
          <div className={data?.streamUrl ? styles.on_image : styles.off_image}>
            <Image
              src={imageUrl}
              alt={data?.name || "Profile image"}
              width={28}
              height={28}
              onError={handleError}
            />
          </div>
          <div>
            <div className={styles.content}>
              <div className={styles.titledisc}>{data?.name}</div>
              {data?.platform === "A" || data?.platform === "S" ? (
                <Image src={aflogo} alt="" width={14} height={14} />
              ) : (
                <Image src={chzzk} alt="" width={14} height={14} />
              )}
            </div>
            <div className={styles.subcontent}>
              {data?.category || "리그 오브 레전드"}
            </div>
          </div>

          <div className={styles.viewer}>
            {data?.viewerCnt.toLocaleString()}
          </div>
        </div>
      )}
      {!value && (
        <div
          className={styles.closed_container}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={data?.streamUrl ? styles.on_image : styles.off_image}>
            <Image src={data?.profileUrl || ""} alt="" width={28} height={28} />
          </div>
          {isHovered && (
            <div className={styles.description_modal}>
              <div className={styles.modal_container}>
                <div className={styles.content}>
                  <div className={styles.closed_titledisc}>{data?.name}</div>
                  {data?.platform === "A" || data?.platform === "S" ? (
                    <Image src={aflogo} alt="" width={14} height={14} />
                  ) : (
                    <Image src={chzzk} alt="" width={14} height={14} />
                  )}
                </div>
                <div className={styles.viewer}>
                  {data?.viewerCnt.toLocaleString()}
                </div>
              </div>
              <div className={styles.modal_subcontent}>
                {data?.category || "리그 오브 레전드"}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
