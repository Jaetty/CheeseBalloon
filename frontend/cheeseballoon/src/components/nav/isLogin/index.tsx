"use client";

import userfill from "public/svgs/userfill.png";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";

export default function isLogin() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();
    router.push(`/login`);
  };

  return (
    <Image onClick={handleLogin} src={userfill} alt="" width={30} height={30} />
  );
}
