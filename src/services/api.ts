import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../constants/api";
import { APIResponse } from "../features/common/types";
import { getAccessTokenCookie, isTokenExpiringSoon } from "./token";
import {
  attachAuthHeader,
  ensureRefreshPromise,
  shouldSkipRefreshRequest,
} from "./refreshToken";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1_000 * 60 * 5, // 5 minutes
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    if (shouldSkipRefreshRequest(config.url)) {
      return config;
    }

    let token = await getAccessTokenCookie();
    const isTokenExpiring = await isTokenExpiringSoon();

    if (isTokenExpiring) {
      try {
        await ensureRefreshPromise();
      } catch {
        // se refresh falhar, não faz nada
      }

      token = await getAccessTokenCookie();
    }

    if (token) {
      config.headers = attachAuthHeader(config.headers ?? {}, token);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config as any;
    if (!originalRequest) return Promise.reject(error);

    // evita loop de retry
    if (originalRequest._retry) return Promise.reject(error);

    if (shouldSkipRefreshRequest(originalRequest.url)) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      originalRequest._retry = true;
      try {
        await ensureRefreshPromise();
        const token = await getAccessTokenCookie();
        if (token) {
          originalRequest.headers = attachAuthHeader(
            originalRequest.headers ?? {},
            token
          );
          return api(originalRequest);
        }
      } catch {
        // refresh falhou — rejeita para tratamento externo
      }
    }

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
