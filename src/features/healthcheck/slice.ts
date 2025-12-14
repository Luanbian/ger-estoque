import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HealthCheckSliceState } from "./types";

export const initialState: HealthCheckSliceState = {
  data: null,
  loading: false,
  error: null,
};

export const healthCheckSlice = createSlice({
  name: "healthcheck",
  initialState,
  reducers: {
    loadHealthCheck: () => {},
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setData: (state, action: PayloadAction<HealthCheckSliceState["data"]>) => {
      state.data = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.data = null;
    },
  },
});

export const { actions } = healthCheckSlice;
export default healthCheckSlice.actions;
