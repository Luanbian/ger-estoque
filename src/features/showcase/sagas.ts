import { all, call, put, takeEvery } from "redux-saga/effects";
import { actions } from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { APIResponse } from "../common/types";
import { apiService } from "../../services/api";
import { CreateShowcasePayload, Showcase } from "./types";

function* getShowcase(payload: PayloadAction<string>) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Showcase> = yield call(
      apiService.get,
      `/showcase/${payload.payload}`,
    );

    const { data } = response;

    yield put(actions.setShowcase(data));
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

function* createShowcase(payload: PayloadAction<CreateShowcasePayload>) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<string> = yield call(
      apiService.post,
      "/showcase",
      payload.payload,
    );

    const { data } = response;

    yield put(actions.setMessage(data));
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

export function* showcaseSagas() {
  yield all([
    takeEvery(actions.showcaseRequest.type, getShowcase),
    takeEvery(actions.createShowcaseRequest.type, createShowcase),
  ]);
}
