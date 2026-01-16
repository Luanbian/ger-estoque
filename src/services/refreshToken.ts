import axios from "axios";
import { API_BASE_URL } from "../constants/api";
import { APIResponse } from "../features/common/types";
import { LoginResponse } from "../features/auth/types";
import { clearAccessTokenCookie, setAccessTokenCookie } from "./token";
import store from "../store";
import { actions } from "../features/auth";
import { EXCLUDED_REFRESH_PATHS } from "../constants/refreshToken";

const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1_000 * 60 * 5, // 5 minutes
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
let refreshPromise: Promise<void> | null = null;

async function doRefresh(): Promise<void> {
  try {
    const resp = await refreshClient.post<APIResponse<LoginResponse>>(
      "/auth/refresh",
      {}
    );
    const newToken = resp.data?.data?.accessToken;
    if (newToken) {
      await setAccessTokenCookie(newToken);
      const currentUser = store.getState().auth.data;
      store.dispatch(
        actions.setAuth({
          data: currentUser,
          token: newToken,
        })
      );
    } else {
      clearAccessTokenCookie();
      store.dispatch(actions.logout());
      throw new Error("no-token");
    }
  } catch (err) {
    clearAccessTokenCookie();
    store.dispatch(actions.logout());
    throw err;
  }
}

export const shouldSkipRefreshRequest = (url?: string): boolean => {
  if (!url) return false;
  try {
    const path = url.startsWith("http")
      ? new URL(url).pathname
      : new URL(url, API_BASE_URL).pathname;
    return EXCLUDED_REFRESH_PATHS.includes(path);
  } catch (error) {
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

export const attachAuthHeader = (headers: any, token?: string | null) => {
  if (!token) return headers;
  headers = headers ?? {};
  headers["Authorization"] = `Bearer ${token}`;
  return headers;
};
