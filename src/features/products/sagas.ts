import { all, call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { actions } from "./slice.ts";
import {
  ProductPayload,
  CreateProductWithVariantPayload,
  Product,
  RequestProduct,
  AddVariantPayload,
  UpdateVariantPayload,
} from "./types.ts";
import { APIResponse } from "../common/types.ts";
import { API_BASE_URL } from "../../constants/api.ts";
import { apiService } from "../../services/api.ts";

function* getProduct(action: PayloadAction<RequestProduct>) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Product[]> = yield call(
      apiService.get,
      `${API_BASE_URL}/product`,
      action.payload
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

function* createProduct(payload: PayloadAction<ProductPayload>) {
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
    yield put(actions.resetRegister());
    yield put(actions.setLoading(false));
  }
}

function* createProductWithVariant(
  payload: PayloadAction<CreateProductWithVariantPayload>
) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Product> = yield call(
      apiService.post,
      `${API_BASE_URL}/product/with-variant`,
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
    yield put(actions.resetRegister());
    yield put(actions.setLoading(false));
  }
}

function* updateProduct(
  payload: PayloadAction<{ id: string; data: ProductPayload }>
) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Product> = yield call(
      apiService.put,
      `${API_BASE_URL}/product/${payload.payload.id}`,
      payload.payload.data
    );

    const { data } = response;
    yield put(actions.setOneProduct(data));
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

function* addVariantToProduct(
  payload: PayloadAction<{ id: string; data: AddVariantPayload[] }>
) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Product> = yield call(
      apiService.post,
      `${API_BASE_URL}/product/${payload.payload.id}/variant`,
      payload.payload.data
    );

    const { data } = response;
    yield put(actions.addVariant({ id: payload.payload.id, data }));
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

function* updateVariant(payload: PayloadAction<UpdateVariantPayload>) {
  yield put(actions.setLoading(true));
  try {
    const { id, ...rest } = payload.payload;

    const response: APIResponse<Product> = yield call(
      apiService.put,
      `${API_BASE_URL}/product/variant/${id}`,
      rest
    );

    const { data } = response;
    yield put(actions.setOneVariant(data));
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
    takeEvery(actions.updateProductRequest.type, updateProduct),
    takeEvery(actions.addVariantToProductRequest.type, addVariantToProduct),
    takeEvery(actions.updateVariantRequest.type, updateVariant),
    takeEvery(
      actions.createProductWithVariantRequest.type,
      createProductWithVariant
    ),
  ]);
}
