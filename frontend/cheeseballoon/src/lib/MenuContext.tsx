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
      setIsMobile(window.innerWidth < 768);
      sIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
