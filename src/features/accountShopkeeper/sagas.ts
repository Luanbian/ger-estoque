import { all, call, put, takeEvery } from "redux-saga/effects";
import actions from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { AccountShopkeeper, CreateAccountShopkeeperPayload } from "./types";
import { AxiosError } from "axios";
import { APIResponse } from "../common/types";
import { apiService } from "../../services/api";

function* registerAccountSaga(
  payload: PayloadAction<CreateAccountShopkeeperPayload>
) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<AccountShopkeeper> = yield call(
      apiService.post,
      "/account-shopkeeper",
      payload.payload
    );
    const { data } = response;

    yield put(actions.setAccountShopkeeper({ data }));
    yield put(actions.setResponseMessage(response.message));
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
  ]);
}
