import { createSlice } from "@reduxjs/toolkit";
import { WebSocketState } from "./types";

const initialState: WebSocketState = {
  notifications: [],
  isConnected: false,
  error: null,
};

export const wsSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {
    watchEvents: () => {},
    connect: () => {},
    disconnect: () => {},
    clearNotifications: (state) => {
      state.notifications = [];
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { actions } = wsSlice;
export default wsSlice.reducer;
