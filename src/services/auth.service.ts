import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "./api";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterClientPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  planId: string;
  startDate?: string;
  activityId?: string | null;
  amount: number;
  paymentMethod: "CASH" | "TRANSFER" | "TERMINAL";
  transactionId?: string | null;
  notes?: string;
};

export const authService = {
  async login(payload: LoginPayload) {
    const response = await api.post("/auth/login", payload);

    const data = response.data.data;

    await AsyncStorage.setItem("accessToken", data.accessToken);
    await AsyncStorage.setItem("refreshToken", data.refreshToken);

    return data;
  },

  async logout() {
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    if (refreshToken) {
      await api.post("/auth/logout", { refreshToken });
    }

    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
  },

  async getMembershipPlans() {
    const response = await api.get("/memberships/plans");
    return response.data.data;
  },

  async getClients() {
    const response = await api.get("/clients?page=1&limit=50");
    return response.data.data.data;
  },

  async updateClient(
    id: string,
    payload: {
      firstName?: string;
      lastName?: string;
      phone?: string;
    },
  ) {
    const response = await api.patch(`/clients/${id}`, payload);
    return response.data.data;
  },

  async deleteClient(id: string) {
    const response = await api.delete(`/clients/${id}`);
    return response.data.data;
  },

  async registerClient(payload: RegisterClientPayload) {
    const response = await api.post("/clients/register", payload);
    return response.data.data;
  },
  async createMembershipPlan(payload: {
    name: string;
    description: string;
    price: number;
    duration: number;
  }) {
    const response = await api.post("/memberships/plans", payload);
    return response.data.data;
  },

  async updateMembershipPlan(
    id: string,
    payload: {
      name?: string;
      description?: string;
      price?: number;
      duration?: number;
    },
  ) {
    const response = await api.patch(`/memberships/plans/${id}`, payload);
    return response.data.data;
  },

  async deleteMembershipPlan(id: string) {
    const response = await api.delete(`/memberships/plans/${id}`);
    return response.data.data;
  },
  async getDashboardReport() {
    const response = await api.get("/reports/dashboard");
    return response.data.data;
  },

  async getMonthlyIncome() {
    const response = await api.get("/reports/monthly-income");
    return response.data.data;
  },

  async getUsersByActivity() {
    const response = await api.get("/reports/users-by-activity");
    return response.data.data;
  },

  async getPaymentsReport() {
    const response = await api.get("/reports/payments");
    return response.data.data;
  },

  async getActiveMembershipsReport() {
    const response = await api.get("/reports/active-memberships");
    return response.data.data;
  },
  async getProfile() {
    const response = await api.get("/auth/profile");
    return response.data.data;
  },
};
