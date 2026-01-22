import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { actions } from "./slice.ts";
import { Category, CategoryPayload } from "./types.ts";
import { APIResponse, PaginationRequest } from "../common/types.ts";
import { API_BASE_URL } from "../../constants/api.ts";
import { apiService } from "../../services/api.ts";
import { PayloadAction } from "@reduxjs/toolkit";
import { Filters } from "../filters/types.ts";
import { AppState } from "../../store/index.ts";

function* getCategoryTree(payload: PayloadAction<PaginationRequest>) {
  yield put(actions.setLoading(true));
  try {
    const filters: Filters = yield select((state: AppState) => state.filter);

    const response: APIResponse<Category[]> = yield call(
      apiService.post,
      `${API_BASE_URL}/category/tree`,
      filters.category || {},
      payload.payload,
    );

    const { data } = response;

    yield put(actions.setCategory(data));
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

function* getCategory() {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Category[]> = yield call(
      apiService.get,
      `${API_BASE_URL}/category`,
    );

    const { data } = response;

    yield put(actions.setCategoryPlain(data));
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

function* createCategory(payload: PayloadAction<CategoryPayload>) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Category> = yield call(
      apiService.post,
      `${API_BASE_URL}/category`,
      payload.payload,
    );

    const { data } = response;

    yield put(actions.addCategory(data));
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

function* createSubCategory(payload: PayloadAction<CategoryPayload>) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Category> = yield call(
      apiService.post,
      `${API_BASE_URL}/category/${payload.payload.fatherCategoryId}/subcategory`,
      payload.payload,
    );

    const { data } = response;

    yield put(actions.addSubCategory(data));
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

function* updateCategory(
  payload: PayloadAction<{ id: string; data: CategoryPayload }>,
) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Category> = yield call(
      apiService.put,
      `${API_BASE_URL}/category/${payload.payload.id}`,
      payload.payload.data,
    );

    const { data } = response;

    yield put(actions.setOneCategory(data));
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

function* deleteCategory(payload: PayloadAction<string>) {
  yield put(actions.setLoading(true));
  try {
    yield call(
      apiService.delete,
      `${API_BASE_URL}/category/${payload.payload}`,
    );

    yield put(actions.removeCategory(payload.payload));
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

function* deleteSubCategory(
  payload: PayloadAction<{ fatherCategoryId: string; id: string }>,
) {
  yield put(actions.setLoading(true));
  try {
    yield call(
      apiService.delete,
      `${API_BASE_URL}/category/${payload.payload.id}`,
    );

    yield put(actions.removeSubCategory(payload.payload));
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

export function* categorySagas() {
  yield all([
    takeEvery(actions.categoryTreeRequest.type, getCategoryTree),
    takeEvery(actions.categoryRequest.type, getCategory),
    takeEvery(actions.createCategoryRequest.type, createCategory),
    takeEvery(actions.createSubCategoryRequest.type, createSubCategory),
    takeEvery(actions.updateCategoryRequest.type, updateCategory),
    takeEvery(actions.deleteCategoryRequest.type, deleteCategory),
    takeEvery(actions.deleteSubCategoryRequest.type, deleteSubCategory),
  ]);
}
