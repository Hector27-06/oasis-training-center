import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthLoginResponse } from "@/src/types/auth.types";

import { api } from "./api";

interface ApiResponse<T> {
  data: T;
}

type LoginPayload = {
  email: string;
  password: string;
};

export const authService = {
  async login(payload: LoginPayload): Promise<AuthLoginResponse> {
    const response = await api.post<ApiResponse<AuthLoginResponse>>(
      "/auth/login",
      payload,
    );

    const data = response.data.data;

    await AsyncStorage.setItem("accessToken", data.accessToken);
    await AsyncStorage.setItem("refreshToken", data.refreshToken);

    return data;
  },
  async refreshAccessToken() {
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token");
    }

    const response = await api.post("/auth/refresh", {
      refreshToken,
    });

    const data = response.data.data;
    const accessToken = data.accessToken;

    await AsyncStorage.setItem("accessToken", accessToken);

    if (data.refreshToken) {
      await AsyncStorage.setItem("refreshToken", data.refreshToken);
    }

    return data;
  },
  async changePassword(currentPassword: string, newPassword: string) {
    const response = await api.post("/auth/change-password", {
      currentPassword,
      newPassword,
    });

    return response.data.data;
  },
  async logout() {
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    try {
      if (refreshToken) {
        const response = await api.post("/auth/logout", { refreshToken });
        return response.data.data;
      }

      return null;
    } finally {
      await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
    }
  },

};
