import { all, call, put, select, takeEvery } from "redux-saga/effects";
import actions from "./slice";
import { APIResponse, PaginationRequest } from "../common/types";
import { apiService } from "../../services/api";
import { CreateSalePayload, Sales } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import { Filters } from "../filters/types";
import { AppState } from "../../store";

function* getSales(payload: PayloadAction<PaginationRequest>) {
  yield put(actions.setLoading(true));
  try {
    const filters: Filters = yield select((state: AppState) => state.filter);

    const response: APIResponse<Sales[]> = yield call(
      apiService.post,
      `/sales/list`,
      filters.sales || {},
      payload.payload,
    );

    const { data } = response;

    yield put(actions.setSales(data));
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

function* createSales(payload: PayloadAction<CreateSalePayload>) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Sales> = yield call(
      apiService.post,
      `/sales`,
      payload.payload,
    );

    const { data } = response;

    yield put(actions.addSale(data));
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

export function* salesSagas() {
  yield all([
    takeEvery(actions.salesRequest.type, getSales),
    takeEvery(actions.createSaleRequest.type, createSales),
  ]);
}
