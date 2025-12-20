import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateProductPayload,
  Product,
  ProductState,
  RequestProduct,
} from "./types.ts";

export const initialState: ProductState = {
  data: null,
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productRequest: (_state, _action: PayloadAction<RequestProduct>) => {},
    createProductRequest: (
      _state,
      _action: PayloadAction<CreateProductPayload>
    ) => {},
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setProduct: (state, action: PayloadAction<ProductState["data"]>) => {
      state.data = action.payload;
      state.error = null;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.data?.push(action.payload);
    },
  },
});

export const { actions } = productSlice;
export default productSlice.actions;
