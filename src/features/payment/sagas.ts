import { all, call, put, takeEvery } from "redux-saga/effects";
import actions from "./slice";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { apiService } from "../../services/api";
import { PayloadAction } from "@reduxjs/toolkit";
import { CreatePaymentPayload, PaymentResponse } from "./types";
import { APIResponse } from "../common/types";

function* getCheckoutSaga(payload: PayloadAction<CreatePaymentPayload>) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<PaymentResponse> = yield call(
      apiService.post,
      "/payment/checkout",
      payload.payload,
    );

    const { data } = response;

    yield put(actions.setPayment(data));
  } catch (error) {
    yield put(actions.setError(getErrorMessage(error)));
  } finally {
    yield put(actions.setLoading(false));
  }
}

export function* paymentSagas() {
  yield all([takeEvery(actions.createCheckoutRequest.type, getCheckoutSaga)]);
}
