import { useContext } from "react";

import {
  NotificationContext,
  NotificationContextValue,
} from "@/src/context/NotificationContext";

export default function useNotifications(): NotificationContextValue {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotifications debe utilizarse dentro de NotificationProvider.");
  }

  return context;
}
