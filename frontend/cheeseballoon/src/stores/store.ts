"use client";

import { create } from "zustand";
import {
  ToggleStateType,
  MobileState,
  AccessTokenState,
  SignInState,
  AlertState,
} from "src/types/type";
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

const accessTokenState = create(
  persist<AccessTokenState>(
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

const isSignInState = create(
  persist<SignInState>(
    (set) => ({
      isSignIn: false,
      setIsSignIn: (value: boolean) => set({ isSignIn: value }),
    }),
    {
      name: "isSignIn",
    }
  )
);

const useAlertStore = create<AlertState>((set) => ({
  message: "",
  isVisible: false,
  isConfirm: false,
  resolveConfirm: () => {},
  showAlert: (message: string) =>
    set({ message, isVisible: true, isConfirm: false }),
  showConfirm: (message: string) =>
    new Promise((resolve) => {
      set({
        message,
        isVisible: true,
        isConfirm: true,
        resolveConfirm: resolve,
      });
    }),
  hideAlert: () => set({ isVisible: false }),
}));

export {
  useToggleState,
  isMobileState,
  accessTokenState,
  isSignInState,
  useAlertStore,
};
