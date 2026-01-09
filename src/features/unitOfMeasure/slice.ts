import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UnitOfMeasure, UnitOfMeasureState } from "./types.ts";

export const initialState: UnitOfMeasureState = {
  data: null,
  loading: false,
  error: null,
};

export const unitOfMeasureSlice = createSlice({
  name: "unitOfMeasure",
  initialState,
  reducers: {
    unitOfMeasureRequest: () => {},
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUnitOfMeasures: (state, action: PayloadAction<UnitOfMeasure[]>) => {
      state.data = action.payload;
    },
  },
});

export const { actions } = unitOfMeasureSlice;
export default unitOfMeasureSlice.actions;
