"use client";

import useToggleState from "src/stores/store";
import styles1 from "src/components/nav/menubutton.module.scss";
import Image from "next/legacy/image";
import menu from "public/svgs/big.png";

export default function Nav() {
  const { toggle } = useToggleState();
  const handleClick = () => {
    toggle();
  };

  return (
    <div className={styles1.button}>
      <Image src={menu} alt="" onClick={handleClick} width={40} height={40} />
    </div>
  );
}
