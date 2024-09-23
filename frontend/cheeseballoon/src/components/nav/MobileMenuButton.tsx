"use client";

import styles1 from "src/components/nav/MenuButton.module.scss";
import Image from "next/image";
import menu from "public/svgs/big.png";

interface MobileMenuButtonProps {
  onToggle: () => void;
}

export default function MobileMenuButton({ onToggle }: MobileMenuButtonProps) {
  const handleClick = () => {
    onToggle();
  };

  return (
    <div className={styles1.button}>
      <div className={styles1.Wrapper}>
        <Image
          src={menu}
          alt=""
          onClick={handleClick}
          fill
          sizes="(max-width: 768px) 35px, 40px"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
