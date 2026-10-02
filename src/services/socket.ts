import { WS_BASE_URL } from "../constants/api";
import { io, Socket } from "socket.io-client";
import { tokenManager } from "./token";
import { triggerRefresh } from "./api";
import store from "../store";
import { actions as authActions } from "../features/auth";

interface ISocket {
  io: Socket | null;
}

export const socket: ISocket = {
  io: null,
};

let tokenFromSocketRefresh: string | null = null;

export const connectWebSocket = (tenantId: string) => {
  if (socket.io) return;

  const client = io(WS_BASE_URL, {
    transports: ["websocket"],
    auth: (cb) => cb({ token: tokenManager.get(), tenantId }),
  });
  socket.io = client;
  console.log("Attempting to connect to WebSocket...");

  client.on("connect", () => {
    console.log("WebSocket connection established");
  });

  client.on("disconnect", async (reason) => {
    console.log("WebSocket disconnected: ", reason);
    if (reason !== "io server disconnect") return;

    // Token recém-renovado e rejeitado de novo: outro refresh entraria em loop de reconexão.
    if (tokenManager.get() === tokenFromSocketRefresh) {
      store.dispatch(authActions.logout());
      return;
    }

    try {
      await triggerRefresh();
    } catch {
      return;
    }
    tokenFromSocketRefresh = tokenManager.get();
    if (socket.io === client) client.connect();
  });

  client.on("connect_error", (error) => {
    console.error("WebSocket connection error:", error);
  });
};

export const disconnectWebSocket = () => {
  if (socket.io) socket.io.disconnect();
  socket.io = null;
};
