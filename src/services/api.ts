import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

export const USE_MOCKS = process.env.EXPO_PUBLIC_USE_MOCKS !== "false";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
