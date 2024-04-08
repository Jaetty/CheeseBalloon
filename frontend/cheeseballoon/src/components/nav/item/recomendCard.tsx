"use client";

import styles from "src/components/nav/item/favcard.module.scss";
import Image from "next/image";
import chzzk from "public/svgs/chzzk.svg";
import aflogo from "public/svgs/afreeca.svg";
import useToggleState from "src/stores/store";
import { useState } from "react";
import { LiveData } from "src/types/type";
import Link from "next/link";

type Props = {
  data: LiveData | undefined;
};

export default function RecomendCard({ data }: Props) {
  const { value } = useToggleState();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={data?.streamUrl || ""} className={styles.link}>
      <div>
        {value && (
          <div className={styles.open_container}>
            <div className={styles.on_image}>
              <Image
                src={data?.profileUrl || ""}
                alt=""
                width={28}
                height={28}
              />
            </div>
            <div>
              <div className={styles.content}>
                {data?.name}
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
            <div className={styles.on_image}>
              <Image
                src={data?.profileUrl || ""}
                alt=""
                width={32}
                height={32}
              />
            </div>
            {isHovered && (
              <div className={styles.description_modal}>
                <div className={styles.modal_container}>
                  <div className={styles.content}>
                    울프 Wolf
                    <Image src={chzzk} alt="" />
                  </div>
                  <div className={styles.viewer}>
                    {(12345).toLocaleString()}
                  </div>
                </div>
                <div className={styles.modal_subcontent}>리그 오브 레전드</div>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
