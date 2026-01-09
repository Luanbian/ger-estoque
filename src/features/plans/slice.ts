import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlanType, PlanTypeState } from "./types";

export const initialState: PlanTypeState = {
  data: null,
  loading: false,
  error: null,
};

export const planTypeSlice = createSlice({
  name: "planType",
  initialState,
  reducers: {
    planTypeRequest: () => {},
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPlanType: (state, action: PayloadAction<PlanType[]>) => {
      state.data = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { actions } = planTypeSlice;
export default planTypeSlice.actions;
