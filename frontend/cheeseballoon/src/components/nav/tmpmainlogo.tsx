"use client";

import Image from "next/legacy/image";
import Logo from "public/svgs/logo.png";
import Link from "next/link";

export default function MainLogo() {
  return (
    <Link href="/">
      <Image src={Logo} alt="" width={140} height={24} />
    </Link>
  );
}
