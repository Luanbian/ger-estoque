import { all, call, put, takeEvery } from "redux-saga/effects";
import actions from "./slice";
import { HealthCheckResponse } from "./types";
import { API_BASE_URL } from "../../constants/api";
import { APIResponse } from "../common/types";
import { apiService } from "../../services/api";

function* loadHealthCheckSaga() {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<HealthCheckResponse> = yield call(
      apiService.get,
      API_BASE_URL,
    );

    const { data } = response;

    yield put(
      actions.setData({
        status: data.status,
        details: data.details,
        version: data.version,
      }),
    );
  } catch (error) {
    yield put(actions.setError("Failed to load health check data"));
  } finally {
    yield put(actions.setLoading(false));
  }
}

export function* healthSagas() {
  yield all([takeEvery(actions.loadHealthCheck.type, loadHealthCheckSaga)]);
}
