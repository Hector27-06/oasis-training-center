import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { notificationService } from "@/src/services/notification.service";
import { Notification } from "@/src/types/notification.types";

export interface NotificationContextValue {
  notifications: Notification[];
  loading: boolean;
  errorMessage: string;
  refreshNotifications: () => Promise<void>;
  markNotificationAsRead: (id: string) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
}

export const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: PropsWithChildren) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const refreshNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      setNotifications(await notificationService.getMyNotifications());
    } catch {
      setErrorMessage("No se pudieron cargar las notificaciones.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshNotifications();
  }, [refreshNotifications]);

  const markNotificationAsRead = useCallback(async (id: string) => {
    await notificationService.markNotificationAsRead(id);
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification,
      ),
    );
  }, []);

  const markAllNotificationsAsRead = useCallback(async () => {
    await notificationService.markAllMyNotificationsAsRead();
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, isRead: true })),
    );
  }, []);

  const value = useMemo(
    () => ({
      notifications,
      loading,
      errorMessage,
      refreshNotifications,
      markNotificationAsRead,
      markAllNotificationsAsRead,
    }),
    [
      errorMessage,
      loading,
      markAllNotificationsAsRead,
      markNotificationAsRead,
      notifications,
      refreshNotifications,
    ],
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}
