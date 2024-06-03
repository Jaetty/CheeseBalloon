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

import { useToggleState } from "../stores/store";

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

  useEffect(() => {
    setMenuValue(value);
  }, [value]);

  return (
    <MenuContext.Provider value={value}>
      <div style={{ marginTop: "60px" }}>
        {menuValue ? (
          <OpenMenu value={menuValue} />
        ) : (
          <ClosedMenu value={menuValue} />
        )}
        {children}
      </div>
    </MenuContext.Provider>
  );
}

export const useMenu = () => useContext(MenuContext);
