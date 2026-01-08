import { all, call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import actions from "./slice";
import {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginCredentials,
  LoginResponse,
} from "./types";
import { APIResponse } from "../common/types";
import { API_BASE_URL } from "../../constants/api";
import { apiService } from "../../services/api";

function* loginSaga(action: PayloadAction<LoginCredentials>) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<LoginResponse> = yield call(
      apiService.post,
      `${API_BASE_URL}/auth/login`,
      action.payload
    );

    const { data } = response;

    yield put(
      actions.setAuth({
        data: {
          email: data.email,
          tenantId: data.tenantId,
        },
        token: data.accessToken,
      })
    );
  } catch (error) {
    yield put(
      actions.setError(
        error instanceof AxiosError
          ? error.response?.data.error
          : "An unknown error occurred"
      )
    );
  } finally {
    yield put(actions.setLoading(false));
  }
}

function* forgotPasswordSaga(action: PayloadAction<ForgotPasswordPayload>) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<ForgotPasswordResponse> = yield call(
      apiService.post,
      `${API_BASE_URL}/auth/forgot-password`,
      action.payload
    );

    const { data } = response;

    yield put(actions.setForgotPasswordMessage(data.message));
  } catch (error) {
    yield put(
      actions.setError(
        error instanceof AxiosError
          ? error.response?.data.error
          : "An unknown error occurred"
      )
    );
  } finally {
    yield put(actions.setLoading(false));
  }
}

export function* authSagas() {
  yield all([
    takeEvery(actions.loginRequest.type, loginSaga),
    takeEvery(actions.forgotPasswordRequest.type, forgotPasswordSaga),
  ]);
}
