import { all, call, put, takeEvery } from "redux-saga/effects";
import actions from "./slice";
import axios, { AxiosResponse } from "axios";
import { HealthCheckResponse } from "./types";
import { API_BASE_URL } from "../../constants/api";

function* loadHealthCheckSaga() {
  yield put(actions.setLoading(true));
  try {
    const response: AxiosResponse<HealthCheckResponse> = yield call(
      axios.get,
      API_BASE_URL
    );

    yield put(
      actions.setData({
        status: response.data.status,
        details: response.data.details,
      })
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
