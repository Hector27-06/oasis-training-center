import { api } from "./api";
import { Attendance } from "@/src/types/attendance.types";
import { Payment } from "@/src/types/payment.types";

export type RegisterClientPayload = {
  firstName: string;
  lastName: string;
  email: string;
  planId: string;
  paymentMethod: "CASH" | "TRANSFER" | "TERMINAL";
  phone?: string;
  startDate?: string;
  activityId?: string | null;
  months?: number;
  discount?: number;
  transactionId?: string | null;
  notes?: string;
};

export type UpdateClientPayload = {
  firstName?: string;
  lastName?: string;
  phone?: string;
};

export type Client = {
  id: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  address?: string | null;
  birthDate?: string | null;
  avatarUrl?: string | null;
  createdAt?: string;
  user?: {
    email: string;
    role: string;
    isActive: boolean;
  };
};

export type ClientListMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ClientListResponse = {
  data: Client[];
  meta: ClientListMeta;
};

export type GetClientsParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
};

export type ClientDashboardStats = {
  classesThisMonth: number;
  currentStreak: number;
};

export const clientService = {
  async getMyDashboardStats(): Promise<ClientDashboardStats> {
    const response = await api.get("/clients/me/stats");
    return response.data.data;
  },

  async getClients({
    page = 1,
    limit = 10,
    search = "",
    sortBy = "createdAt",
    order = "desc",
  }: GetClientsParams = {}): Promise<ClientListResponse> {
    const response = await api.get("/clients", {
      params: { page, limit, search, sortBy, order },
    });

    return response.data.data;
  },

  async getClient(id: string) {
    const response = await api.get(`/clients/${id}`);
    return response.data.data;
  },

  async getClientPayments(clientId: string): Promise<Payment[]> {
    const response = await api.get(`/clients/${clientId}/payments`);
    return response.data.data;
  },

  async getClientAttendance(clientId: string): Promise<Attendance[]> {
    const response = await api.get(`/clients/${clientId}/attendance`);
    return response.data.data;
  },

  async updateClient(id: string, payload: UpdateClientPayload) {
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
};
