import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { AxiosError } from "axios";
import { actions } from "./slice";
import { AccountShopkeeper, CreateAccountShopkeeperPayload } from "./types.ts";
import { apiService } from "../../services/api.ts";
import { APIResponse } from "../common/types.ts";

function* registerAccountSaga(
  payload: PayloadAction<CreateAccountShopkeeperPayload>
) {
  yield put(actions.setLoading(true));
  try {
    yield call(apiService.post, "/account-shopkeeper", payload.payload);
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

function* getAccountShopkeeper() {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<AccountShopkeeper> = yield call(
      apiService.get,
      "/account-shopkeeper"
    );

    const { data } = response;

    yield put(actions.setAccountShopkeeper(data));
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

export function* accountShopkeeperSagas() {
  yield all([
    takeEvery(actions.registerAccountRequest.type, registerAccountSaga),
    takeEvery(actions.getAccountShopkeeperRequest.type, getAccountShopkeeper),
  ]);
}
