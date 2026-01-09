import { all, call, put, takeEvery } from "redux-saga/effects";
import actions from "./slice";
import { APIResponse } from "../common/types";
import { PlanType } from "./types";
import { apiService } from "../../services/api";

function* getPlanTypes() {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<PlanType[]> = yield call(
      apiService.get,
      `/plan-type`
    );
    const { data } = response;

    yield put(actions.setPlanType(data));
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

export function* planTypeSagas() {
  yield all([takeEvery(actions.planTypeRequest.type, getPlanTypes)]);
}
