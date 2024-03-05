"use client";

// src/stores/store.ts

import { create } from "zustand";
import { ToggleStateType } from "src/types/type";
import { persist } from "zustand/middleware";

const useToggleState = create(
  persist<ToggleStateType>(
    (set) => ({
      // value: localStorage.getItem("toggle-state")
      //  ? JSON.parse(localStorage.getItem("toggle-state")!)
      //  : false,
      value: false,
      toggle: () => set((state) => ({ value: !state.value })),
    }),
    {
      name: "toggle-state",
    }
  )
);

export default useToggleState;
