import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryState } from "./types.ts";

export const initialState: CategoryState = {
  data: null,
  loading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    categoryRequest: () => {},
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCategory: (state, action: PayloadAction<CategoryState["data"]>) => {
      state.data = action.payload;
      state.error = null;
    },
  },
});

export const { actions } = categorySlice;
export default categorySlice.actions;
