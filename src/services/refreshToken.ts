import axios from "axios";
import { API_BASE_URL } from "../constants/api";
import { APIResponse } from "../features/common/types";
import { LoginResponse } from "../features/auth/types";
import { tokenManager } from "./token";
import store from "../store";
import { actions } from "../features/auth";
import { EXCLUDED_REFRESH_PATHS } from "../constants/refreshToken";

const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Pathname prefix do API_BASE_URL (ex.: "/api" em "http://localhost:3000/api")
const API_BASE_PATH = (() => {
  try {
    return new URL(API_BASE_URL).pathname.replace(/\/$/, "");
  } catch {
    return "";
  }
})();

/**
 * Normaliza qualquer URL de request para o pathname relativo ao API base.
 * Funciona para URLs completas ("http://host/api/auth/login") e relativas ("/auth/login").
 */
function toApiPath(url: string): string {
  try {
    const { pathname } = url.startsWith("http")
      ? new URL(url)
      : new URL(url, API_BASE_URL);
    return API_BASE_PATH && pathname.startsWith(API_BASE_PATH)
      ? pathname.slice(API_BASE_PATH.length) || "/"
      : pathname;
  } catch {
    return url;
  }
}

/** Retorna true para rotas que não devem disparar refresh de token. */
export function shouldSkipRefreshRequest(url?: string): boolean {
  if (!url) return false;
  return EXCLUDED_REFRESH_PATHS.includes(toApiPath(url));
}

/**
 * Faz a chamada HTTP de refresh de token.
 * Em caso de falha: limpa o token e dispara logout no Redux.
 * Chamada apenas pelo triggerRefresh() em api.ts — sem deduplicação aqui.
 */
export async function performRefresh(): Promise<void> {
  let succeeded = false;
  try {
    const resp = await refreshClient.post<APIResponse<LoginResponse>>(
      "/auth/refresh",
      {},
    );
    const newToken = resp.data?.data?.accessToken;
    if (!newToken) throw new Error("refresh-no-token");

    await tokenManager.set(newToken);
    store.dispatch(
      actions.setAuth({
        data: store.getState().auth.data,
        token: newToken,
      }),
    );
    succeeded = true;
  } finally {
    if (!succeeded) {
      await tokenManager.clear();
      store.dispatch(actions.logout());
    }
  }
}
