import { EventChannel, eventChannel } from "redux-saga";
import {
  all,
  call,
  ChannelTakeEffect,
  put,
  select,
  take,
  takeLatest,
} from "redux-saga/effects";
import { actions } from "./slice";
import {
  connectWebSocket,
  disconnectWebSocket,
  socket,
} from "../../services/socket";
import { AppState } from "../../store";

function createSocketChannel() {
  return eventChannel((emit) => {
    if (!socket.io) return () => {};

    const handler = (data: any) => {
      emit(data);
    };

    socket.io.on("notification", handler);

    return () => {
      socket.io?.off("notification", handler);
    };
  });
}

function* watchEvents() {
  const tenantId: string = yield select(
    (state: AppState) => state.auth.data?.tenantId || "default-tenant",
  );

  yield call(connectWebSocket, tenantId);

  const channel: EventChannel<any> = yield call(createSocketChannel);

  while (true) {
    const data: ChannelTakeEffect<any> = yield take(channel);
    yield put(actions.addNotification(data));
  }
}

function* connectSaga() {
  try {
    const tenantId: string = yield select(
      (state: AppState) => state.auth.data?.tenantId || "default-tenant",
    );

    yield call(connectWebSocket, tenantId);

    yield put(actions.setConnectionStatus(true));
  } catch (error) {
    yield put(
      actions.setError(
        error instanceof Error ? error.message : "Unknown error",
      ),
    );
    yield put(actions.setConnectionStatus(false));
  }
}

function* disconnectSaga() {
  try {
    yield call(disconnectWebSocket);
    yield put(actions.setConnectionStatus(false));
  } catch (error) {
    yield put(
      actions.setError(
        error instanceof Error ? error.message : "Unknown error",
      ),
    );
  }
}

export function* wsSagas() {
  yield all([
    takeLatest(actions.watchEvents.type, watchEvents),
    takeLatest(actions.connect.type, connectSaga),
    takeLatest(actions.disconnect.type, disconnectSaga),
  ]);
}
