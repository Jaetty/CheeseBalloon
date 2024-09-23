// src/lib/NotificationContext.tsx

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import Notification from "src/components/mypage/Notification";

type NotificationContextType = {
  showNotification: (message: string, duration?: number) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export default function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notification, setNotification] = useState<{
    message: string;
    duration: number;
  } | null>(null);

  const [key, setKey] = useState(0); // Unique key to force remount

  const showNotification = useCallback(
    (message: string, duration: number = 3000) => {
      setNotification({ message, duration });
      setKey((prevKey) => prevKey + 1); // Increment the key to remount Notification
    },
    []
  );

  const contextValue = useMemo(
    () => ({ showNotification }),
    [showNotification]
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {notification && (
        <Notification
          key={key} // Use key to force remounting
          message={notification.message}
          duration={notification.duration}
        />
      )}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
