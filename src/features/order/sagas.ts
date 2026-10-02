import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { actions } from "./slice";
import { APIResponse, Pagination, PaginationRequest } from "../common/types";
import { Order } from "./types";
import { apiService } from "../../services/api";
import { PayloadAction } from "@reduxjs/toolkit";
import { generateParams } from "../../utils/generateParams";
import { Filters } from "../filters/types";
import { AppState } from "../../store";
import { OrderStatus } from "../common/orderStatusEnum";
import { Whatsapp } from "../whatsapp/types";
import { openWhatsapp } from "../../utils/openWhatsapp";
import { getErrorMessage } from "../../utils/getErrorMessage";

function* getOrders(payload: PayloadAction<PaginationRequest | undefined>) {
  try {
    yield put(actions.setLoading(true));
    const filters: Filters = yield select((state: AppState) => state.filter);

    const response: APIResponse<Order[]> = yield call(
      apiService.post,
      "/order/list",
      filters.sale || {},
      generateParams(payload.payload),
    );

    const { data } = response;

    yield put(actions.setOrders(data));
    yield put(actions.setPagination(response.pagination || null));
  } catch (error) {
    yield put(actions.setError(getErrorMessage(error)));
  } finally {
    yield put(actions.setLoading(false));
  }
}

function* reloadOrders() {
  const pagination: Pagination | null = yield select(
    (state: AppState) => state.order.pagination,
  );
  yield put(
    actions.getOrdersRequest(
      pagination
        ? { page: String(pagination.page), limit: String(pagination.limit) }
        : undefined,
    ),
  );
}

function* updateOrderStatus(
  payload: PayloadAction<{
    orderId: string;
    status: OrderStatus.ACCEPTED | OrderStatus.REJECTED;
  }>,
) {
  const { orderId, status } = payload.payload;
  yield put(actions.setDecidingId(orderId));
  try {
    const result: APIResponse<Order> = yield call(
      apiService.patch,
      `/order/${orderId}/status`,
      { status },
    );

    const { data } = result;

    yield put(actions.setOneOrder(data));

    const whatsapp: Whatsapp | null = yield select(
      (state: AppState) => state.whatsapp.data,
    );
    yield call(
      openWhatsapp,
      data.customer.phone,
      data.customer.name,
      status === OrderStatus.ACCEPTED
        ? whatsapp?.acceptedMessage
        : whatsapp?.rejectedMessage,
    );
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      toast.warning("Este pedido já foi decidido ou não existe");
      yield call(reloadOrders);
      return;
    }
    yield put(actions.setError(getErrorMessage(error)));
  } finally {
    yield put(actions.setDecidingId(null));
  }
}

export function* orderSagas() {
  yield all([
    takeEvery(actions.getOrdersRequest.type, getOrders),
    takeEvery(actions.reloadOrdersRequest.type, reloadOrders),
    takeEvery(actions.updateOrderStatusRequest.type, updateOrderStatus),
  ]);
}
