import { all, call, put, takeEvery } from "redux-saga/effects";
import actions from "./slice";
import { APIResponse } from "../common/types";
import { FinanceDashboardResponse } from "./types";
import { apiService } from "../../services/api";

function* financeDashboardSaga() {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<FinanceDashboardResponse> = yield call(
      apiService.get,
      `/finance/dashboard`
    );

    const { data } = response;

    yield put(actions.setFinanceData(data));
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

export function* financeSagas() {
  yield all([
    takeEvery(actions.financialDashboardRequest.type, financeDashboardSaga),
  ]);
}
