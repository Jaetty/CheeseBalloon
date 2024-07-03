"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import usePopstateListener from "./usePopstateListener";

interface PopstateContextType {
  isPopstate: boolean;
  resetPopstate: () => void;
}

const defaultState: PopstateContextType = {
  isPopstate: false,
  resetPopstate: () => {},
};

const PopstateContext = createContext<PopstateContextType>(defaultState);

interface PopstateProviderProps {
  children: ReactNode;
}

export function PopstateProvider({ children }: PopstateProviderProps) {
  const { isPopstate, resetPopstate } = usePopstateListener();
  const [state, setState] = useState<PopstateContextType>({
    isPopstate,
    resetPopstate,
  });

  useEffect(() => {
    setState({ isPopstate, resetPopstate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPopstate]);

  return (
    <PopstateContext.Provider value={state}>
      {children}
    </PopstateContext.Provider>
  );
}

export function usePopstate() {
  return useContext(PopstateContext);
}
