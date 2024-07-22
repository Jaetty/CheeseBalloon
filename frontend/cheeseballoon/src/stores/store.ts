"use client";

import { create } from "zustand";
import {
  ToggleStateType,
  LiveData,
  FavDataType,
  MobileState,
} from "src/types/type";
import { persist } from "zustand/middleware";

const useToggleState = create(
  persist<ToggleStateType>(
    (set) => ({
      value: false,
      toggle: () => set((state) => ({ value: !state.value })),
    }),
    {
      name: "toggle-state",
    }
  )
);

const FavState = create(
  persist<FavDataType>(
    (set) => ({
      data: [],
      setData: (newData: LiveData[]) =>
        set((state) => ({ ...state, data: newData })),
    }),
    {
      name: "fav-state",
    }
  )
);

const isMobileState = create(
  persist<MobileState>(
    (set) => ({
      isMobile: false,
      value: false,
      setIsMobile: (value: boolean) => set({ isMobile: value }),
    }),
    {
      name: "isMobile",
    }
  )
);

export { useToggleState, FavState, isMobileState };
