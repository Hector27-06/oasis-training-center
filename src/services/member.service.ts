import { api } from "./api";

export const memberService = {
  async getProfile() {
    const response = await api.get("/auth/profile");

    return response.data.data;
  },

  async getSchedule() {
    const response = await api.get("/classes/schedule");

    return response.data.data;
  },

  async reserveClass(classId: string) {
    const response = await api.post("/reservations", {
      classId,
    });

    return response.data.data;
  },

  async getMyReservations() {
    const response = await api.get("/reservations");

    console.log("RESERVATIONS RESPONSE");
    console.log(response.data);

    return response.data.data;
  },

  async getMyPRs() {
    const response = await api.get("/personal-records/my");

    return response.data.data;
  },

  async createPR(payload: {
    exercise: string;
    weight: number;
    unit: "KG" | "LB";
    notes?: string;
  }) {
    const response = await api.post("/personal-records", payload);

    return response.data.data;
  },

  async updatePR(
    id: string,
    payload: {
      exercise?: string;
      weight?: number;
      unit?: "KG" | "LB";
      notes?: string;
    },
  ) {
    const response = await api.patch(`/personal-records/${id}`, payload);

    return response.data.data;
  },

  async deletePR(id: string) {
    const response = await api.delete(`/personal-records/${id}`);

    return response.data.data;
  },

  async getMyMembership() {
    const response = await api.get("/memberships/my");

    console.log("MEMBERSHIP RESPONSE");
    console.log(response.data);

    return response.data.data;
  },

  async getNotifications() {
    const response = await api.get("/notifications/my");

    return response.data.data;
  },
};
