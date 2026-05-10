// Pathnames relativos ao API base (sem o prefixo do API_BASE_URL)
// Ex.: API_BASE_URL = "http://localhost:3000/api" → paths aqui são "/auth/login", não "/api/auth/login"
export const EXCLUDED_REFRESH_PATHS = [
  "/auth/refresh",
  "/auth/login",
  "/account-shopkeeper",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/plan-type",
];
