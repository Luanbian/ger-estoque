import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CatalogCategoryState,
  CatalogCategoryPayload,
  CatalogItemPayload,
  CatalogCategory,
  CatalogItem,
} from "./types.ts";

export const initialState: CatalogCategoryState = {
  data: {
    category: null,
    items: null,
  },
  loading: false,
  error: null,
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    catalogRequest: () => {},
    createCatalogCategoryRequest: (
      _state,
      _action: PayloadAction<CatalogCategoryPayload>,
    ) => {},
    createCatalogItemRequest: (
      _state,
      _action: PayloadAction<CatalogItemPayload>,
    ) => {},
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCatalog: (
      state,
      action: PayloadAction<CatalogCategoryState["data"]>,
    ) => {
      state.data = action.payload;
      state.error = null;
    },
    addCatalogCategory: (state, action: PayloadAction<CatalogCategory>) => {
      state.data?.category?.push(action.payload);
    },
    addCatalogItem: (state, action: PayloadAction<CatalogItem>) => {
      state.data?.items?.push(action.payload);
    },
  },
});

export const { actions } = catalogSlice;
export default catalogSlice.actions;
