"use client";

import React, { useEffect } from "react";
import styles from "src/components/nav/MobileMenu.module.scss";
import Link from "next/link";
import Image from "next/image";
import notice from "public/svgs/notice.svg";
import live from "public/svgs/live.svg";
import ranking from "public/svgs/rank.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeMenu: () => void;
}

export default function Modal({ isOpen, onClose, closeMenu }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="presentation">
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <div className={styles.fontname}>
          <div className={styles.open_description}>바로가기</div>
          <li className={styles.open_listItem}>
            <Link
              href="/notice"
              className={styles.open_linkdeco}
              onClick={closeMenu}
            >
              <div className={styles.open_navPill}>
                <Image src={notice} alt="" width={20} height={20} />
                <div className={styles.open_linkdeco1}>공지사항</div>
              </div>
            </Link>
          </li>
          <li className={styles.open_listItem}>
            <Link
              href="/ranking"
              className={styles.open_linkdeco}
              onClick={closeMenu}
            >
              <div className={styles.open_navPill}>
                <Image src={ranking} alt="" width={20} height={20} />
                <div className={styles.open_linkdeco2}>방송 랭킹</div>
              </div>
            </Link>
          </li>
          <li className={styles.open_listItem}>
            <Link
              href="/live"
              className={styles.open_linkdeco}
              onClick={closeMenu}
            >
              <div className={styles.open_navPill}>
                <Image src={live} alt="" width={20} height={20} />
                <div className={styles.open_linkdeco}>LIVE 모아보기</div>
              </div>
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
}
