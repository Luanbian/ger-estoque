import { all, call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { actions } from "./slice";
import { Whatsapp } from "./types";
import { APIResponse } from "../common/types";
import { API_BASE_URL } from "../../constants/api";
import { apiService } from "../../services/api";

function* getWhatsapp() {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Whatsapp> = yield call(
      apiService.get,
      `${API_BASE_URL}/whatsapp`,
    );

    yield put(actions.setWhatsapp(response.data));
  } catch (error) {
    yield put(
      actions.setError(
        error instanceof AxiosError
          ? error.response?.data.error
          : "An unknown error occurred",
      ),
    );
  } finally {
    yield put(actions.setLoading(false));
  }
}

function* updateWhatsapp(action: PayloadAction<Whatsapp>) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Whatsapp> = yield call(
      apiService.put,
      `${API_BASE_URL}/whatsapp`,
      {
        acceptedMessage: action.payload.acceptedMessage,
        rejectedMessage: action.payload.rejectedMessage,
      },
    );

    yield put(actions.setWhatsapp(response.data));
  } catch (error) {
    yield put(
      actions.setError(
        error instanceof AxiosError
          ? error.response?.data.error
          : "An unknown error occurred",
      ),
    );
  } finally {
    yield put(actions.setLoading(false));
  }
}

function* createWhatsapp(action: PayloadAction<Whatsapp>) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Whatsapp> = yield call(
      apiService.post,
      `${API_BASE_URL}/whatsapp`,
      {
        acceptedMessage: action.payload.acceptedMessage,
        rejectedMessage: action.payload.rejectedMessage,
      },
    );

    yield put(actions.setWhatsapp(response.data));
  } catch (error) {
    yield put(
      actions.setError(
        error instanceof AxiosError
          ? error.response?.data.error
          : "An unknown error occurred",
      ),
    );
  } finally {
    yield put(actions.setLoading(false));
  }
}

export function* whatsappSagas() {
  yield all([
    takeEvery(actions.whatsappRequest.type, getWhatsapp),
    takeEvery(actions.updateWhatsappRequest.type, updateWhatsapp),
    takeEvery(actions.createWhatsappRequest.type, createWhatsapp),
  ]);
}
