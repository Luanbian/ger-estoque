import { all, call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getErrorMessage } from "../../utils/getErrorMessage";
import actions from "./slice";
import {
  ForgotPasswordPayload,
  LoginCredentials,
  LoginResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "./types";
import { APIResponse } from "../common/types";
import { API_BASE_URL } from "../../constants/api";
import { apiService } from "../../services/api";
import { tokenManager } from "../../services/token";
import { actions as wsActions } from "../ws";

const FORGOT_PASSWORD_MESSAGE = "Se o e-mail existir, você receberá instruções";

function* loginSaga(action: PayloadAction<LoginCredentials>) {
  yield put(actions.setLoading(true));
  try {
    console.log({ API_BASE_URL });
    const response: APIResponse<LoginResponse> = yield call(
      apiService.post,
      `${API_BASE_URL}/auth/login`,
      action.payload,
    );

    const { data } = response;

    yield call([tokenManager, tokenManager.set], data.accessToken);

    yield put(
      actions.setAuth({
        data: {
          tenantId: data.tenantId,
        },
        token: data.accessToken,
      }),
    );
  } catch (error) {
    const status = error instanceof AxiosError ? error.response?.status : null;
    if (status === 401 || status === 404) {
      yield put(actions.setError("E-mail ou senha inválidos"));
      return;
    }
    yield put(actions.setError(getErrorMessage(error)));
  } finally {
    yield put(actions.setLoading(false));
  }
}

function* forgotPasswordSaga(action: PayloadAction<ForgotPasswordPayload>) {
  yield put(actions.setLoading(true));
  try {
    yield call(
      apiService.post,
      `${API_BASE_URL}/auth/forgot-password`,
      action.payload,
    );

    yield put(actions.setForgotPasswordMessage(FORGOT_PASSWORD_MESSAGE));
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      yield put(actions.setForgotPasswordMessage(FORGOT_PASSWORD_MESSAGE));
      return;
    }
    yield put(actions.setError(getErrorMessage(error)));
  } finally {
    yield put(actions.setLoading(false));
  }
}

function* resetPasswordSaga(action: PayloadAction<ResetPasswordPayload>) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<ResetPasswordResponse> = yield call(
      apiService.post,
      `${API_BASE_URL}/auth/reset-password?token=${action.payload.token}`,
      { password: action.payload.newPassword },
    );
    const { data } = response;

    yield put(actions.setResetPasswordMessage(data.message));
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      yield put(actions.setError("Link inválido ou expirado"));
      return;
    }
    yield put(actions.setError(getErrorMessage(error)));
  } finally {
    yield put(actions.setLoading(false));
  }
}

function* logoutSaga() {
  yield call([tokenManager, tokenManager.clear]);
  yield put(wsActions.disconnect());
}

export function* authSagas() {
  yield all([
    takeEvery(actions.loginRequest.type, loginSaga),
    takeEvery(actions.logout.type, logoutSaga),
    takeEvery(actions.forgotPasswordRequest.type, forgotPasswordSaga),
    takeEvery(actions.resetPasswordRequest.type, resetPasswordSaga),
  ]);
}
