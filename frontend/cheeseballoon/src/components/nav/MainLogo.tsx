"use client";

import Image from "next/image";
import Logo from "public/svgs/logo.png";
import Link from "next/link";
import styles from "src/components/nav/MainLogo.module.scss";

export default function MainLogo() {
  return (
    <div className={styles.mainLogo}>
      <Link href="/">
        <div className={styles.imageWrapper}>
          <Image src={Logo} alt="" layout="fill" />
        </div>
      </Link>
    </div>
  );
}
