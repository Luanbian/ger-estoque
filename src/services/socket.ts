import { WS_BASE_URL } from "../constants/api";
import { io, Socket } from "socket.io-client";

interface ISocket {
  io: Socket | null;
}

export const socket: ISocket = {
  io: null,
};

export const connectWebSocket = (tenantId: string) => {
  if (!socket.io) {
    socket.io = io(WS_BASE_URL, {
      transports: ["polling"],
      auth: { tenantId },
    });
    console.log("Attempting to connect to WebSocket...");

    socket.io.on("connect", () => {
      console.log("WebSocket connection established");
    });

    socket.io.on("disconnect", (reason) => {
      console.log("WebSocket disconnected: ", reason);
    });

    socket.io.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });
  }
};

export const disconnectWebSocket = () => {
  if (socket.io) socket.io.disconnect();
  socket.io = null;
};
