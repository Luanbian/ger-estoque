import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { APIResponse, PaginationRequest } from "../common/types";
import { apiService } from "../../services/api";
import { CreateSalePayload, Sales } from "./types";
import { Filters } from "../filters/types";
import { AppState } from "../../store";
import { generateParams } from "../../utils/generateParams";
import actions from "./slice";

function* getSales(payload: PayloadAction<PaginationRequest | undefined>) {
  yield put(actions.setLoading(true));
  try {
    const filters: Filters = yield select((state: AppState) => state.filter);

    const response: APIResponse<Sales[]> = yield call(
      apiService.post,
      `/sale/list`,
      filters.sales || {},
      generateParams(payload.payload),
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
      `/sale`,
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

function* getMaxSalesInvoicing() {
  try {
    const response: APIResponse<number> = yield call(
      apiService.get,
      `/sale/max-invoicing`,
    );

    const { data } = response;

    yield put(actions.setMaxSalesInvoicing(data));
  } catch (error) {
    yield put(
      actions.setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
}

export function* salesSagas() {
  yield all([
    takeEvery(actions.salesRequest.type, getSales),
    takeEvery(actions.createSaleRequest.type, createSales),
    takeEvery(actions.getMaxSalesInvoicingRequest.type, getMaxSalesInvoicing),
  ]);
}
