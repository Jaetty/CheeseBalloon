"use client";

import { create } from "zustand";
import { ToggleStateType, MobileState, AccessToken } from "src/types/type";
import { persist, createJSONStorage } from "zustand/middleware";

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

const useAccessToken = create(
  persist<AccessToken>(
    (set) => ({
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),
    }),
    {
      name: "accessToken",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export { useToggleState, isMobileState, useAccessToken };
