import { all, call, put, takeEvery } from "redux-saga/effects";
import { actions } from "./slice.ts";
import {
  CatalogCategory,
  CatalogCategoryPayload,
  CatalogItem,
  CatalogItemPayload,
} from "./types.ts";
import { APIResponse } from "../common/types.ts";
import { API_BASE_URL } from "../../constants/api.ts";
import { apiService } from "../../services/api.ts";
import { PayloadAction } from "@reduxjs/toolkit";

function* getCatalog() {
  yield put(actions.setLoading(true));
  try {
    const [responseCategory, responseItem]: [
      APIResponse<CatalogCategory[]>,
      APIResponse<CatalogItem[]>,
    ] = yield all([
      call(apiService.get, `${API_BASE_URL}/catalog/category`),
      call(apiService.post, `${API_BASE_URL}/catalog/item/list`, {}),
    ]);

    yield put(
      actions.setCatalog({
        category: responseCategory.data,
        items: responseItem.data,
      }),
    );
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

function* createCatalogCategory(
  payload: PayloadAction<CatalogCategoryPayload>,
) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<CatalogCategory> = yield call(
      apiService.post,
      `${API_BASE_URL}/catalog/category`,
      payload.payload,
    );

    const { data } = response;

    yield put(actions.addCatalogCategory(data));
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

function* createCatalogItem(payload: PayloadAction<CatalogItemPayload>) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<CatalogItem> = yield call(
      apiService.post,
      `${API_BASE_URL}/catalog/item`,
      payload.payload,
    );

    const { data } = response;

    yield put(actions.addCatalogItem(data));
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

export function* catalogSagas() {
  yield all([
    takeEvery(actions.catalogRequest.type, getCatalog),
    takeEvery(actions.createCatalogCategoryRequest.type, createCatalogCategory),
    takeEvery(actions.createCatalogItemRequest.type, createCatalogItem),
  ]);
}
