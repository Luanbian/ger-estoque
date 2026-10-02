import {
  Action,
  configureStore,
  combineReducers,
  PayloadAction,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, select, spawn, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

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
import { filterSlice } from "../features/filters/slice";
import { customerSlice } from "../features/customers/slice";
import { showcaseSlice } from "../features/showcase/slice";
import { wsSlice } from "../features/ws/slice";
import { orderSlice } from "../features/order/slice";
import { catalogSlice } from "../features/catalog/slice";
import { whatsappSlice } from "../features/whatsapp/slice";

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
import { customerSagas } from "../features/customers";
import { showcaseSagas } from "../features/showcase";
import { wsSagas } from "../features/ws";
import { orderSagas } from "../features/order";
import { catalogSagas } from "../features/catalog";
import { whatsappSagas } from "../features/whatsapp";

const sagaMiddleware = createSagaMiddleware({
  onError: (error, errorInfo) => {
    // eslint-disable-next-line no-console
    console.error("Saga error", error, errorInfo);
  },
});

const appReducer = combineReducers({
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
  filter: filterSlice.reducer,
  customer: customerSlice.reducer,
  showcase: showcaseSlice.reducer,
  ws: wsSlice.reducer,
  order: orderSlice.reducer,
  catalog: catalogSlice.reducer,
  whatsapp: whatsappSlice.reducer,
});

const rootReducer: typeof appReducer = (state, action) => {
  if (action.type !== authSlice.actions.logout.type || !state) {
    return appReducer(state, action);
  }
  return appReducer(
    { customizer: state.customizer, planType: state.planType },
    action,
  );
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

const SLICES_WITH_ERROR_SCREEN = ["auth", "accountShopkeeper", "planType"];
const PRE_LOGIN_SLICES = ["payment"];

const isToastableError = (action: Action): action is PayloadAction<string> =>
  action.type.endsWith("/setError") &&
  "payload" in action &&
  typeof action.payload === "string" &&
  !SLICES_WITH_ERROR_SCREEN.includes(action.type.split("/")[0]);

function* toastErrorSaga(action: PayloadAction<string>) {
  const token: string | null = yield select(
    (state: AppState) => state.auth.token,
  );
  // Sessão expirada derruba várias requests em 401 ao mesmo tempo: sem sessão, só os fluxos pré-login avisam.
  if (!token && !PRE_LOGIN_SLICES.includes(action.type.split("/")[0])) return;
  toast.error(action.payload);
}

// Run sagas
function* rootSaga() {
  yield all([
    takeEvery(isToastableError, toastErrorSaga),
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
    spawn(customerSagas),
    spawn(showcaseSagas),
    spawn(wsSagas),
    spawn(orderSagas),
    spawn(catalogSagas),
    spawn(whatsappSagas),
  ]);
}

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;

export default store;
