"use client";

import { useEffect, useState } from "react";

export default function usePopstateListener() {
  const [isPopstate, setIsPopstate] = useState(false);

  useEffect(() => {
    const handlePopstate = () => {
      setIsPopstate(true);
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  // 상태를 초기화하는 함수를 반환
  const resetPopstate = () => setIsPopstate(false);

  return { isPopstate, resetPopstate };
}
