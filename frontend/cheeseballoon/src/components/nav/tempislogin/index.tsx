"use client";

import userfill from "public/svgs/userfill.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function IsLogin() {
  const router = useRouter();

  const handleLogin = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    router.push(`/login`);
  };

  return (
    <Image
      onClick={handleLogin}
      src={userfill}
      alt="User icon"
      width={30}
      height={30}
    />
  );
}
