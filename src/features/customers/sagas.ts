import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { actions } from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { APIResponse, PaginationRequest } from "../common/types";
import { apiService } from "../../services/api";
import { Filters } from "../filters/types";
import { AppState } from "../../store";
import { generateParams } from "../../utils/generateParams";
import { CreateCustomerPayload, Customer } from "./types";

function* getCustomers(payload: PayloadAction<PaginationRequest | undefined>) {
  yield put(actions.setLoading(true));
  try {
    const filters: Filters = yield select((state: AppState) => state.filter);

    const response: APIResponse<Customer[]> = yield call(
      apiService.post,
      `/customer/list`,
      filters?.customer || {},
      generateParams(payload.payload),
    );

    const { data } = response;

    yield put(actions.setCustomers(data));
    yield put(actions.setPagination(response.pagination || null));
  } catch (error) {
    yield put(
      actions.setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  } finally {
    yield put(actions.setLoading(false));
  }
}

function* createCustomer(payload: PayloadAction<CreateCustomerPayload>) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Customer> = yield call(
      apiService.post,
      `/customer`,
      payload.payload,
    );

    const { data } = response;

    yield put(actions.addCustomer(data));
  } catch (error) {
    yield put(
      actions.setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  } finally {
    yield put(actions.setLoading(false));
  }
}

function* getCustomerMaxSpent() {
  try {
    const response: APIResponse<number> = yield call(
      apiService.get,
      "/customer/max-spent",
    );

    const { data } = response;

    yield put(actions.setMaxSpent(data));
  } catch (error) {
    yield put(
      actions.setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
}

export function* customerSagas() {
  yield all([
    takeEvery(actions.customersRequest.type, getCustomers),
    takeEvery(actions.createCustomerRequest.type, createCustomer),
    takeEvery(actions.getCustomerMaxSpentRequest.type, getCustomerMaxSpent),
  ]);
}
