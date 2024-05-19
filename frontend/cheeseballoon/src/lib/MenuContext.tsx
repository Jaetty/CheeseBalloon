"use client";

import { createContext, useContext, useEffect } from "react";
import OpenMenu from "src/components/nav/item/OpenIndex";
import ClosedMenu from "src/components/nav/item/ClosedIndex";

import { useToggleState } from "../stores/store";

// Context 생성
const MenuContext = createContext({});

// Provider 생성
export function MenuProvider() {
  const { value } = useToggleState();

  return (
    <MenuContext.Provider value={value}>
      <div style={{ marginTop: "60px" }}>
        {value ? <OpenMenu /> : <ClosedMenu />}
      </div>
    </MenuContext.Provider>
  );
}

export const useMenu = () => useContext(MenuContext);
