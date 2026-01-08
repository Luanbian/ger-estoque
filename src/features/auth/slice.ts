import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthState,
  ForgotPasswordPayload,
  LoginCredentials,
  ResetPasswordPayload,
} from "./types";

export const initialState: AuthState = {
  data: null,
  token: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (_state, _action: PayloadAction<LoginCredentials>) => {},
    forgotPasswordRequest: (
      _state,
      _action: PayloadAction<ForgotPasswordPayload>
    ) => {},
    resetPasswordRequest: (
      _state,
      _action: PayloadAction<ResetPasswordPayload>
    ) => {},
    logout: (state) => {
      state.data = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAuth: (
      state,
      action: PayloadAction<Pick<AuthState, "data" | "token">>
    ) => {
      state.data = action.payload.data;
      state.token = action.payload.token;
      state.error = null;
    },
    setForgotPasswordMessage: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.forgotPasswordMessage = action.payload;
    },
    setResetPasswordMessage: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.resetPasswordMessage = action.payload;
    },
  },
});

export const { actions } = authSlice;
export default authSlice.actions;
