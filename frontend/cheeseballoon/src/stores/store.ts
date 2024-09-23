"use client";

import { create } from "zustand";
import {
  ToggleStateType,
  MobileState,
  AccessTokenState,
  SignInState,
  // AlertState,
  // FavState,
} from "src/types/type";
import { persist, createJSONStorage } from "zustand/middleware";
// import customFetch from "src/lib/CustomFetch";

// interface FavStore {
//   favData: Array<FavState> | null;
//   setFavData: (data: Array<FavState>) => void;
//   fetchData: () => Promise<void>;
// }

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

// const useAlertStore = create<AlertState>((set) => ({
//   message: "",
//   isVisible: false,
//   isConfirm: false,
//   resolveConfirm: () => {},
//   showAlert: (message: string) =>
//     set({ message, isVisible: true, isConfirm: false }),
//   showConfirm: (message: string) =>
//     new Promise((resolve) => {
//       set({
//         message,
//         isVisible: true,
//         isConfirm: true,
//         resolveConfirm: resolve,
//       });
//     }),
//   hideAlert: () => set({ isVisible: false }),
// }));

// const useFavStore = create<FavStore>((set) => ({
//   favData: null,
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   setFavData: (data: any) => set({ favData: data }),
//   fetchData: async () => {
//     const response = await customFetch(
//       `${process.env.NEXT_PUBLIC_MYPAGE_BOOK}`
//     );
//     if (response && response.status === 401) {
//       set({ favData: null });
//       return;
//     }

//     const responseData = await response.json();
//     const sortedData = responseData.data.sort((a: FavState, b: FavState) => {
//       if (a.isLive === b.isLive) {
//         return b.followerCnt - a.followerCnt;
//       }
//       return a.isLive ? -1 : 1;
//     });

//     set({ favData: sortedData });
//   },
// }));

export {
  useToggleState,
  isMobileState,
  accessTokenState,
  isSignInState,
  // useAlertStore,
  // useFavStore,
};
