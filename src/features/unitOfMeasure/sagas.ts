import { all, call, put, takeEvery } from "redux-saga/effects";
import { actions } from "./slice.ts";
import { UnitOfMeasure } from "./types.ts";
import { APIResponse } from "../common/types.ts";
import { API_BASE_URL } from "../../constants/api.ts";
import { apiService } from "../../services/api.ts";

function* getUnitOfMeasure() {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<UnitOfMeasure[]> = yield call(
      apiService.get,
      `${API_BASE_URL}/unit-of-measure`
    );

    const { data } = response;

    yield put(actions.setUnitOfMeasures(data));
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

export function* unitOfMeasureSagas() {
  yield all([takeEvery(actions.unitOfMeasureRequest.type, getUnitOfMeasure)]);
}
