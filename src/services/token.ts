import { getStore } from "./storage";
import { jwtDecode } from "jwt-decode";

export const setAccessTokenCookie = async (token: string) => {
  const store = await getStore();
  await store.set("accessToken", token);
  await store.save();
};

export const getAccessTokenCookie = async (): Promise<string | null> => {
  const store = await getStore();

  const tokenData = await store.get("accessToken");
  if (!tokenData) return null;

  return tokenData as string;
};

export const clearAccessTokenCookie = async () => {
  const store = await getStore();

  await store.set("accessToken", null);
  await store.save();
};

export const isTokenExpiringSoon = async (thresholdSeconds = 60 * 2) => {
  const store = await getStore();
  const token = await store.get("accessToken");
  if (!token) return true;

  const payload = jwtDecode(token as string);
  if (!payload || !payload.exp) return true;

  const now = Math.floor(Date.now() / 1000);
  return payload.exp - now < thresholdSeconds;
};
