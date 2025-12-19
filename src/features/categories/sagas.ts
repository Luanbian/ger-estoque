import { all, call, put, takeEvery } from "redux-saga/effects";
import { actions } from "./slice.ts";
import { Category } from "./types.ts";
import { APIResponse } from "../common/types.ts";
import { API_BASE_URL } from "../../constants/api.ts";
import { apiService } from "../../services/api.ts";

function* getCategory() {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Category[]> = yield call(
      apiService.get,
      `${API_BASE_URL}/category`
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

export function* categorySagas() {
  yield all([takeEvery(actions.categoryRequest.type, getCategory)]);
}
