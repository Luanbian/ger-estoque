import { API_BASE_URL } from "./api";

export const EXCLUDED_REFRESH_PATHS = [
  `${API_BASE_URL}/auth/refresh`,
  `${API_BASE_URL}/auth/login`,
  `${API_BASE_URL}/account-shopkeeper`,
  `${API_BASE_URL}/auth/forgot-password`,
  `${API_BASE_URL}/auth/reset-password`,
  `${API_BASE_URL}/plan-type`,
];
