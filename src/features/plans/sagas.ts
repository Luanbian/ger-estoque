import { all, call, put, takeEvery } from "redux-saga/effects";
import actions from "./slice";
import { APIResponse } from "../common/types";
import { PlanType } from "./types";
import { apiService } from "../../services/api";
import { getErrorMessage } from "../../utils/getErrorMessage";

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
    yield put(actions.setError(getErrorMessage(error)));
  } finally {
    yield put(actions.setLoading(false));
  }
}

export function* planTypeSagas() {
  yield all([takeEvery(actions.planTypeRequest.type, getPlanTypes)]);
}
