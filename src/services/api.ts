import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../constants/api";
import store from "../store";
import { APIResponse } from "../features/common/types";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1_000 * 60 * 5, // 5 minutes
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiService = {
  get: async <T = unknown>(
    url: string,
    data?: any
  ): Promise<APIResponse<T>> => {
    const response: AxiosResponse = await api.get<APIResponse<T>>(url, {
      params: data,
    });
    return response.data;
  },
  post: async <T = unknown>(
    url: string,
    data: any
  ): Promise<APIResponse<T>> => {
    const response: AxiosResponse = await api.post<APIResponse<T>>(url, data);
    return response.data;
  },
  put: async <T = unknown>(url: string, data: any): Promise<APIResponse<T>> => {
    const response: AxiosResponse = await api.put<APIResponse<T>>(url, data);
    return response.data;
  },
  delete: async <T = unknown>(
    url: string,
    data?: any
  ): Promise<APIResponse<T>> => {
    const response: AxiosResponse = await api.delete<APIResponse<T>>(url, {
      data,
    });
    return response.data;
  },
  patch: async <T = unknown>(
    url: string,
    data: any
  ): Promise<APIResponse<T>> => {
    const response: AxiosResponse = await api.patch<APIResponse<T>>(url, data);
    return response.data;
  },
};
