import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Category,
  CategoryState,
  CategoryPayload,
  RequestTreeCategory,
} from "./types.ts";

export const initialState: CategoryState = {
  data: null,
  dataPlain: null,
  loading: false,
  error: null,
  pagination: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    categoryRequest: () => {},
    categoryTreeRequest: (
      _state,
      _action: PayloadAction<RequestTreeCategory>,
    ) => {},
    createCategoryRequest: (
      _state,
      _action: PayloadAction<CategoryPayload>,
    ) => {},
    createSubCategoryRequest: (
      _state,
      _action: PayloadAction<CategoryPayload>,
    ) => {},
    updateCategoryRequest: (
      _state,
      _action: PayloadAction<{ id: string; data: CategoryPayload }>,
    ) => {},
    deleteCategoryRequest: (_state, _action: PayloadAction<string>) => {},
    deleteSubCategoryRequest: (
      _state,
      _action: PayloadAction<{ fatherCategoryId: string; id: string }>,
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
    setPagination: (
      state,
      action: PayloadAction<CategoryState["pagination"]>,
    ) => {
      state.pagination = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.data?.push(action.payload);
    },
    addSubCategory: (state, action: PayloadAction<Category>) => {
      const parentCategory = state.data?.find(
        (cat) => cat._id === action.payload.fatherCategoryId,
      );
      if (parentCategory) {
        if (!parentCategory.subCategories) {
          parentCategory.subCategories = [];
        }
        parentCategory.subCategories.push(action.payload);
      }
    },
    setCategoryPlain: (
      state,
      action: PayloadAction<CategoryState["dataPlain"]>,
    ) => {
      state.dataPlain = action.payload;
      state.error = null;
    },
    setOneCategory: (state, action: PayloadAction<Category>) => {
      const categoryIndex = state.data?.findIndex(
        (cat) => cat._id === action.payload._id,
      );
      state.data![categoryIndex!] = action.payload;
      const plainIndex = state.dataPlain?.findIndex(
        (cat) => cat._id === action.payload._id,
      );
      state.dataPlain![plainIndex!] = action.payload;
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      if (!state.data || !state.dataPlain) return;

      state.data = state.data?.filter(
        (category) => category._id !== action.payload,
      );
      state.dataPlain = state.dataPlain?.filter(
        (category) => category._id !== action.payload,
      );
    },
    removeSubCategory: (
      state,
      action: PayloadAction<{ fatherCategoryId: string; id: string }>,
    ) => {
      if (!state.data || !state.dataPlain) return;

      state.data.forEach((category) => {
        if (category.subCategories) {
          category.subCategories = category.subCategories.filter(
            (subCat) => subCat._id !== action.payload.id,
          );
        }
      });
      state.dataPlain = state.dataPlain?.filter(
        (category) => category._id !== action.payload.id,
      );
      const parentIndex = state.data.findIndex(
        (cat) => cat._id === action.payload.fatherCategoryId,
      );
      if (state.data[parentIndex].subCategories?.length === 0) {
        state.data[parentIndex].subCategories = undefined;
      }
    },
  },
});

export const { actions } = categorySlice;
export default categorySlice.actions;
