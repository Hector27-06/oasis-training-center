import {
  ActivitiesResponse,
  ActivityResponse,
  CreateActivityPayload,
  UpdateActivityPayload,
} from "@/src/types/activity.types";

import { api } from "./api";

export const activityService = {
  async createActivity(payload: CreateActivityPayload): Promise<ActivityResponse> {
    const response = await api.post("/activities", payload);
    return response.data.data;
  },

  async getActivities(): Promise<ActivitiesResponse> {
    const response = await api.get("/activities");
    return response.data.data;
  },

  async getActivity(id: string): Promise<ActivityResponse> {
    const response = await api.get(`/activities/${id}`);
    return response.data.data;
  },

  async updateActivity(
    id: string,
    payload: UpdateActivityPayload,
  ): Promise<ActivityResponse> {
    const response = await api.patch(`/activities/${id}`, payload);
    return response.data.data;
  },

  async deleteActivity(id: string): Promise<void> {
    await api.delete(`/activities/${id}`);
  },
};
