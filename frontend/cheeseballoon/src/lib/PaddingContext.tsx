"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";
import { useToggleState } from "../stores/store";

// Context 생성
const PaddingContext = createContext({});

// Provider 생성
export function PaddingProvider({ children }: { children: ReactNode }) {
  const { value } = useToggleState();
  const paddingStyle = {
    paddingLeft: value ? "220px" : "60px",
  };

  useEffect(() => {
    const cleanupLocalStorage = () => {
      localStorage.removeItem("fav-state");
      localStorage.removeItem("recommend-state");
    };

    window.addEventListener("beforeunload", cleanupLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", cleanupLocalStorage);
    };
  }, []);

  return (
    <PaddingContext.Provider value={value}>
      <div style={paddingStyle}>{children}</div>
    </PaddingContext.Provider>
  );
}

export const usePadding = () => useContext(PaddingContext);
