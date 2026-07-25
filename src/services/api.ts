import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError, create, InternalAxiosRequestConfig } from "axios";

const API_URL =
  "https://gym-management-backend-production-f7ae.up.railway.app/api/v1";

export const api = create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshRequest: Promise<string> | null = null;
let sessionExpiration: Promise<void> | null = null;
let onSessionExpired: (() => void) | null = null;

export function setSessionExpiredHandler(handler: (() => void) | null) {
  onSessionExpired = handler;
}

async function clearTokens() {
  await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
}

async function refreshAccessToken() {
  const refreshToken = await AsyncStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await api.post("/auth/refresh", { refreshToken });
  const accessToken = response.data.data.accessToken as string;

  await AsyncStorage.setItem("accessToken", accessToken);

  return accessToken;
}

async function expireSession() {
  sessionExpiration ??= clearTokens().then(() => onSessionExpired?.());

  try {
    await sessionExpiration;
  } finally {
    sessionExpiration = null;
  }
}

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const isUnauthorized = error.response?.status === 401;
    const isRefreshRequest = originalRequest?.url?.includes("/auth/refresh");

    if (isUnauthorized && originalRequest && !originalRequest._retry && !isRefreshRequest) {
      originalRequest._retry = true;

      try {
        refreshRequest ??= refreshAccessToken();
        const accessToken = await refreshRequest;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch {
        await expireSession();
      } finally {
        refreshRequest = null;
      }
    }

    return Promise.reject(error);
  },
);
