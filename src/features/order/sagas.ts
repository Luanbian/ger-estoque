import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { actions } from "./slice";
import { APIResponse, PaginationRequest } from "../common/types";
import { Order } from "./types";
import { apiService } from "../../services/api";
import { PayloadAction } from "@reduxjs/toolkit";
import { generateParams } from "../../utils/generateParams";
import { Filters } from "../filters/types";
import { AppState } from "../../store";

function* getOrders(payload: PayloadAction<PaginationRequest | undefined>) {
  try {
    yield put(actions.setLoading(true));
    const filters: Filters = yield select((state: AppState) => state.filter);

    const response: APIResponse<Order[]> = yield call(
      apiService.post,
      "/order/list",
      filters.sale || {},
      generateParams(payload.payload),
    );

    const { data } = response;

    yield put(actions.setOrders(data));
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

function* updateOrderStatus(
  payload: PayloadAction<{ orderId: string; status: string }>,
) {
  try {
    const { orderId, status } = payload.payload;

    const result: APIResponse<Order> = yield call(
      apiService.patch,
      `/order/${orderId}/status`,
      { status },
    );

    const { data } = result;

    yield put(actions.setOneOrder(data));
  } catch (error) {
    yield put(
      actions.setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
}

export function* orderSagas() {
  yield all([
    takeEvery(actions.getOrdersRequest.type, getOrders),
    takeEvery(actions.updateOrderStatusRequest.type, updateOrderStatus),
  ]);
}
