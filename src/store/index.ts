import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, spawn } from "redux-saga/effects";

// Slice
import { healthCheckSlice } from "../features/healthcheck/slice";

// Sagas
import { healthSagas } from "../features/healthcheck";

const sagaMiddleware = createSagaMiddleware({
  onError: (error, errorInfo) => {
    // eslint-disable-next-line no-console
    console.error("Saga error", error, errorInfo);
  },
});

const rootReducer = combineReducers({
  healthCheck: healthCheckSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

// Run sagas
function* rootSaga() {
  yield all([spawn(healthSagas)]);
}

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;

export default store;
