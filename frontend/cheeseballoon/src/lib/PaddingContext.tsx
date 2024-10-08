"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useToggleState, isMobileState } from "../stores/store";

interface PaddingProviderProps {
  initialToggleValue: boolean;
  children: ReactNode;
}
// Context 생성
const PaddingContext = createContext({});

// Provider 생성
export function PaddingProvider({
  initialToggleValue,
  children,
}: PaddingProviderProps) {
  const { value } = useToggleState();
  const [paddingValue, setPaddingValue] = useState(initialToggleValue);
  const isMobile = isMobileState((state) => state.isMobile);

  let paddingLeft;
  if (isMobile) {
    paddingLeft = "0px";
  } else {
    paddingLeft = paddingValue ? "220px" : "60px";
  }

  const paddingStyle = {
    paddingLeft,
  };

  useEffect(() => {
    setPaddingValue(value);
  }, [value]);

  return <div style={paddingStyle}>{children}</div>;
}

export const usePadding = () => useContext(PaddingContext);
