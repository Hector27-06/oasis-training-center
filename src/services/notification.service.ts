import { MyNotificationsResponse } from "@/src/types/notification.types";

import { api } from "./api";

export const notificationService = {
  async getMyNotifications(): Promise<MyNotificationsResponse> {
    const response = await api.get("/notifications/my");
    return response.data.data;
  },

  async markNotificationAsRead(id: string): Promise<void> {
    await api.patch(`/notifications/${id}/read`);
  },

  async markAllMyNotificationsAsRead(): Promise<void> {
    await api.patch("/notifications/read-all/me");
  },
};
