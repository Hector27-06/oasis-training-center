import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL =
  "https://gym-management-backend-production-f7ae.up.railway.app/api/v1";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log(
    `🚀 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
  );

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("❌ API ERROR");
    console.log(error?.response?.data || error.message);

    return Promise.reject(error);
  },
);
