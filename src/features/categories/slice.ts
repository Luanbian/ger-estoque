import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, CategoryState, CreateCategoryPayload } from "./types.ts";

export const initialState: CategoryState = {
  data: null,
  dataPlain: null,
  loading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    categoryRequest: () => {},
    categoryTreeRequest: () => {},
    createCategoryRequest: (
      _state,
      _action: PayloadAction<CreateCategoryPayload>
    ) => {},
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
    addCategory: (state, action: PayloadAction<Category>) => {
      state.data?.push(action.payload);
    },
    setCategoryPlain: (
      state,
      action: PayloadAction<CategoryState["dataPlain"]>
    ) => {
      state.dataPlain = action.payload;
      state.error = null;
    },
  },
});

export const { actions } = categorySlice;
export default categorySlice.actions;
