export interface User {
  tenantId: string;
}

export interface AuthState {
  data: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  forgotPasswordMessage?: string;
  resetPasswordMessage?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  tenantId: string;
  accessToken: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}
