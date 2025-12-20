import { all, call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { actions } from "./slice.ts";
import { CreateProductPayload, Product, RequestProduct } from "./types.ts";
import { APIResponse } from "../common/types.ts";
import { API_BASE_URL } from "../../constants/api.ts";
import { apiService } from "../../services/api.ts";

function* getProduct(_action: PayloadAction<RequestProduct>) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Product[]> = yield call(
      apiService.get,
      `${API_BASE_URL}/product`
    );

    const { data } = response;

    yield put(actions.setProduct(data));
  } catch (error) {
    yield put(
      actions.setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      )
    );
  } finally {
    yield put(actions.setLoading(false));
  }
}

function* createProduct(payload: PayloadAction<CreateProductPayload>) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Product> = yield call(
      apiService.post,
      `${API_BASE_URL}/product`,
      payload.payload
    );

    const { data } = response;

    yield put(actions.addProduct(data));
  } catch (error) {
    yield put(
      actions.setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      )
    );
  } finally {
    yield put(actions.setLoading(false));
  }
}

export function* productSagas() {
  yield all([
    takeEvery(actions.productRequest.type, getProduct),
    takeEvery(actions.createProductRequest.type, createProduct),
  ]);
}
