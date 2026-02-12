import { all, call, put, takeEvery } from "redux-saga/effects";
import { actions } from "./slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { APIResponse } from "../common/types";
import { apiService } from "../../services/api";
import { CreateShowcasePayload, Showcase } from "./types";

function* getShowcase() {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Showcase> = yield call(
      apiService.get,
      "/showcase",
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
    const response: APIResponse<Showcase> = yield call(
      apiService.post,
      "/showcase",
      payload.payload,
    );

    const { data } = response;

    yield put(actions.setMessage("Showcase created successfully"));
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

function* getShowcaseByName(payload: PayloadAction<{ name: string }>) {
  yield put(actions.setLoading(true));
  try {
    const response: APIResponse<Showcase> = yield call(
      apiService.get,
      `/showcase/${payload.payload.name}`,
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

export function* showcaseSagas() {
  yield all([
    takeEvery(actions.showcaseRequest.type, getShowcase),
    takeEvery(actions.createShowcaseRequest.type, createShowcase),
    takeEvery(actions.getShowcaseByName.type, getShowcaseByName),
  ]);
}
