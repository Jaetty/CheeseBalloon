"use client";

import styles from "src/components/nav/item/favcard.module.scss";
import Image from "next/image";
import testimage from "public/svgs/test1.png";
import chzzk from "public/svgs/chzzk.svg";
import useToggleState from "src/stores/store";
import { useState } from "react";

export default function FavCard() {
  const { value } = useToggleState();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      {value && (
        <div className={styles.open_container}>
          <div className={styles.on_image}>
            <Image src={testimage} alt="" width={28} height={28} />
          </div>
          <div>
            <div className={styles.content}>
              울프 Wolf
              <Image src={chzzk} alt="" />
            </div>
            <div className={styles.subcontent}>리그 오브 레전드</div>
          </div>
          <div className={styles.viewer}>{(12345).toLocaleString()}</div>
        </div>
      )}
      {!value && (
        <div
          className={styles.closed_container}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={styles.on_image}>
            <Image src={testimage} alt="" width={32} height={32} />
          </div>
          {isHovered && (
            <div className={styles.description_modal}>
              <div className={styles.modal_container}>
                <div className={styles.content}>
                  울프 Wolf
                  <Image src={chzzk} alt="" />
                </div>
                <div className={styles.viewer}>{(12345).toLocaleString()}</div>
              </div>
              <div className={styles.modal_subcontent}>리그 오브 레전드</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
