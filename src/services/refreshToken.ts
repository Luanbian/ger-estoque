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
  timeout: 1_000 * 60 * 5,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let refreshPromise: Promise<void> | null = null;

async function doRefresh(): Promise<void> {
  let succeeded = false;
  try {
    const resp = await refreshClient.post<APIResponse<LoginResponse>>(
      "/auth/refresh",
      {},
    );
    const newToken = resp.data?.data?.accessToken;
    if (!newToken) throw new Error("no-token");

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

export const shouldSkipRefreshRequest = (url?: string): boolean => {
  if (!url) return false;
  try {
    const path = url.startsWith("http")
      ? new URL(url).pathname
      : new URL(url, API_BASE_URL).pathname;
    return EXCLUDED_REFRESH_PATHS.includes(path);
  } catch {
    return false;
  }
};

export const ensureRefreshPromise = (): Promise<void> => {
  if (!refreshPromise) {
    refreshPromise = doRefresh().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

export const attachAuthHeader = (
  headers: Record<string, string>,
  token?: string | null,
): Record<string, string> => {
  if (!token) return headers;
  return { ...headers, Authorization: `Bearer ${token}` };
};
