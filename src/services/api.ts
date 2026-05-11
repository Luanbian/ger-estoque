import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { API_BASE_URL } from "../constants/api";
import { APIResponse } from "../features/common/types";
import { tokenManager } from "./token";
import { performRefresh, shouldSkipRefreshRequest } from "./refreshToken";

// ─── Refresh queue ────────────────────────────────────────────────────────────
//
// Garante que apenas um refresh ocorre por vez.
// Requests que chegam enquanto o refresh está em andamento (seja por proativo
// no request interceptor ou por 401 no response interceptor) entram na fila e
// são desbloqueadas com o token novo quando o refresh conclui.

type QueueEntry = { resolve: () => void; reject: (err: unknown) => void };

let isRefreshing = false;
let refreshQueue: QueueEntry[] = [];

function drainQueue(err: unknown = null): void {
  for (const { resolve, reject } of refreshQueue) {
    err ? reject(err) : resolve();
  }
  refreshQueue = [];
}

function waitInQueue(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    refreshQueue.push({ resolve, reject });
  });
}

/**
 * Ponto único de entrada para refresh de token.
 *
 * - Se já está refreshando: entra na fila e aguarda.
 * - Se não está: inicia o refresh, drena a fila ao concluir.
 */
async function triggerRefresh(): Promise<void> {
  if (isRefreshing) {
    return waitInQueue();
  }

  isRefreshing = true;
  try {
    await performRefresh();
    drainQueue();
  } catch (err) {
    drainQueue(err);
    throw err;
  } finally {
    isRefreshing = false;
  }
}

// ─── Axios instance ───────────────────────────────────────────────────────────

const api: AxiosInstance = axios.create({
  timeout: 30_000,
  withCredentials: true,
});

// ─── Request interceptor ──────────────────────────────────────────────────────
//
// Refresh PROATIVO: dispara antes da request quando o token está prestes a
// expirar — evita que o servidor receba um token expirado e devolva 401.
// Se um refresh já está em andamento, a request entra na fila e espera.

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    config.baseURL = API_BASE_URL;
    if (shouldSkipRefreshRequest(config.url)) return config;

    if (isRefreshing || tokenManager.isExpiringSoon()) {
      try {
        await triggerRefresh();
      } catch {
        // Refresh falhou — a request prossegue sem token.
        // O response interceptor vai capturar o 401 resultante.
      }
    }

    const token = tokenManager.get();
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response interceptor ─────────────────────────────────────────────────────
//
// Refresh REATIVO: captura 401 inesperados (token revogado no servidor,
// skew de clock, etc.) e tenta refresh uma única vez por request.
// Requests que chegam enquanto o refresh está em andamento entram na fila via
// triggerRefresh() — sem retry em loop, sem refresh duplicado.

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (!original) return Promise.reject(error);
    if (original._retry) return Promise.reject(error);
    if (shouldSkipRefreshRequest(original.url)) return Promise.reject(error);
    if (error.response?.status !== 401) return Promise.reject(error);

    original._retry = true;

    try {
      await triggerRefresh();
    } catch {
      // Refresh falhou — rejeita com o erro original (401) para o caller.
      return Promise.reject(error);
    }

    const token = tokenManager.get();
    if (token) {
      original.headers.set("Authorization", `Bearer ${token}`);
    }

    return api(original);
  },
);

// ─── API service ──────────────────────────────────────────────────────────────

export const apiService = {
  get: async <T = unknown>(
    url: string,
    params?: unknown,
  ): Promise<APIResponse<T>> => {
    const response: AxiosResponse<APIResponse<T>> = await api.get(url, {
      params,
    });
    return response.data;
  },

  post: async <T = unknown>(
    url: string,
    data?: unknown,
    params?: unknown,
  ): Promise<APIResponse<T>> => {
    const response: AxiosResponse<APIResponse<T>> = await api.post(url, data, {
      params,
    });
    return response.data;
  },

  put: async <T = unknown>(
    url: string,
    data?: unknown,
  ): Promise<APIResponse<T>> => {
    const response: AxiosResponse<APIResponse<T>> = await api.put(url, data);
    return response.data;
  },

  patch: async <T = unknown>(
    url: string,
    data?: unknown,
  ): Promise<APIResponse<T>> => {
    const response: AxiosResponse<APIResponse<T>> = await api.patch(url, data);
    return response.data;
  },

  delete: async <T = unknown>(
    url: string,
    data?: unknown,
  ): Promise<APIResponse<T>> => {
    const response: AxiosResponse<APIResponse<T>> = await api.delete(url, {
      data,
    });
    return response.data;
  },
};
