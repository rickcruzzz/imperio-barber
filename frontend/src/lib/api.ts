import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { clearSessionToken, getSessionToken, setSessionToken } from "./auth";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1",
  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshing = false;

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const original = error.config;
    if (error.response?.status === 401 && original && !original._retry) {
      if (refreshing) {
        return Promise.reject(error);
      }

      refreshing = true;
      original._retry = true;

      try {
        const { data } = await api.post("/auth/refresh", {});
        setSessionToken(data.accessToken);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch (refreshError) {
        clearSessionToken();
        return Promise.reject(refreshError);
      } finally {
        refreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
