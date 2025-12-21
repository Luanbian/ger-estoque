import { all, call, put, takeEvery } from "redux-saga/effects";
import { actions } from "./slice.ts";
import { Category, CreateCategoryPayload } from "./types.ts";
import { APIResponse } from "../common/types.ts";
import { API_BASE_URL } from "../../constants/api.ts";
import { apiService } from "../../services/api.ts";
import { PayloadAction } from "@reduxjs/toolkit";

function* getCategoryTree() {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Category[]> = yield call(
      apiService.get,
      `${API_BASE_URL}/category/tree`
    );

    const { data } = response;

    yield put(actions.setCategory(data));
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

function* getCategory() {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Category[]> = yield call(
      apiService.get,
      `${API_BASE_URL}/category`
    );

    const { data } = response;

    yield put(actions.setCategoryPlain(data));
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

function* createCategory(payload: PayloadAction<CreateCategoryPayload>) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Category> = yield call(
      apiService.post,
      `${API_BASE_URL}/category`,
      payload.payload
    );

    const { data } = response;

    yield put(actions.addCategory(data));
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

function* createSubCategory(payload: PayloadAction<CreateCategoryPayload>) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Category> = yield call(
      apiService.post,
      `${API_BASE_URL}/category/${payload.payload.fatherCategoryId}/subcategory`,
      payload.payload
    );

    const { data } = response;

    yield put(actions.addSubCategory(data));
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

export function* categorySagas() {
  yield all([
    takeEvery(actions.categoryTreeRequest.type, getCategoryTree),
    takeEvery(actions.categoryRequest.type, getCategory),
    takeEvery(actions.createCategoryRequest.type, createCategory),
    takeEvery(actions.createSubCategoryRequest.type, createSubCategory),
  ]);
}
