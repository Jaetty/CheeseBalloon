"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import OpenMenu from "src/components/nav/item/OpenIndex";
import ClosedMenu from "src/components/nav/item/ClosedIndex";

import { useToggleState, isMobileState } from "../stores/store";

interface MenuProviderProps {
  initialToggleValue: boolean;
  children: ReactNode;
}

// Context 생성
const MenuContext = createContext({});

// Provider 생성
export function MenuProvider({
  initialToggleValue,
  children,
}: MenuProviderProps) {
  const { value, toggle } = useToggleState();
  const [menuValue, setMenuValue] = useState(initialToggleValue);
  const [isMobile, setIsMobile] = useState(false);
  const sIsMobile = isMobileState((state) => state.setIsMobile);

  useEffect(() => {
    setMenuValue(value);
  }, [value]);

  useEffect(() => {
    const handleResize = () => {
      const isMobileSize = window.innerWidth < 768;
      setIsMobile(isMobileSize);
      sIsMobile(isMobileSize);
    };

    handleResize(); // 초기 실행 시 한 번 호출하여 현재 창 크기 반영

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sIsMobile]);

  return (
    <MenuContext.Provider value={value}>
      <div style={{ marginTop: "60px" }}>
        {!isMobile &&
          (menuValue ? (
            <OpenMenu value={menuValue} />
          ) : (
            <ClosedMenu value={menuValue} />
          ))}
        {children}
      </div>
    </MenuContext.Provider>
  );
}

export const useMenu = () => useContext(MenuContext);
