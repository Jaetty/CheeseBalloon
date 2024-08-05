"use client";

import { useToggleState } from "src/stores/store";
import styles1 from "src/components/nav/MenuButton.module.scss";
import Image from "next/image";
import menu from "public/svgs/big.png";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function Nav() {
  const { value, toggle } = useToggleState();
  const handleClick = () => {
    toggle();
  };
  useEffect(() => {
    Cookies.set("toggle", value.toString(), { expires: 1 / 24 });
  }, [value]);
  return (
    <div className={styles1.button}>
      <Image src={menu} alt="" onClick={handleClick} width={40} height={40} />
    </div>
  );
}
