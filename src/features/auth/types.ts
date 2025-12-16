export interface User {
  tenantId: string;
  email: string;
}

export interface AuthState {
  data: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  _id: string;
  email: string;
  tenantId: string;
  accessToken: string;
}
