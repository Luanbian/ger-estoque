import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, spawn } from "redux-saga/effects";

// Slice
import { healthCheckSlice } from "../features/healthcheck/slice";
import { customizerSlice } from "../features/customizer/slice";
import { authSlice } from "../features/auth/slice";
import { productSlice } from "../features/products/slice";
import { categorySlice } from "../features/categories/slice";
import { unitOfMeasureSlice } from "../features/unitOfMeasure/slice";
import { accountShopkeeperSlice } from "../features/accountShopkeeper/slice";
import { planTypeSlice } from "../features/plans/slice";
import { financeSlice } from "../features/finance/slice";
import { paymentSlice } from "../features/payment/slice";
import { salesSlice } from "../features/sales/slice";

// Sagas
import { healthSagas } from "../features/healthcheck";
import { authSagas } from "../features/auth";
import { productSagas } from "../features/products";
import { categorySagas } from "../features/categories";
import { unitOfMeasureSagas } from "../features/unitOfMeasure";
import { accountShopkeeperSagas } from "../features/accountShopkeeper";
import { planTypeSagas } from "../features/plans";
import { financeSagas } from "../features/finance";
import { paymentSagas } from "../features/payment";
import { salesSagas } from "../features/sales";

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
  product: productSlice.reducer,
  category: categorySlice.reducer,
  unitOfMeasure: unitOfMeasureSlice.reducer,
  accountShopkeeper: accountShopkeeperSlice.reducer,
  planType: planTypeSlice.reducer,
  finance: financeSlice.reducer,
  payment: paymentSlice.reducer,
  sales: salesSlice.reducer,
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
  yield all([
    spawn(healthSagas),
    spawn(authSagas),
    spawn(productSagas),
    spawn(categorySagas),
    spawn(unitOfMeasureSagas),
    spawn(accountShopkeeperSagas),
    spawn(planTypeSagas),
    spawn(financeSagas),
    spawn(paymentSagas),
    spawn(salesSagas),
  ]);
}

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;

export default store;
