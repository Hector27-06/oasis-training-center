import {
  GetUsersParams,
  UpdateUserPayload,
  UpdateUserProfilePayload,
  UserAccount,
  UserListResponse,
  UserProfile,
} from "@/src/types/user.types";

import { api } from "./api";

interface ApiResponse<T> {
  data: T;
}

export const userService = {
  async getProfile(): Promise<UserProfile> {
    const response = await api.get<ApiResponse<UserProfile>>("/users/profile");
    return response.data.data;
  },

  async updateProfile(payload: UpdateUserProfilePayload): Promise<UserProfile> {
    const response = await api.patch<ApiResponse<UserProfile>>("/users/profile", payload);
    return response.data.data;
  },

  async getUsers({ page = 1, limit = 50 }: GetUsersParams = {}): Promise<UserListResponse> {
    const response = await api.get<ApiResponse<UserListResponse>>("/users", {
      params: { page, limit },
    });
    return response.data.data;
  },

  async getUser(id: string): Promise<UserAccount> {
    const response = await api.get<ApiResponse<UserAccount>>(`/users/${id}`);
    return response.data.data;
  },

  async updateUser(id: string, payload: UpdateUserPayload): Promise<UserAccount> {
    const response = await api.patch<ApiResponse<UserAccount>>(`/users/${id}`, payload);
    return response.data.data;
  },
};
