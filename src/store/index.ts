import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, spawn } from "redux-saga/effects";

// Slice
import { healthCheckSlice } from "../features/healthcheck/slice";
import { customizerSlice } from "../features/customizer/slice";
import { authSlice } from "../features/auth/slice";

// Sagas
import { healthSagas } from "../features/healthcheck";
import { authSagas } from "../features/auth";

const sagaMiddleware = createSagaMiddleware({
  onError: (error, errorInfo) => {
    // eslint-disable-next-line no-console
    console.error("Saga error", error, errorInfo);
  },
});

const rootReducer = combineReducers({
  healthCheck: healthCheckSlice.reducer,
  customizer: customizerSlice.reducer,
  auth: authSlice.reducer,
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
  yield all([spawn(healthSagas), spawn(authSagas)]);
}

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;

export default store;
