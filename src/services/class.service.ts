import {
  ClassDetails,
  CreateClassPayload,
  GetClassScheduleParams,
  GymClass,
  UpdateClassPayload,
} from "@/src/types/class.types";

import { api } from "./api";

type ApiClass = Omit<GymClass, "reservationsCount" | "availableSpots">;

function normalizeClass(gymClass: ApiClass): GymClass {
  const reservationsCount = gymClass._count?.reservations ?? 0;

  return {
    ...gymClass,
    reservationsCount,
    availableSpots: Math.max(0, gymClass.capacity - reservationsCount),
  };
}

export const classService = {
  async createClass(payload: CreateClassPayload): Promise<GymClass> {
    const response = await api.post("/classes", payload);
    return normalizeClass(response.data.data as ApiClass);
  },

  async getClasses(): Promise<GymClass[]> {
    const response = await api.get("/classes");
    return (response.data.data as ApiClass[]).map(normalizeClass);
  },

  async getSchedule({ date }: GetClassScheduleParams = {}): Promise<GymClass[]> {
    const response = await api.get("/classes/schedule", { params: { date } });
    return (response.data.data as ApiClass[]).map(normalizeClass);
  },

  async getClass(id: string): Promise<ClassDetails> {
    const response = await api.get(`/classes/${id}`);
    return normalizeClass(response.data.data as ApiClass) as ClassDetails;
  },

  async updateClass(id: string, payload: UpdateClassPayload): Promise<GymClass> {
    const response = await api.patch(`/classes/${id}`, payload);
    return normalizeClass(response.data.data as ApiClass);
  },

  async deleteClass(id: string): Promise<void> {
    await api.delete(`/classes/${id}`);
  },
};
